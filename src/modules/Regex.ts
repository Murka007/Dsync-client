import { error, log } from "..";
import { TYPEOF } from "../utils/Common";

type THook = {
    expression: RegExp;
    match: RegExpMatchArray | RegExpMatchArray[];
}

type TSystem = {
    radix: number;
    prefix: string;
}

type TRegex = string | RegExp | (string | RegExp)[];

const ANY_LETTER = "(?:[^\\x00-\\x7F-]|\\$|\\w)";
const NumberSystem: TSystem[] = [
    { radix: 2, prefix: "0b0*" },
    { radix: 8, prefix: "0+" },
    { radix: 10, prefix: "" },
    { radix: 16, prefix: "0x0*" },
]

enum Template {
    APPEND,
    PREPEND
}

class Regex {
    code: string;
    readonly COPY_CODE: string;
    private readonly unicode: boolean;
    private readonly hooks: { [key: string]: THook };

    constructor(code: string, unicode: boolean) {
        this.code = code;
        this.COPY_CODE = code;
        this.unicode = unicode || false;
        this.hooks = {};
    }

    static parseValue(value: any): any {
        try {
            return Function(`return (${ value })`)();
        } catch(err) {
            return null;
        }
    }

    private isRegexp(value: string | RegExp): boolean {
        return TYPEOF(value) === "regexp";
    }

    private generateNumberSystem(int: number): string {
        const copy = [...NumberSystem];
        const template: string[] = copy.map(({ prefix, radix }) => prefix + int.toString(radix));
        return `(?:${ template.join("|") })`;
    }

    private parseVariables(regex: string): string {
        regex = regex.replace(/\{VAR\}/g, "(?:let|var|const)");
        regex = regex.replace(/\{QUOTE\}/g, "[\'\"\`]");
        regex = regex.replace(/ARGS\{(\d+)\}/g, (...args) => {
            let count = Number(args[1]), arr = [];
            while (count--) arr.push("\\w+");
            return arr.join("\\s*,\\s*");
        });
        regex = regex.replace(/NUMBER\{(\d+)\}/g, (...args) => {
            const int = Number(args[1]);
            return this.generateNumberSystem(int);
        });
        return regex;
    }

    private format(name: string, inputRegex: TRegex, flags?: string): RegExp {

        let regex: string = null;
        if (Array.isArray(inputRegex)) {
            regex = inputRegex.map(exp => this.isRegexp(exp) ? (exp as RegExp).source : exp).join("\\s*");
        } else if (this.isRegexp(inputRegex)) {
            regex = (inputRegex as RegExp).source;
        }

        regex = this.parseVariables(regex);
        if (this.unicode) {
            regex = regex.replace(/\\w/g, ANY_LETTER);
        }

        const expression = new RegExp(regex.replace(/\{INSERT\}/, ""), flags);
        const match = this.code.match(expression);
        if (match === null) error("Failed to find: " + name);
        return regex.includes("{INSERT}") ? new RegExp(regex, flags) : expression;
    }

    private template(type: number, name: string, regex: TRegex, substr: string) {
        const expression = new RegExp(`(${ this.format(name, regex).source })`);
        const match = this.code.match(expression) || [];
        this.code = this.code.replace(expression, type === Template.APPEND ? ("$1" + substr) : (substr + "$1"));
        return match;
    }

    match(name: string, regex: TRegex, flags?: string, debug: boolean = false) {
        const expression = this.format(name, regex, flags);
        const match = this.code.match(expression) || [];
        this.hooks[name] = {
            expression,
            match
        };

        if (debug) log(name, this.hooks[name]);
        return match;
    }

    matchAll(name: string, regex: TRegex, flags: string, debug: boolean = false) {
        const expression = this.format(name, regex, flags);
        const matches = this.code.matchAll(expression);
        this.hooks[name] = {
            expression,
            match: [...matches]
        };

        if (debug) log(name, this.hooks[name]);
        return matches;
    }

    replace(name: string, regex: TRegex, substr: string, flags?: string) {
        const expression = this.format(name, regex, flags);
        this.code = this.code.replace(expression, substr);
        return this.code.match(expression);
    }

    append(name: string, regex: TRegex, substr: string) {
        return this.template(Template.APPEND, name, regex, substr);
    }

    prepend(name: string, regex: TRegex, substr: string) {
        return this.template(Template.PREPEND, name, regex, substr);
    }

    insert(name: string, regex: TRegex, substr: string) {
        const { source } = this.format(name, regex);
        if (!source.includes("{INSERT}")) throw new Error("Your regexp must contain {INSERT} keyword");

        const findExpression = new RegExp(source.replace(/^(.*)\{INSERT\}(.*)$/, "($1)($2)"));
        this.code = this.code.replace(findExpression, `$1${substr}$2`);
        return this.code.match(findExpression);
    }
}

export default Regex;