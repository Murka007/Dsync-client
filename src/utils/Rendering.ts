import { Dsync } from "..";
import { teammates } from "../hooks/clanHandler";
import settings from "../modules/Settings";
import { ELayer, IEntity, IObject, TCTX, TObjectAny } from "../types";
import { distance, formatObject, formatPlayer, getAngle } from "./Common";
import { getEntities } from "./Control";
import Images from "./Images";

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

export const drawHealth = (ctx: TCTX, entity: IEntity, height = 0) => {
    if (!settings.drawHP) return;

    const { x, y, health, maxHealth, radius } = entity;

    renderText(ctx, `HP ${health}/${maxHealth}`, (width) => {
        return [
            x - width / 2,
            y + radius + 55 + height
        ]
    })
}

const drawImage = (ctx: TCTX, image: HTMLImageElement) => {
    if (image && image.naturalHeight !== 0) {
        ctx.drawImage(image, -0.5 * image.width / 2, -0.5 * image.height, image.width * 0.5, image.height * 0.5);
    }
}

export const drawBar = (
    ctx: TCTX,
    entity: IEntity | IObject,
    value: number,
    maxValue: number,
    color: string,
    extraHeight = 0
): number => {
    const { x, y, radius } = entity;
    const background = Images.gaugeBackground;
    const front = Images.gaugeFront;
    const scale = 0.5;
    const width = front.width * scale;
    const fill = value / maxValue * (width - 10);
    const h = (entity.type === ELayer.TURRET ? 25 : 50) + extraHeight;

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
    return front.height * scale;
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