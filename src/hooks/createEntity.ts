import { Dsync, log } from "..";
import { Items, Shooting } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { EWeapons, TObjectAny } from "../types";
import { Formatter } from "../utils/Common";

const createEntity = (target: TObjectAny) => {
    const id = target[Dsync.props.id];
    const type = target.type;
    const entities = Dsync.saves.entityList();
    if (type === ELayer.PLAYER && id === Dsync.saves.myPlayerID()) {
        Dsync.myPlayer.target = target;
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
            isTurret.turretReload = -Dsync.step;
        } else if (isPlayer) {
            const weapon = Shooting.find(weapon => weapon.projectile === type);
            let reload = weapon.reload;

            if (type === 88) {
                const id = isPlayer.secondary === EWeapons.XBOW ? EWeapons.XBOW : EWeapons.BOW;
                reload = Items[id].reload;
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