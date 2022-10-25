import { controller, Dsync, log } from "..";
import { Items } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { TObjectAny, TReload } from "../types";
import { Formatter } from "../utils/Common";
import { EntityManager } from "../utils/Control";

const attackAnimation = (
    type: number,
    id: number,
    weapon: number,
    isObject: number,
    target: TObjectAny
) => {
    if (type === ELayer.PLAYER) {
        if (settings.weaponReloadBar) {
            const reload = target.weaponReload as TReload;
            reload.current = -Dsync.step;
            reload.lerp = 0;
            reload.max = Items[weapon].reload || 0;
        }

        if (settings.autosync && controller.canAutosync()) {
            const player = Formatter.player(target);
            if (controller.isTeammate(player) && controller.isPrimary(weapon)) {
                const nearest = EntityManager.nearestPossible(weapon, player);
                if (nearest !== null && EntityManager.inWeaponRange(Dsync.myPlayer, nearest, controller.itemBar[0])) {
                    const previousWeapon = controller.weapon;
                    controller.whichWeapon(false);
                    controller.attack(EntityManager.angle(Dsync.myPlayer, nearest));
                    controller.PacketManager.stopAttack();
                    controller.whichWeapon(previousWeapon);
                    controller.PacketManager.changeAngle(controller.mouse.angle);
                }
            }
        }
    }
}

export default attackAnimation;