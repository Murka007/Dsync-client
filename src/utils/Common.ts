import { Dsync, log } from "..";
import { teammates } from "../hooks/clanHandler";
import settings from "../modules/Settings";
import { ELayer, IData, IEntity, ILinker, IObject, IPlayer, IProjectile, TCTX, TObjectAny } from "../types";
import { getEntities } from "./Control";
import Images from "./Images";

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

export const getTracerColor = (entity: IEntity, isTeammate: boolean): string => {
    if (entity.id === Dsync.myPlayerID() || isTeammate) return settings.teammateColor;
    if (entity.type === 0) return settings.enemyColor;
    return settings.animalColor;
}

const trapActive = (object: TObjectAny) => {
    const trap = formatObject(object);
    return getEntities().some(entity => {
        return distance(entity, trap).dist < trap.radius + entity.radius - 25;
    })
}

export const getMarkerColor = (target: TObjectAny, ownerID: number) => {
    let color: string = null;
    const isMyPlayers = (Dsync.myPlayer || {}).ownerID === ownerID;
    const isTeammates = teammates.includes(ownerID);
    const isTeammateTrap = target.type === 6 && (isMyPlayers || isTeammates);
    if (settings.itemMarkers && isMyPlayers) {
        color = settings.itemMarkersColor;
    } else if (settings.teammateMarkers && isTeammates) {
        color = settings.teammateMarkersColor;
    } else if (settings.enemyMarkers && !isMyPlayers && !isTeammates) {
        color = settings.enemyMarkersColor;
    }

    if (settings.trapActivated && isTeammateTrap) {
        const id = target[Dsync.props.id];
        if (!target.active && trapActive(target)) {
            target.active = id;
        }
        
        if (target.active === id) return settings.trapActivatedColor;
        target.active = null;
    }
    return color;
}

export const marker = (ctx: TCTX, color: string) => {
    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 3;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export const arrow = (ctx: TCTX, len: number, x: number, y: number, angle: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.75;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-len, -len);
    ctx.lineTo(len, -len);
    ctx.lineTo(len, len);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

export const lines = (ctx: TCTX, x1: number, y1: number, x2: number, y2: number, color: string) => {
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

const images: { [key: string]: HTMLCanvasElement } = {};
export const crosshair = (
    ctx: TCTX,
    x: number,
    y: number,
    angle: number,
    color: string,
    radius: number,
    width: number,
    height: number
) => {
    const canvas = images[color] || (function() {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width / 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        for (let i=0;i<4;i++) {
            ctx.beginPath();
            ctx.rect(-width/2, radius - height / 2, width, height);
            ctx.fill();
            ctx.rotate(Math.PI / 2);
            ctx.closePath();
        }
        images[color] = canvas;
        return canvas;
    })();
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.75;
    ctx.drawImage(canvas, -canvas.width/2, -canvas.height/2);
    ctx.restore();
}

const drawImage = (ctx: TCTX, image: HTMLImageElement) => {
    ctx.drawImage(image, -0.5 * image.width / 2, -0.5 * image.height, image.width * 0.5, image.height * 0.5);
}

export const drawBar = (ctx: TCTX, entity: IEntity | IObject, value: number, maxValue: number, color: string) => {
    const { x, y, radius } = entity;
    const background = Images.gaugeBackground;
    const front = Images.gaugeFront;
    const scale = 0.5;
    const width = front.width * scale;
    const fill = value / maxValue * (width - 10);
    const h = entity.type === ELayer.TURRET ? 25 : 50;

    ctx.save();
    if (settings.markersBottom && entity.type === ELayer.TURRET) {
        ctx.rotate(Math.PI - entity.angle);
        ctx.rotate(Math.PI);
    }
    ctx.translate(x, y + radius + h + front.height * scale);
    drawImage(ctx, background);
    ctx.fillStyle = color;
    ctx.fillRect(-width / 2 + 5, -scale * front.height + 5, fill, scale * front.height - 10);
    drawImage(ctx, front);
    ctx.restore();
}

export const drawHealth = (ctx: TCTX, entity: IEntity) => {
    if (!settings.drawHP) return;

    const { x, y, health, maxHealth, radius } = entity;
    const front = Images.gaugeFront;
    let h = 0;
    if (
        settings.hatReloadBar && entity.type === 0 ||
        settings.fireballReloadBar && entity.type === ELayer.DRAGON
    ) {
        h = front.height * 0.5;
    }

    renderText(ctx, `HP ${health}/${maxHealth}`, (width, height) => {
        return [
            x - width / 2,
            y + radius + h + 55
        ]
    })
}

interface IDist {
    lerpDist: number;
    dist: number;
}

const dist = (x1: number, y1: number, x2: number, y2: number): number => {
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

export const drawTracers = (ctx: TCTX, entity: IEntity, isTeammate: boolean) => {
    const player = formatPlayer(Dsync.target);
    const { x: x1, y: y1 } = player;
    const { x: x2, y: y2 } = entity;
    const color = settings.rainbow ? `hsl(${Dsync.hsl}, 100%, 50%)` : getTracerColor(entity, isTeammate);

    if (settings.arrows) {
        const arrowWidth = 8;
        const angle = getAngle(entity, player).lerpAngle;
        const dist = Math.min(100 + arrowWidth * 2, distance(entity, player).lerpDist - arrowWidth * 2);
        const x = x1 + dist * Math.cos(angle);
        const y = y1 + dist * Math.sin(angle);
        arrow(ctx, arrowWidth, x, y, angle, color);
    } else {
        lines(ctx, x1, y1, x2, y2, color);
    }
}

interface ITextOptions {
    font?: string;
    textBaseline?: CanvasTextBaseline;
}

const TextOptions: ITextOptions = {
    font: "bold 15px Montserrat",
    textBaseline: "top"
}

export const renderText = (
    ctx: TCTX,
    text: string,
    callback: (width: number, height: number) => [number, number],
    options?: ITextOptions
) => {
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#303030";
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    Object.assign(ctx, TextOptions, options);

    const width = ctx.measureText(text).width;
    const height = parseInt(ctx.font.match(/\d+/)[0]) || 1;
    const data = callback(width, height);

    ctx.strokeText(text, ...data);
    ctx.fillText(text, ...data);
    ctx.restore();
}

export const windmillRotation = (target: TObjectAny) => {
    if (target.type !== ELayer.WINDMILL && target.type !== ELayer.POWERMILL) return;
    if (!target.rotSpeed) {
        target.rotSpeed = target[Dsync.props.rotSpeed];
    }

    const rot = settings.windmillRotation ? target.rotSpeed : 0;
    if (target[Dsync.props.rotSpeed] !== rot) {
        target[Dsync.props.rotSpeed] = rot;
    }
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