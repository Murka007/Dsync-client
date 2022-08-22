import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { ELayer, TCTX, TObjectAny } from "../types";
import { crosshair, drawBar, drawHealth, drawTracers, formatEntity, getAngle, getTracerColor, renderText } from "../utils/Common";
import { projectileCanHitEntity } from "../utils/Control";
import Images from "../utils/Images";

const drawEntityInfo = (
    target: TObjectAny,
    ctx: TCTX,
    isTeammate: boolean
) => {
    const entity = formatEntity(target);

    const id = Dsync.myPlayerID();
    if (id === entity.id) {
        if (settings.rainbow)  {
            Dsync.hsl = (Dsync.hsl + 0.3) % 360;
        }
        if (Dsync.aimTarget) {
            const aimTarget = formatEntity(Dsync.aimTarget);
            Dsync.target[Dsync.props.angle] = getAngle(aimTarget, entity).lerpAngle;
        }
    }
    drawHealth(ctx, entity);

    if (target.oldId) {
        if (settings.hatReloadBar && entity.type === 0) {
            drawBar(ctx, entity, target.hatReload, 1300, settings.hatReloadBarColor);
        }
    
        if (settings.fireballReloadBar && entity.type === ELayer.DRAGON) {
            drawBar(ctx, entity, target.fireballReload, 3000, settings.fireballReloadBarColor);
        }
    }

    if (settings.drawID && entity.type === 0) {
        const front = Images.gaugeFront;
        const w = front.width * 0.5;
        const h = front.height * 0.5;

        // Left
        // x: entity.x - w / 2 - width - 5,
        // y: entity.y - h + (entity.radius + 50) + 5

        // Right
        // x: entity.x + w / 2 + 5,
        // y: entity.y - h + (entity.radius + 50) + 5

        renderText(ctx, entity.id.toString(), (width, height) => {
            return [
                entity.x + w / 2 + 5,
                entity.y - h + (entity.radius + 50) + 5
            ]
        }, {
            font: "bold 14px Montserrat",
            textBaseline: "top"
        })
    }

    if (id === entity.id || Dsync.myPlayer === null) return;

    if (settings.possibleShots && !isTeammate) {
        const entityHit = projectileCanHitEntity(entity);
        if (typeof entityHit === "object" && entityHit.canHit && !entityHit.needDestroy) {
            const color = settings.rainbow ? `hsl(${Dsync.hsl}, 100%, 50%)` : getTracerColor(entity, isTeammate);
            crosshair(ctx, entity.x, entity.y, entity.angle, color, 20, 8, 18);
        }
    }

    // Tracers handler
    if (
        settings.enemyTracers && entity.type === 0 && !isTeammate ||
        settings.teammateTracers && entity.type === 0 && isTeammate ||
        settings.animalTracers && entity.type !== 0
    ) {
        drawTracers(ctx, entity, isTeammate);
    }
}

export default drawEntityInfo;