import { controller, Dsync, log } from "..";
import { Items, Shooting } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { EWeapons, Reload, TObjectAny, TReload } from "../types";
import { Formatter } from "../utils/Common";

const createEntity = (target: TObjectAny) => {
    const id = target[Dsync.props.id];
    const type = target.type;
    const entities = Dsync.saves.entityList();
    if (type === ELayer.PLAYER) {
        if (id === Dsync.saves.myPlayerID()) {
            Dsync.myPlayer.target = target;
        }

        const player = Formatter.player(target);
        target.hatReload = { ...Reload.hat };
        target.weaponReload = { ...Reload.weapon };
        target.prevHat = player.hat;
        
        const weaponReload = target.weaponReload as TReload;
        if (controller.isWeapon(player.currentItem)) {
            weaponReload.max = Items[player.currentItem].reload;
            weaponReload.current = weaponReload.max;
            weaponReload.lerp = weaponReload.max;
        }

    } else if (type === ELayer.TURRET) {
        target.turretReload = { ...Reload.turret };
    } else if (type === ELayer.DRAGON) {
        target.fireballReload = { ...Reload.fireball };
    } else if (type === ELayer.PROJECTILE) {
        const projectile = Formatter.projectile(target);
        const type = projectile.projectileType;

        const isTurret = settings.turretReloadBar && entities[ELayer.TURRET].find(target => {
            const turret = Formatter.object(target);
            const isOwner = turret.ownerID === projectile.ownerID;
            const isX = turret.x2 === projectile.x2;
            const isY = turret.y2 === projectile.y2;
            return isOwner && isX && isY;
        });

        const isPlayer = settings.weaponReloadBar && entities[ELayer.PLAYER].find(target => {
            const player = Formatter.player(target);
            const isOwner = player.ownerID === projectile.ownerID;
            return isOwner;
        });

        if (isTurret) {
            const reload = isTurret.turretReload as TReload;
            reload.current = -Dsync.step;
            reload.lerp = 0;
        } else if (isPlayer) {
            const weapon = Shooting.find(weapon => weapon.projectile === type);
            let delay = weapon.reload;

            if (type === 88) {
                const id = isPlayer.secondary === EWeapons.XBOW ? EWeapons.XBOW : EWeapons.BOW;
                delay = Items[id].reload;
            }

            const reload = isPlayer.weaponReload as TReload;
            reload.current = -Dsync.step;
            reload.lerp = 0;
            reload.max = delay;
        }
    } else if (type === ELayer.FIREBALL && entities[ELayer.DRAGON].length && settings.fireballReloadBar) {
        const dragon = entities[ELayer.DRAGON][0];
        const reload = dragon.fireballReload as TReload;
        reload.current = -Dsync.step;
        reload.lerp = 0;
    }
}

export default createEntity;