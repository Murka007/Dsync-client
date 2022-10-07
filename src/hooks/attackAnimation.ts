import { controller, Dsync, log } from "..";
import { Items } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import Vector from "../modules/Vector";
import { TObjectAny } from "../types";
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
            const reload = Items[weapon].reload || 0;
            target.weaponMaxReload = reload;
            target.weaponReload = -Dsync.step;
            target.weaponReloadLerp = 0;
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
                    controller.PacketManager.changeAngle(Dsync.saves.getAngle());
                }
            }
        }
    }
}

export default attackAnimation;