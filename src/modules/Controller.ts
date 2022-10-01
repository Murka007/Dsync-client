import { Dsync, log } from "..";
import { EHats, EItems, EWeapons, PlacementType, TargetReload } from "../types";
import { angleObject, inGame, IPos, isInput, sleep } from "../utils/Common";
import { canShoot, futurePosition, getNearestPossibleEnemy, hasItemByType, hasResources, hasSecondary, itemBar, upgradeScythe } from "../utils/Control";
import settings from "./Settings";

export let move = 0;
let attacking = false;
let autoattack = false;
export let weapon = false;
let isHealing = false;
let attackingInvis = false;
let toggleInvis = false;
let currentItem: number = null;
let currentItemID: number = null;
const hotkeys = new Map<string | number, number>();

export const isDoingNothing = () => {
    return (
        !isHealing &&
        !attackingInvis &&
        currentItem === null
    )
}

export const getAngleFromBitmask = (bitmask: number, rotate: boolean) => {
    const pos: IPos = { x2: 0, y2: 0};
    if (bitmask & 0b0001) pos.y2--;
    if (bitmask & 0b0010) pos.y2++;
    if (bitmask & 0b0100) pos.x2--;
    if (bitmask & 0b1000) pos.x2++;
    if (rotate) {
        pos.x2 *= -1;
        pos.y2 *= -1;
    }
    return Math.atan2(pos.y2, pos.x2);
}

export const accept = (accept: boolean) => {
    Dsync.accept(accept);
    Dsync.clanData[Dsync.props.acceptList].shift();
}

export const spawn = async () => {
    await sleep(300);
    const play = document.querySelector("#play") as HTMLDivElement;
    if (play) play.click();
}

let chatCount = 0;
let chatToggle = false;
export const autochat = async () => {
    if (chatToggle || isInput() || !inGame()) return;
    chatToggle = true;

    const messages = settings.autochatMessages.filter(msg => msg.length);
    if (!messages.length) return;
    Dsync.chat(messages[chatCount++]);
    chatCount %= messages.length;
    await sleep(2000);
    chatToggle = false;
}

export const reset = () => {
    move = 0;
    attacking = false;
    autoattack = false;
    weapon = false;
    isHealing = false;
    attackingInvis = false;
    toggleInvis = false;
    currentItem = null;
    currentItemID = null;
    for (const [key] of hotkeys) {
        hotkeys.delete(key);
    }
}

export const equipHat = (id: number, ignore = false, actual = true) => {
    const hat = (Dsync.myPlayer || {}).hat || 0;
    if (id === 0) {
        id = hat;
    } else if (hat === id && !ignore) return;
    if (actual) {
        Dsync.actualHat = id;
    }
    Dsync.equipHat(id);
    Dsync.equipHat(id);
}

export const whichWeapon = (type?: boolean) => {
    if (type !== undefined) {
        weapon = type;
    }

    Dsync.selectByID(itemBar(Number(weapon)));
}

const attack = (angle: number = null) => {
    Dsync.attack(angle !== null ? angle : Dsync.getAngle());
}

export const place = (id: number, angle: number = null) => {
    const isHolding = settings.placementType === PlacementType.HOLDING;
    whichWeapon();
    if (isHolding && attacking) attack(angle);
    Dsync.selectItem(id);
    attack(angle);
    Dsync.stopAttack();
    if (!isHolding) whichWeapon();
    if (attacking) attack(angle);
}

let count = 0;
const placement = () => {
    if (currentItem === null) return;
    place(currentItem);
    count++;
    if ((count %= settings.placementSpeed) === 0) {
        setTimeout(placement);
    } else {
        queueMicrotask(placement);
    }
}

const placementHandler = (type: number, code: string | number) => {
    const item = hasItemByType(type);
    if (item === undefined) return;
    if (!hasResources(item)) return;

    if (settings.placementType === PlacementType.DEFAULT) {
        Dsync.selectItem(type);
        return;
    }

    hotkeys.set(code, type);
    currentItem = type;
    currentItemID = item;

    if (hotkeys.size === 1) {
        placement();
    }
}

export const heal = () => {
    Dsync.selectItem(EItems.HEAL);
    attack();
    Dsync.stopAttack();
    whichWeapon();
    if (attacking) {
        attack();
    }
}

const healing = () => {
    if (!isHealing) return;
    heal();
    
    setTimeout(healing, 0);
}

const invisibleHit = () => {
    Dsync.mousemove = true;
    Dsync.aimTarget = null;
    if (
        settings.invisHitToggle && !toggleInvis ||
        !settings.invisHitToggle && !attackingInvis
    ) {
        toggleInvis = false;
        attackingInvis = false;
        return;
    }

    let angle = null;
    const enemy = getNearestPossibleEnemy(+!weapon);
    const shoot = canShoot() && !weapon;

    if (enemy && (settings.meleeAim && !shoot || settings.bowAim && shoot)) {
        angle = angleObject(futurePosition(enemy), futurePosition(Dsync.myPlayer));
        Dsync.mousemove = false;
        Dsync.aimTarget = enemy.target;
    }

    if (enemy && shoot || !shoot) {
        whichWeapon(!weapon);
        attack(angle);
        Dsync.stopAttack();
        whichWeapon(!weapon);
    }

    setTimeout(invisibleHit, 75);
}

const spikeInsta = () => {

    let angle = null;
    if (settings.spikeInstaAim) {
        const enemy = getNearestPossibleEnemy(0);
        if (enemy) {
            angle = enemy.dir;
        }
    }

    const oldWeapon = weapon;
    equipHat(EHats.BERSERKER);
    whichWeapon(false);
    place(EItems.SPIKE, angle);
    attack(angle);
    Dsync.stopAttack();
    whichWeapon(oldWeapon);
}

export let fastBreakHat = 0;
let oldWeapon = false;
export let fastBreaking = false;
let startFastBreak = 0;
const fastBreak = () => {
    if (fastBreaking) return;
    startFastBreak = Date.now();

    const primary = itemBar(0);
    const secondary = itemBar(1);
    const pickWeapon = hasSecondary() && !canShoot() && (secondary === EWeapons.HAMMER || primary === EWeapons.STICK);

    oldWeapon = weapon;
    fastBreaking = true;
    fastBreakHat = Dsync.myPlayer.hat;
    whichWeapon(pickWeapon);
    equipHat(EHats.DEMOLIST);
    attacking = true;
    attack();
}

const fastBreakStop = async () => {
    if (!fastBreaking) return;

    Dsync.stopAttack();
    attacking = false;
    whichWeapon(oldWeapon);

    const step = Date.now() - startFastBreak;
    if (step < TargetReload.HAT) await sleep(TargetReload.HAT - step);
    if (!Dsync.myPlayer.isClown) equipHat(fastBreakHat);
    
    fastBreaking = false;
}

const handleKeydown = (event: KeyboardEvent | MouseEvent, code: string | number) => {
    if (code === 1) event.preventDefault();
    if (event instanceof KeyboardEvent && event.repeat) return;
    if (Dsync.active) return;

    if (code === settings.toggleMenu && !isInput(event.target as Element)) {
        Dsync.toggleMenu();
    }

    if (!inGame()) return;

    if (code === settings.openChat) {
        if (!isInput()) event.preventDefault();
        Dsync.toggleChat();
    }

    if (isInput(event.target as Element)) return;

    if (code === settings.primary) whichWeapon(false);
    if (code === settings.secondary && hasSecondary()) whichWeapon(true);

    if (code === settings.heal) {
        isHealing = true;
        if (settings.placementType === PlacementType.DEFAULT) {
            Dsync.selectItem(EItems.HEAL);
        } else {
            healing();
        }
    }

    if (code === settings.wall) placementHandler(EItems.WALL, code);
    if (code === settings.spike) placementHandler(EItems.SPIKE, code);
    if (code === settings.windmill) placementHandler(EItems.WINDMILL, code);
    if (code === settings.trap) placementHandler(EItems.TRAP, code);
    if (code === settings.turret) placementHandler(EItems.TURRET, code);
    if (code === settings.tree) placementHandler(EItems.TREE, code);
    if (code === settings.platform) placementHandler(EItems.PLATFORM, code);
    if (code === settings.spawn) placementHandler(EItems.SPAWN, code);

    if (code === settings.unequip) equipHat(Dsync.myPlayer.hat, true);
    if (code === settings.bush) equipHat(EHats.BUSH);
    if (code === settings.berserker) equipHat(EHats.BERSERKER);
    if (code === settings.jungle) equipHat(EHats.JUNGLE);
    if (code === settings.crystal) equipHat(EHats.CRYSTAL);
    if (code === settings.spikegear) equipHat(EHats.SPIKEGEAR);
    if (code === settings.immunity) equipHat(EHats.IMMUNITY);
    if (code === settings.boost) equipHat(EHats.BOOST);
    if (code === settings.applehat) equipHat(EHats.APPLEHAT);
    if (code === settings.scuba) equipHat(EHats.SCUBA);
    if (code === settings.hood) equipHat(EHats.HOOD);
    if (code === settings.demolist) equipHat(EHats.DEMOLIST); 

    if (code === settings.invisibleHit && hasSecondary()) {
        if (settings.invisHitToggle) {
            toggleInvis = !toggleInvis;
        } else {
            attackingInvis = true;
        }
        if (toggleInvis || attackingInvis) invisibleHit();
    }
    if (code === settings.spikeInsta) spikeInsta();
    if (code === settings.fastBreak) fastBreak();

    // Handle movement
    const copyMove = move;
    if (code === settings.up) move |= 1;
    if (code === settings.left) move |= 4;
    if (code === settings.down) move |= 2;
    if (code === settings.right) move |= 8;
    if (copyMove !== move) Dsync.move(move);

    // Handle mouse attack, item selection
    if (event instanceof MouseEvent && code === 0) {
        const canAttack = !Dsync.mousedown(event);
        if (canAttack && Dsync.mousemove) {
            attacking = true;
            Dsync.attack(Dsync.getAngle());
        }
    }

    if (code === settings.autoattack) {
        autoattack = !autoattack;
        Dsync.autoattack(autoattack);
    }

    if (code === settings.lockRotation) Dsync.toggleRotation();
    if (code === settings.upgradeScythe) upgradeScythe();
}

const handleKeyup = (event: KeyboardEvent | MouseEvent, code: string | number) => {
    if (code === settings.heal && isHealing) {
        isHealing = false;
    }

    if (code === settings.invisibleHit && attackingInvis) {
        attackingInvis = false;
    }

    if (code === settings.fastBreak) fastBreakStop();

    const copyMove = move;
    if (code === settings.up) move &= -2;
    if (code === settings.left) move &= -5;
    if (code === settings.down) move &= -3;
    if (code === settings.right) move &= -9;
    if (copyMove !== move) Dsync.move(move);

    if (event instanceof MouseEvent && code === 0) {
        Dsync.mouseup(event);
        attacking = false;
    }

    if (currentItem !== null && hotkeys.delete(code)) {
        const entries = [...hotkeys];
        currentItem = entries.length ? entries[entries.length-1][1] : null;

        if (currentItem === null) {
            currentItemID = null;
            whichWeapon();
        }
    }
}

export {
    handleKeydown,
    handleKeyup
}