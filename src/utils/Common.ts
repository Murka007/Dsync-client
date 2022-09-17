import { Dsync } from "..";
import { IData, IEntity, ILinker, IObject, IPlayer, IProjectile, TObjectAny } from "../types";

export const TYPEOF = (value: any): string => {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

export const removeClass = (target: HTMLElement | NodeListOf<HTMLElement>, name: string) => {
    if (target instanceof HTMLElement) {
        target.classList.remove(name);
        return
    }

    for (const element of target) {
        element.classList.remove(name);
    }
}

export const formatCode = (code: string | number): string => {
    code = code + "";
    if (code === "0") return "LBTN"
    if (code === "1") return "MBTN"
    if (code === "2") return "RBTN"
    if (code === "3") return "XBTN2"
    if (code === "4") return "XBTN1"
    if (code === "Escape") return "ESC"
    if (code === "BracketLeft") return "["
    if (code === "BracketRight") return "]"
    if (code === "NumpadDivide") return "NUMDIV"
    if (code === "NumpadMultiply") return "NUMMULT"
    if (code === "NumpadSubtract") return "NUMSUB"
    if (code === "NumpadDecimal") return "NUMDEC"
    if (code === "CapsLock") return "CAPS"
    if (code === "PrintScreen") return "PRNT"
    if (code === "Backslash") return "\\"
    if (code === "Backquote") return "BQUOTE"
    if (code === "PageDown") return "PAGEDN"

    const NumpadDigitArrowKey = /^(?:Numpad|Digit|Arrow|Key)(\w+)$/;
    if (NumpadDigitArrowKey.test(code)) {
        code = code.replace(NumpadDigitArrowKey, "$1").replace(/Numpad/, "NUM");
    }

    const ExtraKeysRegex = /^(Control|Shift|Alt)(.).*/;
    if (ExtraKeysRegex.test(code)) {
        code = code.replace(ExtraKeysRegex, "$2$1").replace(/Control/, "CTRL");
    }

    return code.toUpperCase();
}

// Checks if target contains given className
export const contains = (target: Element, name: string) => target.classList.contains(name);

export const isInput = (target?: Element) => {
    const element = target || document.activeElement;
    return ["TEXTAREA", "INPUT"].includes(element.tagName);
}

export const inGame = () => {
    const homepage = document.querySelector("#homepage") as HTMLDivElement;
    return homepage && homepage.style.display === "none";
}

export const formatData = (object: TObjectAny): Readonly<IData> => {
    return {
        id: object[Dsync.props.id],
        type: object.type,
        x: object[Dsync.props.x],
        y: object[Dsync.props.y],
        x1: object[Dsync.props.x1],
        y1: object[Dsync.props.y1],
        x2: object[Dsync.props.x2],
        y2: object[Dsync.props.y2],
        angle: object[Dsync.props.angle],
        angle1: object[Dsync.props.angle1],
        angle2: object[Dsync.props.angle2],
        ownerID: object[Dsync.props.itemOwner],
        target: object
    }
}

export const formatProjectile = (object: TObjectAny): Readonly<IProjectile> => {
    const data = formatData(object);
    return {
        ...data,
        range: object.range
    }
}

export const formatObject = (object: TObjectAny): Readonly<IObject> => {
    const data = formatData(object);
    const entityData = Dsync.entityData[object.type];
    return {
        ...data,
        radius: entityData[Dsync.props.radius]
    }
}

export const formatEntity = (entity: TObjectAny): Readonly<IEntity> => {
    const object = formatObject(entity);
    const entityData = Dsync.entityData[entity.type];
    const healthValue = entity[Dsync.props.health];
    const maxHealth = entityData[Dsync.props.maxHealth];
    return {
        ...object,
        healthValue,
        health: Math.ceil(entity[Dsync.props.health] / 255 * maxHealth),
        maxHealth,
        playerValue: entity[Dsync.props.playerValue],
    }
}

export const formatPlayer = (entity: TObjectAny): IPlayer => {
    const player = formatEntity(entity);
    return {
        ...player,
        hat: entity[Dsync.props.hat],
        isClown: player.playerValue === 128
    }
}

interface IDist {
    lerpDist: number;
    dist: number;
}

export const dist = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
type EntityObject = IProjectile | IObject | IEntity | IPlayer;
export const distance = (entity1: EntityObject, entity2: EntityObject): Readonly<IDist> => {
    const entity1Has = "x" in entity1 && "y" in entity1;
    const entity2Has = "x" in entity2 && "y" in entity2;
    return {
        lerpDist: entity1Has && entity2Has ? dist(entity1.x, entity1.y, entity2.x, entity2.y) : null,
        dist: dist(entity1.x2, entity1.y2, entity2.x2, entity2.y2),
    }
}

interface IAngle {
    lerpAngle: number;
    angle: number;
}

export const angle = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y1 - y2, x1 - x2);
}

interface IPos {
    x2: number;
    y2: number;
}

export const angleObject = (entity1: IPos, entity2: IPos) => {
    return angle(entity1.x2, entity1.y2, entity2.x2, entity2.y2);
}

export const getAngle = (entity1: EntityObject, entity2: EntityObject): Readonly<IAngle> => {
    const entity1Has = "x" in entity1 && "y" in entity1;
    const entity2Has = "x" in entity2 && "y" in entity2;
    return {
        lerpAngle: entity1Has && entity2Has ? Math.atan2(entity1.y-entity2.y, entity1.x-entity2.x) : null,
        angle: Math.atan2(entity1.y2-entity2.y2, entity1.x2-entity2.x2),
    }
}

export const lerp = (start: number, stop: number, amt: number) => {
    return amt * (stop - start) + start;
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const linker = (value: number): ILinker => {
    const hook = {
        0: value,
        toString: (radix?: number) => hook[0].toString(radix),
        valueOf: () => hook[0].valueOf()
    };
    return hook;
}

export const download = (data: TObjectAny, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json "})
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = (filename || "settings") + ".txt";
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const GM = (property: string, value: string) => {
    if (!Dsync.PRODUCTION) return true;
    try {
        return GM_info.script[property as keyof typeof GM_info.script] === value;
    } catch(err) {
        return false;
    }
}

export const fromCharCode = (codes: number[]): string => {
    return codes.map(code => String.fromCharCode(code)).join("");
}