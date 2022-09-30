import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { EItems, ELayer, EWeapons, TargetReload, TObjectAny } from "../types";
import { angleObject, diff, formatEntity, formatObject, formatPlayer, formatProjectile } from "../utils/Common";

const createEntity = (target: TObjectAny) => {
    const id = target[Dsync.props.id];
    const type = target.type;
    const entities = Dsync.entityList();
    if (type === ELayer.PLAYER && id === Dsync.myPlayerID()) {
        Dsync.target = target;
    } else if (type === ELayer.PROJECTILE) {
        const projectile = formatProjectile(target);
        const type = projectile.projectileType;

        const isTurret = settings.turretReloadBar && entities[ELayer.TURRET].find(object => {
            const turret = formatObject(object);
            const isOwner = turret.ownerID === projectile.ownerID;
            const isX = turret.x2 === projectile.x2;
            const isY = turret.y2 === projectile.y2;
            return isOwner && isX && isY;
        });

        const isPlayer = settings.weaponReloadBar && entities[ELayer.PLAYER].find(object => {
            const player = formatPlayer(object);
            const isOwner = player.ownerID === projectile.ownerID;
            return isOwner;
        });

        if (isTurret) {
            isTurret.turretReload = -Dsync.step;
        } else if (isPlayer) {
            const shooting = [EWeapons.MUSKET, EWeapons.BOW, EWeapons.PEARL].map(a => Dsync.itemData[a]);
            const weapon = shooting.find(weapon => weapon[Dsync.props.bulletType] === type);
            let reload = weapon.reload;

            if (type === 88) {
                const id = isPlayer.secondary === EWeapons.XBOW ? EWeapons.XBOW : EWeapons.BOW;
                reload = Dsync.itemData[id].reload;
            }

            isPlayer.weaponMaxReload = reload;
            isPlayer.weaponReload = -Dsync.step;
        }
    } else if (type === ELayer.FIREBALL && entities[ELayer.DRAGON].length && settings.fireballReloadBar) {
        const dragon = entities[ELayer.DRAGON][0];
        dragon.fireballReload = -Dsync.step;
    }
}

export default createEntity;