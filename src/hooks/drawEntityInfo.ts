import { controller, Dsync, log } from "..";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { Hit, TCTX, TObjectAny } from "../types";
import { angle, Formatter } from "../utils/Common";
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
            const dir = settings.visualAim ? angle(entity.x, entity.y, aim.x, aim.y) : controller.mouse.angle;
            Dsync.myPlayer.target[Dsync.props.angle] = dir;
        }
    }

    let height = 0;
    if (entity.type === ELayer.PLAYER) {
        if (settings.hatReloadBar) {
            height += RenderManager.reloadBar(ctx, entity, target.hatReload, height);
        }

        if (settings.weaponReloadBar) {
            height += RenderManager.reloadBar(ctx, entity, target.weaponReload, height);
        }
    }

    if (entity.type === ELayer.DRAGON && settings.fireballReloadBar) {
        height += RenderManager.reloadBar(ctx, entity, target.fireballReload, height);
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