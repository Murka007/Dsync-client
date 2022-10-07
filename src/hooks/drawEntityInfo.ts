import { controller, Dsync, log } from "..";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import Vector from "../modules/Vector";
import { Hit, TargetReload, TCTX, TObjectAny } from "../types";
import { clamp, Formatter, lerp } from "../utils/Common";
import { EntityManager } from "../utils/Control";
import { RenderManager } from "../utils/Rendering";

const drawEntityInfo = (
    target: TObjectAny,
    ctx: TCTX,
    isTeammate: boolean
) => {
    const entity = Formatter.entity(target);

    const id = Dsync.saves.myPlayerID();
    if (id === entity.id) {
        if (settings.rainbow) {
            Dsync.controller.hsl = (Dsync.controller.hsl + 0.3) % 360;
        }

        if (controller.aimTarget !== null) {
            const aim = Formatter.entity(controller.aimTarget);
            const pos1 = new Vector(entity.x, entity.y);
            const pos2 = new Vector(aim.x, aim.y);
            const angle = settings.visualAim ? pos1.angle(pos2) : Dsync.saves.getAngle();
            Dsync.myPlayer.target[Dsync.props.angle] = angle;
        }
    }

    let height = 0;
    if (entity.type === ELayer.PLAYER) {
        if (settings.hatReloadBar && target.oldId) {
            const fillValue = clamp(target.hatReload, 0, TargetReload.HAT);
            target.hatReloadLerp = lerp(target.hatReloadLerp || 0, fillValue, 0.15);
            const renderValue = settings.smoothReloadBar ? target.hatReloadLerp : fillValue;
            height += RenderManager.renderBar(ctx, entity, renderValue, TargetReload.HAT, settings.hatReloadBarColor, height);
        }

        if (settings.weaponReloadBar) {
            const fillValue = clamp(target.weaponReload, 0, target.weaponMaxReload);
            target.weaponReloadLerp = lerp(target.weaponReloadLerp || 0, fillValue, 0.15);
            const renderValue = settings.smoothReloadBar ? target.weaponReloadLerp : fillValue;
            height += RenderManager.renderBar(ctx, entity, renderValue, target.weaponMaxReload, settings.weaponReloadBarColor, height);
        }
    }

    if (entity.type === ELayer.DRAGON && settings.fireballReloadBar) {
        const fillValue = clamp(target.fireballReload, 0, TargetReload.DRAGON);
        target.fireballReloadLerp = lerp(target.fireballReloadLerp || 0, fillValue, 0.15);
        const renderValue = settings.smoothReloadBar ? target.fireballReloadLerp : fillValue;
        height += RenderManager.renderBar(ctx, entity, renderValue, TargetReload.DRAGON, settings.fireballReloadBarColor);
    }

    RenderManager.renderHP(ctx, entity, height);

    if (id === entity.id || !Dsync.myPlayer.target) return;

    if (settings.possibleShots && !isTeammate) {
        const hit = EntityManager.projectileCanHitEntity(entity);
        if (hit === Hit.CAN) {
            const color = settings.rainbow ? `hsl(${controller.hsl}, 100%, 50%)` : RenderManager.tracerColor(entity, isTeammate);
            RenderManager.circle(ctx, entity.x, entity.y, entity.radius, color);
        }
    }

    if (EntityManager.inView(entity)) {
        RenderManager.circle(ctx, entity.x, entity.y, entity.radius, "red");
    }

    // Tracers handler
    if (
        settings.enemyTracers && entity.type === 0 && !isTeammate ||
        settings.teammateTracers && entity.type === 0 && isTeammate ||
        settings.animalTracers && entity.type !== 0
    ) {
        RenderManager.renderTracer(ctx, entity, isTeammate);
    }
}

export default drawEntityInfo;