import { Dsync, log } from "..";
import { LayerData } from "../constants/LayerData";
import settings from "../modules/Settings";
import { ArrElement, TObjectAny } from "../types";

export interface IObject {
    readonly id: number;
    readonly type: number;
    readonly x: number;
    readonly y: number;
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    readonly angle: number;
    readonly angle1: number;
    readonly angle2: number;
    readonly ownerID: number;
    readonly radius: number;
    readonly layerData: ArrElement<typeof LayerData>;
    target: TObjectAny;
}

export interface IProjectile extends IObject {
    readonly range: number;
    readonly projectileType: number;
}

export interface IEntity extends IObject {
    readonly healthValue: number;
    readonly health: number;
    readonly maxHealth: number;
    readonly entityValue: number;
}

export interface IPlayer extends IEntity {
    readonly hat: number;
    readonly isClown: boolean;
    readonly currentItem: number;
}

export type TypeEntity = IPlayer | IEntity | IObject;

export class Formatter {
    static object(target: TObjectAny): IObject {
        const layer = LayerData[target.type];
        return {
            id: target[Dsync.props.id],
            type: target.type,
            x: target[Dsync.props.x],
            y: target[Dsync.props.y],
            x1: target[Dsync.props.x1],
            y1: target[Dsync.props.y1],
            x2: target[Dsync.props.x2],
            y2: target[Dsync.props.y2],
            angle: target[Dsync.props.angle],
            angle1: target[Dsync.props.angle1],
            angle2: target[Dsync.props.angle2],
            ownerID: target[Dsync.props.ownerID],
            radius: layer.radius,
            layerData: layer,
            target
        }
    }

    static projectile(target: TObjectAny): IProjectile {
        const object = this.object(target);
        return {
            ...object,
            range: target.range,
            projectileType: target[Dsync.props.projectileType]
        }
    }

    static entity(target: TObjectAny): Readonly<IEntity> {
        const object = this.object(target);
        const healthValue = target[Dsync.props.health];
        const maxHealth = object.layerData.maxHealth || 1;
        return {
            ...object,
            healthValue,
            health: Math.ceil(healthValue / 255 * maxHealth),
            maxHealth,
            entityValue: target[Dsync.props.entityValue],
        }
    }

    static player(target: TObjectAny): IPlayer {
        const entity = this.entity(target);
        return {
            ...entity,
            hat: target[Dsync.props.hat],
            isClown: entity.entityValue === 128,
            currentItem: target[Dsync.props.currentItem]
        }
    }
}

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

export const removeChildren = (target: HTMLElement) => {
    while (target.firstChild) {
        target.removeChild(target.firstChild);
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

export const contains = (target: Element, name: string) => target.classList.contains(name);

export const isInput = (target?: Element) => {
    const element = target || document.activeElement || document.body;
    return ["TEXTAREA", "INPUT"].includes(element.tagName);
}

export const random = (min: number, max: number) => {
    const isInteger = Number.isInteger(min) && Number.isInteger(max);
    if (isInteger) return Math.floor(Math.random() * (max - min + 1) + min);
    return Math.random() * (max - min) + min;
}

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}

export const lerp = (start: number, stop: number, amt: number) => {
    return amt * (stop - start) + start;
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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

export const isBlind = () => {
    return !settings.blindUsers.every(a => a === 1);
}

export const angle = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.atan2(y2 - y1, x2 - x1);
}

export const formatAge = (age: number) => {
    return Math.floor(Math.log(1 + Math.max(0, age)) ** 2.4 / 13);
}

export const doWhile = (
    condition: () => boolean,
    callback: () => void,
    delay: number
) => {
    if (!condition()) return;
    const interval = setInterval(() => {
        if (condition()) {
            callback();
        } else {
            clearInterval(interval);
        }
    }, delay);
}

const define = (target: TObjectAny, key: string, value: number) => {
    Object.defineProperty(target, key, { get: () => value, configurable: true });
}

export const resetSkin = () => {
    const player = Dsync.myPlayer.target;
    if (!player) return;
    delete player[Dsync.props.skin];
    delete player[Dsync.props.accessory];
    delete player[Dsync.props.back];
}

export const updateSkin = () => {
    if (!settings.customSkins) return resetSkin();
    const player = Dsync.myPlayer.target;
    if (!player) return;
    define(player, Dsync.props.skin, settings.skin);
    define(player, Dsync.props.accessory, settings.accessory);
    define(player, Dsync.props.back, settings.back);
}