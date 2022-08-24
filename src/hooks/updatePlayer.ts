import { Dsync } from "..";
import { accept, autochat, equipHat, fastBreakHat, fastBreaking, heal } from "../modules/Controller";
import settings from "../modules/Settings";
import { EHats, ELayer, TObjectAny } from "../types";
import { distance, formatEntity, formatPlayer, formatProjectile, inGame } from "../utils/Common";
import { isStoneGold, upgradeScythe } from "../utils/Control";

let toggleClown = false;
let toggleScuba = false;
let isHealing = false;

const getDelay = (health: number) => {
    if (health < 74) return 60;
    if (health < 36) return 45;
    return 130;
}

const healing = () => {
    const { health, maxHealth, isClown } = Dsync.myPlayer;
    if (settings.autoheal && health < maxHealth && !isClown && inGame()) heal();
    setTimeout(healing, getDelay(health));
}

const updatePlayer = (target: TObjectAny) => {
    const entity = formatEntity(target);
    const player = formatPlayer(target);
    if (entity.type === 0) {
        if (player.id === Dsync.myPlayerID()) {
            Dsync.myPlayer = { ...Dsync.myPlayer, ...player };

            if (settings.skipUpgrades) {
                const upgradeBar = Dsync.defaultData[Dsync.props.upgradeBar];
                if (upgradeBar.length === 1) {
                    Dsync.upgradeItem(upgradeBar[0]);
                }
            }

            const { y2, health, maxHealth, isClown, hat, oldHat } = Dsync.myPlayer;

            if (settings.autoheal && health < maxHealth && !isHealing) {
                isHealing = true;
                healing();
            }

            const inRiver = y2 > 8075 && y2 < 8925;
            const notInRiver = !(y2 > 8000 && y2 < 9000);
            
            if (
                settings.autoScuba &&
                inRiver &&
                !toggleScuba
            ) {
                toggleScuba = true;
                Dsync.myPlayer.oldHat = hat;
                equipHat(EHats.SCUBA, false, false);
            }

            if (toggleScuba && notInRiver) {
                equipHat(oldHat);
                toggleScuba = false;
            }

            if (
                settings.jungleOnClown &&
                isClown &&
                hat !== EHats.JUNGLE &&
                !toggleClown
            ) {
                toggleClown = true;
                Dsync.myPlayer.oldHat = fastBreaking ? fastBreakHat : hat;
                equipHat(EHats.JUNGLE, false, false);
            }

            if (!isClown && toggleClown) {
                equipHat(oldHat);
                toggleClown = false;
            }
            if (settings.autochat) autochat();

            if (settings.autoScythe && Dsync.entityList()[ELayer.GOLDENCOW].length && !isStoneGold()) {
                upgradeScythe();
            }

            if (settings.autoAccept && Dsync.clanData[Dsync.props.acceptList].length) {
                accept(true);
            }
        }

        if (settings.hatReloadBar) {
            if (target.oldId !== player.id) {
                target.oldId = player.id;
                target.oldHat = player.hat;
                target.hatReload = 1300;
            }
        
            if (target.oldHat !== player.hat) {
                target.oldHat = player.hat;
                target.hatReload = 0;
            }
        
            target.hatReload = Math.min(target.hatReload + Dsync.step, 1300);
        }
    } else {
        if (settings.fireballReloadBar && entity.type === ELayer.DRAGON) {
            const fireballs = Dsync.entityList()[ELayer.FIREBALL].map(object => {
                const fireball = formatEntity(object);
                return distance(entity, fireball).dist;
            });
            const total = fireballs.reduce((total, int) => total + int, 0);
            const reload = 2900;

            if (target.oldId !== entity.id) {
                target.oldId = entity.id;
                target.total = total;
                target.fireballReload = reload;
            }

            if ((fireballs.length === 5 && total < 600 || fireballs.length === 1 && total < 100) && target.fireballReload === reload) {
                target.total = total;
                target.fireballReload = 0;
            }

            target.fireballReload = Math.min(target.fireballReload + Dsync.step, reload);
        }

        if (settings.turretReloadBar && entity.type === ELayer.TURRET) {
            const projectile = Dsync.entityList()[ELayer.PROJECTILE].find(object => {
                const bullet = formatProjectile(object);
                return bullet.ownerID === entity.ownerID && entity.angle2 === bullet.angle2;
            });

            if (target.turretReload === undefined) {
                target.turretReload = 3000;
            }

            if (projectile) {
                const bullet = formatProjectile(projectile);
                if (bullet && target.bulletID !== bullet.id) {
                    target.bulletID = bullet.id;
                    target.turretReload = 0;
                }
            }
            target.turretReload = Math.min(target.turretReload + Dsync.step, 3000);
        }
    }
}

export default updatePlayer;