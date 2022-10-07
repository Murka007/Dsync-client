import { controller, Dsync, log, pingCount } from "..";
import { Hat } from "../constants/Hats";
import { ItemType } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { EObjects, PlacementType, TObjectAny, TReload } from "../types";
import { Formatter, isBlind, isInput, random } from "../utils/Common";
import { EntityManager } from "../utils/Control";

let isHealing = false;
let start = Date.now();

const getDelay = (health: number) => {
    if (health < 36) return 45;
    if (health < 74) return 60;
    if (health < 90) return 130;
    return 200;
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

                const hasPlatform = controller.itemBar[ItemType.PLATFORM] === EObjects.PLATFORM;
                if (
                    settings.antiFireball &&
                    hasPlatform &&
                    controller.hasCount(ItemType.PLATFORM) &&
                    EntityManager.entityIn(Dsync.myPlayer, ELayer.FIREBALL, 23) &&
                    !EntityManager.entityIn(Dsync.myPlayer, ELayer.PLATFORM)
                ) {
                    const nearest = EntityManager.nearestLayer(Dsync.myPlayer, ELayer.FIREBALL);
                    controller.place(ItemType.PLATFORM, EntityManager.angle(nearest, Dsync.myPlayer), PlacementType.INVISIBLE);
                }

            }

            const hatReload = target.hatReload as TReload;
            if (target.prevHat !== player.hat) {
                target.prevHat = player.hat;
                hatReload.current = -Dsync.step;
                hatReload.lerp = 0;
            }
            hatReload.current = Math.min(hatReload.current + Dsync.step, hatReload.max);

            if (settings.weaponReloadBar) {
                const weaponReload = target.weaponReload as TReload;
                weaponReload.current = Math.min(weaponReload.current + Dsync.step, weaponReload.max);
            }
            break;
        }

        case ELayer.TURRET: {
            if (settings.turretReloadBar) {
                const turretReload = target.turretReload as TReload;
                turretReload.current = Math.min(turretReload.current + Dsync.step, turretReload.max);
            }
            break;
        }

        case ELayer.DRAGON: {
            if (settings.fireballReloadBar) {
                const fireballReload = target.fireballReload as TReload;
                fireballReload.current = Math.min(fireballReload.current + Dsync.step, fireballReload.max);
            }
            break;
        }
    }
}

export default updatePlayer;