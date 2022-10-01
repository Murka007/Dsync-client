import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { EItemTypes, ELayer, TargetReload, TCTX, TObjectAny } from "../types";
import { clamp, formatEntity, formatPlayer, getAngle } from "../utils/Common";
import { projectileCanHitEntity } from "../utils/Control";
import Images from "../utils/Images";
import { crosshair, drawBar, drawHealth, drawTracers, getTracerColor, marker, renderText } from "../utils/Rendering";

const drawEntityInfo = (
    target: TObjectAny,
    ctx: TCTX,
    isTeammate: boolean
) => {
    const entity = formatEntity(target);

    const id = Dsync.myPlayerID();
    if (id === entity.id) {
        // const player = formatPlayer(target);
        if (settings.rainbow)  {
            Dsync.hsl = (Dsync.hsl + 0.3) % 360;
        }
        if (Dsync.aimTarget) {
            const aimTarget = formatEntity(Dsync.aimTarget);
            Dsync.target[Dsync.props.angle] = settings.visualAim ? getAngle(aimTarget, entity).lerpAngle : Dsync.getAngle();
        }
    }

    let height = 0;
    if (entity.type === 0) {
        if (settings.hatReloadBar && target.oldId) {
            const fillValue = clamp(target.hatReload, 0, TargetReload.HAT);
            height += drawBar(ctx, entity, fillValue, TargetReload.HAT, settings.hatReloadBarColor, height);
        }

        if (settings.weaponReloadBar) {
            const fillValue = clamp(target.weaponReload, 0, target.weaponMaxReload);
            height += drawBar(ctx, entity, fillValue, target.weaponMaxReload, settings.weaponReloadBarColor, height);
        }

        if (settings.drawID) {
            const front = Images.gaugeFront;
            const w = front.width * 0.5;
            const h = front.height * 0.5;

            renderText(ctx, entity.id.toString(), () => {
                return [
                    entity.x + w / 2 + 5,
                    entity.y - h + (entity.radius + 50) + 5
                ]
            }, {
                font: "bold 14px Montserrat",
                textBaseline: "top"
            })
        }
    }

    if (entity.type === ELayer.DRAGON && settings.fireballReloadBar) {
        const fillValue = clamp(target.fireballReload, 0, TargetReload.DRAGON);
        height += drawBar(ctx, entity, fillValue, TargetReload.DRAGON, settings.fireballReloadBarColor);
    }

    drawHealth(ctx, entity, height);

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