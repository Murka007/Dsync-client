import { controller, Dsync, log } from "..";
import { Items } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { TObjectAny, TReload } from "../types";
import { Formatter } from "../utils/Common";
import { EntityManager } from "../utils/Control";

const attackAnimation = () => {
    if (!(settings.weaponReloadBar && settings.autosync)) return;

    const b = Dsync.saves.buffer;
    const len = Dsync.saves.byteLength();
    const players = Dsync.saves.players();
    for (let i=1;i<len;i+=5) {
        const type = b[i];
        const id = b[i + 1] | b[i + 2] << 8;
        const weapon = b[i + 3];
        const isObject = b[i + 4];
        const target = players.get(id);
        if (type === ELayer.PLAYER && target) {
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
}

export default attackAnimation;