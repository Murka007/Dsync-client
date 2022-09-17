declare module "*.html" {
    const content: string;
    export default content;
}

declare module "*.scss" {
    const content: string;
    export default content;
}

declare const GM_info: {
    script: {
        name: string;
        author: string;
    }
}

declare const PRODUCTION: boolean;