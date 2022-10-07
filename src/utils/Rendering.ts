import { controller, Dsync, log } from "..";
import { ELayer, LayerData } from "../constants/LayerData";
import { teammates } from "../hooks/clanHandler";
import settings from "../modules/Settings";
import Vector from "../modules/Vector";
import { TCTX, TObjectAny, TReload } from "../types";
import { clamp, Formatter, IEntity, IObject, lerp, TypeEntity } from "./Common";
import { EntityManager } from "./Control";
import Images from "./Images";

interface ITextOptions {
    font?: string;
    textBaseline?: CanvasTextBaseline;
}

const TextOptions: Readonly<ITextOptions> = {
    font: "bold 15px Montserrat",
    textBaseline: "top"
}

export class RenderManager {

    static marker(ctx: TCTX, color: string) {
        ctx.strokeStyle = "#303030";
        ctx.lineWidth = 3;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    static circle(ctx: TCTX, x: number, y: number, radius: number, color: string) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    static arrow(ctx: TCTX, len: number, x: number, y: number, angle: number, color: string) {
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

    static lines(ctx: TCTX, x1: number, y1: number, x2: number, y2: number, color: string) {
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

    static tracerColor(entity: TypeEntity, isTeammate: boolean) {
        if (isTeammate) return settings.teammateColor;
        if (entity.type === ELayer.PLAYER) return settings.enemyColor;
        return settings.animalColor;
    }

    static trapActive(trap: IObject) {
        return EntityManager.entities().some(entity => {
            const radius = trap.radius + entity.radius;
            return EntityManager.distance(entity, trap) < (radius - 25);
        })
    }

    static markerColor(target: TObjectAny, ownerID: number) {
        let color: string = null;

        const object = Formatter.object(target);
        const isMyPlayer = Dsync.myPlayer.ownerID === ownerID;
        const isTeammate = teammates.includes(ownerID);
        const isTeammateTrap = object.type === ELayer.TRAP && (isMyPlayer || isTeammate);

        if (settings.itemMarkers && isMyPlayer) {
            color = settings.itemMarkersColor;
        } else if (settings.teammateMarkers && isTeammate && !isMyPlayer) {
            color = settings.teammateMarkersColor;
        } else if (settings.enemyMarkers && !isMyPlayer && !isTeammate) {
            color = settings.enemyMarkersColor;
        }

        if (settings.trapActivated && isTeammateTrap) {
            if (!target.active && this.trapActive(object)) {
                target.active = object.id;
            }

            if (target.active === object.id) {
                return settings.trapActivatedColor;
            }
            target.active = null;
        }

        return color;
    }

    static renderText(
        ctx: TCTX,
        text: string,
        callback: (width: number, height: number) => [number, number],
        options?: ITextOptions
    ) {
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

    static renderHP(ctx: TCTX, entity: IEntity, height = 0) {
        if (!settings.drawHP) return;

        const { x, y, health, maxHealth, radius } = entity;

        this.renderText(ctx, `HP ${health}/${maxHealth}`, (width) => {
            return [
                x - width / 2,
                y + radius + 55 + height
            ]
        })
    }

    static drawImage(ctx: TCTX, image: HTMLImageElement) {
        if (!(image && image.naturalHeight !== 0)) return;
        const w = image.width;
        const h = image.height;
        const s = 0.5;
        ctx.drawImage(image, -s * w / 2, -s * h, w * s, h * s);
    }

    static renderBar(
        ctx: TCTX,
        entity: TypeEntity,
        value: number,
        maxValue: number,
        color: string,
        extraHeight = 0
    ) {
        const { x, y, radius } = entity;
        const background = Images.gaugeBackground;
        const front = Images.gaugeFront;
        const scale = 0.5;
        const width = front.width * scale;
        const fill = value / maxValue * (width - 10);
        const h = (entity.type === ELayer.TURRET ? 25 : 50) + extraHeight;

        ctx.save();
        if (entity.type === ELayer.TURRET) {
            ctx.rotate(Math.PI - entity.angle);
            ctx.rotate(Math.PI);
        }
        ctx.translate(x, y + radius + h + front.height * scale);
        this.drawImage(ctx, background);
        ctx.fillStyle = color;
        ctx.fillRect(-width / 2 + 5, -scale * front.height + 5, fill, scale * front.height - 10);
        this.drawImage(ctx, front);
        ctx.restore();
        return front.height * scale;
    }

    static reloadBar(ctx: TCTX, entity: TypeEntity, reload: TReload, height: number) {
        const fill = clamp(reload.current, 0, reload.max);
        reload.lerp = lerp(reload.lerp, fill, 0.2);
        const value = settings.smoothReloadBar ? reload.lerp : fill;
        return this.renderBar(ctx, entity, value, reload.max, reload.color(), height);
    }

    static windmillRotation(target: TObjectAny) {

        const rotateSpeed = LayerData[target.type].rotateSpeed;
        if (rotateSpeed === undefined) return;

        const speed = settings.windmillRotation ? rotateSpeed : 0;
        if (target[Dsync.props.rotateSpeed] !== speed) {
            target[Dsync.props.rotateSpeed] = speed;
        }
    }

    static renderMarker(ctx: TCTX, target: TObjectAny) {
        const object = Formatter.object(target);
        if (object.ownerID === 0) return;

        if (object.type === ELayer.TURRET && settings.turretReloadBar) {
            this.reloadBar(ctx, { ...object, x: 0, y: 0 }, target.turretReload, 0);
        }

        this.windmillRotation(target);

        const color = this.markerColor(target, object.ownerID);
        if (color === null) return;
        this.marker(ctx, color);
    }

    static renderTracer(ctx: TCTX, entity: IEntity, isTeammate: boolean) {
        const player = Formatter.player(Dsync.myPlayer.target);
        const color = settings.rainbow ? `hsl(${controller.hsl}, 100%, 50%)` : this.tracerColor(entity, isTeammate);

        const pos1 = new Vector(player.x, player.y);
        const pos2 = new Vector(entity.x, entity.y);

        if (settings.arrows) {
            const w = 8;
            const distance = Math.min(100 + w * 2, pos1.distance(pos2) - w * 2);
            const angle = pos1.angle(pos2);
            const pos = pos1.direction(angle, distance);
            this.arrow(ctx, w, pos.x, pos.y, angle, color);
        } else {
            this.lines(ctx, pos1.x, pos1.y, pos2.x, pos2.y, color);
        }
    }
}