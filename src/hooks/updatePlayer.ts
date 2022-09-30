import { Dsync, log } from "..";
import { accept, autochat, equipHat, fastBreakHat, fastBreaking, heal } from "../modules/Controller";
import settings from "../modules/Settings";
import { EHats, ELayer, TargetReload, TObjectAny } from "../types";
import { distance, distObject, formatEntity, formatPlayer, formatProjectile, inGame } from "../utils/Common";
import { getPlayerByOwner, isSecondary, isWeapon } from "../utils/Control";

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

        if (isWeapon(player.currentItem)) {
            if (isSecondary(player.currentItem)) {
                target.secondary = player.currentItem;
            } else {
                target.primary = player.currentItem;
            }
        }

        if (player.id === Dsync.myPlayerID()) {
            Dsync.myPlayer = { ...Dsync.myPlayer, ...player };

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

            if (settings.autoAccept && Dsync.clanData[Dsync.props.acceptList].length) {
                accept(true);
            }
        }

        if (settings.hatReloadBar) {
            if (target.oldId !== player.id) {
                target.oldId = player.id;
                target.prevHat = player.hat;
                target.hatReload = TargetReload.HAT;
            }

            if (target.prevHat !== player.hat) {
                target.prevHat = player.hat;
                target.hatReload = -Dsync.step;
            }
            target.hatReload = Math.min(target.hatReload + Dsync.step, TargetReload.HAT);
        }

        if (settings.weaponReloadBar) {
            if (target.weaponMaxReload === undefined && isWeapon(player.currentItem)) {
                target.weaponMaxReload = Dsync.itemData[player.currentItem].reload;
            }

            if (target.weaponMaxReload !== undefined) {
                if (target.weaponReload === undefined) {
                    target.weaponReload = target.weaponMaxReload;
                }

                target.weaponReload = Math.min(target.weaponReload + Dsync.step, target.weaponMaxReload);
            }
        }
    }

    if (entity.type === ELayer.TURRET && settings.turretReloadBar) {
        if (target.turretReload === undefined) {
            target.turretReload = TargetReload.TURRET;
        }

        target.turretReload = Math.min(target.turretReload + Dsync.step, TargetReload.TURRET);
    }

    if (entity.type === ELayer.DRAGON && settings.fireballReloadBar) {
        if (target.fireballReload === undefined) {
            target.fireballReload = TargetReload.DRAGON;
        }

        target.fireballReload = Math.min(target.fireballReload + Dsync.step, TargetReload.DRAGON);
    }
}

export default updatePlayer;