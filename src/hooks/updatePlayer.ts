import { controller, Dsync, log, pingCount } from "..";
import { Hat } from "../constants/Hats";
import { Items, ItemType } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { EObjects, PlacementType, TargetReload, TObjectAny } from "../types";
import { Formatter, isBlind, isInput, random } from "../utils/Common";
import { EntityManager } from "../utils/Control";

let isHealing = false;
let start = Date.now();

const getDelay = (health: number) => {
    if (health < 74) return 60;
    if (health < 36) return 45;
    return 130;
}

const healing = () => {
    const { health, maxHealth, isClown } = Dsync.myPlayer;
    if (settings.autoheal && health < maxHealth && !isClown && controller.inGame) controller.heal();
    setTimeout(healing, getDelay(health));
}

const updatePlayer = (target: TObjectAny) => {
    const entity = Formatter.entity(target);

    switch (entity.type) {
        case ELayer.PLAYER: {
            const player = Formatter.player(target);
            if (controller.isWeapon(player.currentItem)) {
                if (controller.isSecondary(player.currentItem)) {
                    target.secondary = player.currentItem;
                } else {
                    target.primary = player.currentItem;
                }
            }

            if (player.id === Dsync.saves.myPlayerID()) {
                Dsync.myPlayer = { ...Dsync.myPlayer, ...player };

                const { x2, y2, health, maxHealth, isClown, hat } = Dsync.myPlayer;

                if (settings.autoheal && health < maxHealth && !isHealing) {
                    isHealing = true;
                    healing();
                }

                const inRiver = y2 > 8050 && y2 < 8950;
                const notInRiver = !(y2 > 8000 && y2 < 9000);

                if (
                    !controller.toggleJungle &&
                    settings.jungleOnClown &&
                    isClown &&
                    hat !== Hat.JUNGLE &&
                    controller.equipHat(Hat.JUNGLE, false)
                ) {
                    controller.toggleJungle = true;
                }

                if (
                    controller.toggleJungle && !isClown && controller.inGame &&
                    controller.equipHat(controller.previousHat, true)
                ) {
                    controller.toggleJungle = false;
                }


                const onPlatform = EntityManager.entityIn(Dsync.myPlayer, ELayer.PLATFORM);
                if (
                    !controller.toggleScuba &&
                    inRiver &&
                    settings.autoScuba &&
                    !onPlatform &&
                    controller.equipHat(Hat.SCUBA, false)
                ) {
                    controller.toggleScuba = true;
                }

                if (
                    controller.toggleScuba && (notInRiver || onPlatform) && controller.inGame &&
                    controller.equipHat(controller.previousHat, true)
                ) {
                    controller.toggleScuba = false;
                }

                if (settings.autochat) controller.autochat();

                if (settings.autoAccept && Dsync.saves.clanData[Dsync.props.acceptList].length) {
                    controller.accept(true);
                }

                const automill = controller.age < 10 && controller.hasCount(ItemType.WINDMILL);
                const automillSpawn = controller.age > 9 && controller.currentCount(ItemType.WINDMILL) === 0 && controller.automillSpawn;
                controller.automill = settings.automill && (automill || automillSpawn);

                if (controller.isDoingNothing()) {
                    if (controller.autobed && controller.hasResources(EObjects.SPAWN)) {
                        controller.place(ItemType.SPAWN, random(-Math.PI, Math.PI));
                    }

                    if (
                        controller.automill &&
                        controller.hasResources(controller.itemBar[ItemType.WINDMILL]) &&
                        controller.move !== 0
                    ) {
                        const angle = controller.getAngleFromBitmask(controller.move, true);
                        controller.place(ItemType.WINDMILL, angle, PlacementType.INVISIBLE);
                    }
                }

                if (!controller.hasCount(ItemType.SPAWN) && controller.autobed) {
                    controller.autobed = false;
                }

                if (!controller.hasCount(ItemType.WINDMILL) && controller.automillSpawn) {
                    controller.automillSpawn = false;
                }

                controller.updateWeapon(ItemType.PRIMARY);

                const now = Date.now();
                if (now - start > 10000 && !isInput() && isBlind()) {
                    start = now;
                    controller.PacketManager.chat(pingCount);
                }
            }

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

            if (settings.weaponReloadBar) {
                if (target.weaponMaxReload === undefined && controller.isWeapon(player.currentItem)) {
                    target.weaponMaxReload = Items[player.currentItem].reload;
                }

                if (target.weaponMaxReload !== undefined) {
                    if (target.weaponReload === undefined) {
                        target.weaponReload = target.weaponMaxReload;
                    }

                    target.weaponReload = Math.min(target.weaponReload + Dsync.step, target.weaponMaxReload);
                }
            }
            break;
        }

        case ELayer.TURRET: {
            if (settings.turretReloadBar) {
                if (target.turretReload === undefined) {
                    target.turretReload = TargetReload.TURRET;
                }

                target.turretReload = Math.min(target.turretReload + Dsync.step, TargetReload.TURRET);
            }
            break;
        }

        case ELayer.DRAGON: {
            if (settings.fireballReloadBar) {
                if (target.fireballReload === undefined) {
                    target.fireballReload = TargetReload.DRAGON;
                }

                target.fireballReload = Math.min(target.fireballReload + Dsync.step, TargetReload.DRAGON);
            }
            break;
        }
    }
}

export default updatePlayer;