import { controller, Dsync, log } from "..";
import { Hat, Hats } from "../constants/Hats";
import { ActionType, Items, ItemType } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import { EWeapons, PlacementType, TargetReload, TObjectAny } from "../types";
import { doWhile, Formatter, IEntity, isInput, sleep, TypeEntity } from "../utils/Common";
import { EntityManager } from "../utils/Control";
import PacketManager from "./PacketManager";
import settings from "./Settings";
import { TimeoutManager } from "./TimeoutManager";
import Vector from "./Vector";

export default class Controller {
    move: number;
    private attacking: boolean;
    private autoattack: boolean;
    private rotation: boolean;
    weapon: boolean;
    private healing: boolean;
    private attackingInvis: boolean;
    private toggleInvis: boolean;
    private currentItem: number;
    private chatToggle: boolean;
    private chatCount: number;
    private mousemove: boolean;
    age: number;
    autobed: boolean;
    automill: boolean;
    automillSpawn: boolean;
    kills: number;
    inGame: boolean;
    itemBar: number[];
    readonly maxCount: Readonly<number[]>;
    hsl: number;
    aimTarget: TObjectAny;

    private count: number;
    private readonly hotkeys: Map<string | number, number>;
    readonly PacketManager: PacketManager;
    resources: {
        readonly food: number;
        readonly wood: number;
        readonly stone: number;
        readonly gold: number;
    }

    equipStart: number;
    actualHat: number;
    currentHat: number;
    previousHat: number;
    toggleJungle: boolean;
    toggleScuba: boolean;

    fastbreakHat: number;
    private previousWeapon: boolean;
    readonly fastbreak: TimeoutManager;

    constructor() {
        this.move = 0;
        this.attacking = false;
        this.autoattack = false;
        this.rotation = false;
        this.weapon = false;
        this.healing = false;
        this.attackingInvis = false;
        this.toggleInvis = false;
        this.currentItem = null;
        this.chatToggle = false;
        this.chatCount = 0;
        this.autobed = false;
        this.automill = false;
        this.automillSpawn = false;
        this.mousemove = true;
        this.kills = 0;
        this.inGame = false;
        this.itemBar = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.hsl = 0;
        this.aimTarget = null;

        this.count = 0;

        this.toggleJungle = false;
        this.toggleScuba = false;

        this.resources = {
            food: 200,
            wood: 200,
            stone: 200,
            gold: 200
        }

        this.equipStart = Date.now();
        this.actualHat = 0;
        this.currentHat = 0;
        this.previousHat = 0;

        this.maxCount = [0, 0, 0, 100, 30, 8, 2, 12, 32, 1, 2];
        this.age = 0;
        this.hotkeys = new Map();
        this.PacketManager = new PacketManager();
        this.fastbreak = new TimeoutManager([
            () => {
                const primary = this.itemBar[ItemType.PRIMARY];
                const secondary = this.itemBar[ItemType.SECONDARY];
                const pickWeapon = secondary === EWeapons.HAMMER || primary === EWeapons.STICK && secondary === EWeapons.SHIELD;

                this.previousWeapon = this.weapon;
                this.whichWeapon(pickWeapon);
                this.equipHat(Hat.DEMOLIST, false);
                this.attacking = true;
                this.attack();
            },
            () => {
                this.PacketManager.stopAttack();
                this.attacking = false;
                this.whichWeapon(this.previousWeapon);
            },
            () => {
                if (!Dsync.myPlayer.isClown) {
                    this.equipHat(this.previousHat, true);
                }
            }
        ], (start) => Dsync.myPlayer.target.hatReload === TargetReload.HAT && (Date.now() - start) > TargetReload.HAT)
    }

    reset(items: number[]) {
        this.move = 0;
        this.attacking = false;
        this.autoattack = false;
        this.rotation = false;
        this.weapon = false;
        this.healing = false;
        this.attackingInvis = false;
        this.toggleInvis = false;
        this.currentItem = null;
        this.chatToggle = false;
        this.chatCount = 0;
        this.autobed = false;
        this.automill = false;
        this.automillSpawn = false;
        this.mousemove = true;
        this.kills = 0;
        this.inGame = false;
        this.itemBar = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.hsl = 0;
        this.aimTarget = null;

        this.count = 0;

        // this.toggleJungle = false;
        // this.toggleScuba = false;

        const target = Dsync.myPlayer.target;
        if (target) {
            target.hatReload = TargetReload.HAT;
        }
        
        for (const id of items) {
            this.upgradeItem(id);
        }

        for (const [key] of this.hotkeys) {
            this.hotkeys.delete(key);
        }
    }

    private hasItem(type: number) {
        return this.itemBar[type] !== -1;
    }

    private hasSecondary() {
        return this.itemBar[ItemType.SECONDARY] !== -1;
    }

    updateWeapon(type: number) {
        const weapon = Dsync.saves.defaultData[Dsync.props.itemBar][type];
        if (this.isWeapon(weapon) && this.itemBar[type] !== weapon) {
            this.itemBar[type] = weapon;
        }
    }

    canShoot() {
        const id = this.itemBar[ItemType.SECONDARY];
        return this.hasSecondary() && Items[id].actionType === ActionType.RANGED;
    }

    isWeapon(id: number) {
        const type = Items[id].itemType;
        return type === ItemType.PRIMARY || type === ItemType.SECONDARY;
    }

    isSecondary(id: number) {
        return Items[id].itemType === ItemType.SECONDARY;
    }

    currentCount(type: number): number {
        return Dsync.saves.defaultData[Dsync.props.currentCount][type];
    }

    hasCount(type: number) {
        return this.currentCount(type) < this.maxCount[type];
    }

    isDoingNothing() {
        return (
            !this.healing &&
            !this.attackingInvis &&
            !this.toggleInvis &&
            !this.attacking &&
            this.currentItem === null
        )
    }

    hasResources(id: number) {
        const cost = Items[id].cost || { food: 0, wood: 0, stone: 0, gold: 0};
        const { food, wood, stone, gold } = this.resources;
        const hasFood = food >= cost.food;
        const hasWood = wood >= cost.wood;
        const hasStone = stone >= cost.stone;
        const hasGold = gold >= cost.gold;
        return hasFood && hasWood && hasStone && hasGold;
    }

    getAngleFromBitmask(bitmask: number, rotate: boolean) {
        const vec = { x: 0, y: 0 };
        if (bitmask & 0b0001) vec.y--;
        if (bitmask & 0b0010) vec.y++;
        if (bitmask & 0b0100) vec.x--;
        if (bitmask & 0b1000) vec.x++;
        if (rotate) {
            vec.x *= -1;
            vec.y *= -1;
        }
        return Math.atan2(vec.y, vec.x);
    }

    upgradeItem(id: number) {
        const item = Items[id];
        this.itemBar[item.itemType] = id;
    }

    upgradeScythe() {
        const target = Dsync.saves.entityList()[ELayer.GOLDENCOW][0];
        if (target !== undefined) {
            this.PacketManager.upgradeScythe(target[Dsync.props.id]);
        }
    }

    buyHat(id: number) {
        if (!Hats[id].bought && controller.resources.gold >= Hats[id].price) {
            Hats[id].bought = true;
            this.PacketManager.equip(id);
        }

        return Hats[id].bought;
    }

    hatReloaded() {
        return Dsync.myPlayer.target.hatReload === TargetReload.HAT;
    }

    equipHat(id: number, actual = true, force = false) {
        const hatID = id === Hat.UNEQUIP ? this.actualHat : id;
        if (!this.buyHat(hatID) || !this.inGame) return false;

        const now = Date.now();
        if (
            !Hats[id].equipped &&
            this.hatReloaded() &&
            now - this.equipStart >= TargetReload.HAT || force
        ) {
            this.equipStart = now;

            this.PacketManager.equip(hatID);
            for (const hat of Hats) {
                hat.equipped = false;
            }

            Hats[id].equipped = true;
            
            this.previousHat = this.currentHat;
            this.currentHat = id;
            if (actual) {
                this.actualHat = id;
            }
            return true;
        }
        return false;
    }

    async autochat() {
        if (this.chatToggle) return;
        this.chatToggle = true;

        const messages = settings.autochatMessages.filter(msg => msg.length);
        if (!messages.length) return;

        this.PacketManager.chat(messages[this.chatCount++]);
        this.chatCount %= messages.length;

        await sleep(2000);
        this.chatToggle = false;
    }

    accept(which: boolean) {
        this.PacketManager.accept(which);
        const acceptList: number[] = Dsync.saves.clanData[Dsync.props.acceptList];
        acceptList.shift();
    }

    async spawn() {
        await sleep(100);
        const play = document.querySelector("#play") as HTMLDivElement;
        play.click();
    }

    whichWeapon(type?: boolean) {
        if (type !== undefined) {
            this.weapon = type;
        }

        this.PacketManager.selectByID(this.itemBar[+this.weapon]);
    }

    attack(angle?: number) {
        const dir = angle ? angle : Dsync.saves.getAngle();
        this.PacketManager.attack(dir);
    }

    place(type: number, angle?: number, placementType?: number) {
        const placeType = placementType === undefined ? settings.placementType : placementType;
        const isHolding = placeType === PlacementType.HOLDING;
        this.whichWeapon();
        if (isHolding && this.attacking) this.attack(angle);

        this.PacketManager.selectItemByType(type);
        this.attack(angle);
        this.PacketManager.stopAttack();

        if (!isHolding) this.whichWeapon();
        if (this.attacking) this.attack(angle);
    }

    placement() {
        if (this.currentItem === null) return;
        this.place(this.currentItem);
        this.count = (this.count + 1) % settings.placementSpeed;
        const method = this.count === 0 ? setTimeout : queueMicrotask;
        method(this.placement.bind(this));
    }

    placementHandler(type: number, code: string | number) {
        if (!this.hasItem(type)) return;

        if (settings.placementType === PlacementType.DEFAULT) {
            this.PacketManager.selectItemByType(type);
            return;
        }

        this.hotkeys.set(code, type);
        this.currentItem = type;

        if (this.hotkeys.size === 1) {
            this.placement();
        }
    }

    heal() {
        this.PacketManager.selectItemByType(ItemType.FOOD);
        this.attack();
        this.PacketManager.stopAttack();
        this.whichWeapon();
        if (this.attacking) {
            this.attack();
        }
    }

    invisibleHit() {
        this.mousemove = true;
        this.aimTarget = null;
        if (
            settings.invisHitToggle && !this.toggleInvis ||
            !settings.invisHitToggle && !this.attackingInvis
        ) {
            this.toggleInvis = false;
            this.attackingInvis = false;
            return;
        }

        let angle: number = null;
        const nearest = EntityManager.nearestPossible(!this.weapon);
        const shoot = this.canShoot() && !this.weapon;

        if (nearest && (settings.meleeAim && !shoot || settings.bowAim && shoot)) {
            const pos1 = EntityManager.predict(Dsync.myPlayer);
            const pos2 = EntityManager.predict(nearest);
            angle = new Vector(pos1.x, pos1.y).angle(new Vector(pos2.x, pos2.y));
            this.mousemove = false;
            this.aimTarget = nearest.target;
        }

        if (nearest && shoot || !shoot) {
            this.whichWeapon(!this.weapon);
            this.attack(angle);
            this.PacketManager.stopAttack();
            this.whichWeapon(!this.weapon);
        }

        setTimeout(this.invisibleHit.bind(this), 85);
    }

    spikeInsta() {
        let angle: number = null;
        if (settings.spikeInstaAim) {
            const nearest = EntityManager.nearestPossible(false);
            if (nearest) {
                const pos1 = new Vector(Dsync.myPlayer.x2, Dsync.myPlayer.y2);
                const pos2 = new Vector(nearest.x2, nearest.y2);
                angle = pos1.angle(pos2);
            }
        }

        const previousWeapon = this.weapon;
        this.equipHat(Hat.BERSERKER);
        this.whichWeapon(false);
        this.place(ItemType.SPIKE, angle);
        this.attack(angle);
        this.PacketManager.stopAttack();
        this.whichWeapon(previousWeapon);
    }

    handleKeydown(event: KeyboardEvent | MouseEvent, code: string | number) {
        if (code === 1) event.preventDefault();
        if (event instanceof KeyboardEvent && event.repeat) return;
        if (Dsync.active) return;

        if (code === settings.toggleMenu && !isInput(event.target as Element)) {
            Dsync.toggleMenu();
        }

        if (!this.inGame) return;

        if (code === settings.openChat) {
            if (!isInput()) event.preventDefault();
            Dsync.saves.toggleChat();
        }

        if (isInput(event.target as Element)) return;

        if (code === settings.primary) this.whichWeapon(false);
        if (code === settings.secondary && this.hasSecondary()) this.whichWeapon(true);

        if (code === settings.heal && !this.healing) {
            this.healing = true;
            if (settings.placementType === PlacementType.DEFAULT) {
                this.PacketManager.selectItemByType(ItemType.FOOD);
            } else {
                doWhile(() => this.healing, this.heal.bind(this), 0);
            }
        }

        if (code === settings.wall) this.placementHandler(ItemType.WALL, code);
        if (code === settings.spike) this.placementHandler(ItemType.SPIKE, code);
        if (code === settings.windmill) this.placementHandler(ItemType.WINDMILL, code);
        if (code === settings.trap) this.placementHandler(ItemType.TRAP, code);
        if (code === settings.turret) this.placementHandler(ItemType.TURRET, code);
        if (code === settings.tree) this.placementHandler(ItemType.FARM, code);
        if (code === settings.platform) this.placementHandler(ItemType.PLATFORM, code);
        if (code === settings.spawn) this.placementHandler(ItemType.SPAWN, code);

        if (code === settings.unequip) this.equipHat(Hat.UNEQUIP);
        if (code === settings.bush) this.equipHat(Hat.BUSH);
        if (code === settings.berserker) this.equipHat(Hat.BERSERKER);
        if (code === settings.jungle) this.equipHat(Hat.JUNGLE);
        if (code === settings.crystal) this.equipHat(Hat.CRYSTAL);
        if (code === settings.spikegear) this.equipHat(Hat.SPIKEGEAR);
        if (code === settings.immunity) this.equipHat(Hat.IMMUNITY);
        if (code === settings.boost) this.equipHat(Hat.BOOST);
        if (code === settings.applehat) this.equipHat(Hat.APPLEHAT);
        if (code === settings.scuba) this.equipHat(Hat.SCUBA);
        if (code === settings.hood) this.equipHat(Hat.HOOD);
        if (code === settings.demolist) this.equipHat(Hat.DEMOLIST); 

        if (code === settings.invisibleHit && this.hasSecondary()) {
            if (settings.invisHitToggle) {
                this.toggleInvis = !this.toggleInvis;
            } else {
                this.attackingInvis = true;
            }
            if (this.toggleInvis || this.attackingInvis) this.invisibleHit();
        }
        if (code === settings.spikeInsta) this.spikeInsta();
        if (code === settings.fastBreak && !this.fastbreak.isActive() && this.hatReloaded()) this.fastbreak.start();

        // Handle movement
        const copyMove = this.move;
        if (code === settings.up) this.move |= 1;
        if (code === settings.left) this.move |= 4;
        if (code === settings.down) this.move |= 2;
        if (code === settings.right) this.move |= 8;
        if (copyMove !== this.move) this.PacketManager.moveByBitmask(this.move);

        if (event instanceof MouseEvent && code === 0) {
            this.attacking = true;
        }

        if (code === settings.autoattack) {
            this.autoattack = !this.autoattack;
            this.PacketManager.autoattack(this.autoattack);
        }

        if (code === settings.lockRotation) {
            this.rotation = !this.rotation;
            Dsync.saves.toggleRotation(this.rotation);
        }
        if (code === settings.upgradeScythe) this.upgradeScythe();
    }

    handleKeyup(event: KeyboardEvent | MouseEvent, code: string | number) {
        if (code === settings.heal && this.healing) {
            this.healing = false;
        }

        if (code === settings.invisibleHit && this.attackingInvis) {
            this.attackingInvis = false;
        }

        if (code === settings.fastBreak) this.fastbreak.stop();

        const copyMove = this.move;
        if (code === settings.up) this.move &= -2;
        if (code === settings.left) this.move &= -5;
        if (code === settings.down) this.move &= -3;
        if (code === settings.right) this.move &= -9;
        if (copyMove !== this.move) this.PacketManager.moveByBitmask(this.move);

        if (event instanceof MouseEvent && code === 0) {
            this.attacking = false;
        }

        if (this.currentItem !== null && this.hotkeys.delete(code)) {
            const entries = [...this.hotkeys];
            this.currentItem = entries.length ? entries[entries.length-1][1] : null;

            if (this.currentItem === null) {
                this.whichWeapon();
            }
        }
    }
}