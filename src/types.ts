import { IPos } from "./utils/Common";

export interface ILinker {
    0: number;
    toString: (radix?: number) => string;
    valueOf: () => number;
}

export type TScale = {
    w: ILinker;
    h: ILinker;
    w2: number;
    h2: number;
}

interface IProps {
    id?: string;
    radius?: string;
    x?: string;
    y?: string;
    x1?: string;
    y1?: string;
    x2?: string;
    y2?: string;
    health?: string;
    maxHealth?: string;
    hat?: string;
    playerValue?: string;
    itemType?: string;
    currentCount?: string;
    upgradeBar?: string;
    clan?: string;
    itemOwner?: string;
    itemDamage?: string;
    itemDataType?: string;
    itemBar?: string;
    angle?: string;
    angle1?: string;
    angle2?: string;
    renderLayer?: string;
    currentItem?: string;
    rotSpeed?: string;
    weaponType?: string;
    acceptList?: string;
    bulletType?: string;
    projectileType?: string;
    resourceAmount?: string;
}

export type TObjectAny = { [key: string]: any };
export type TArrayNumberAny = [number, ...any];
export type TCTX = CanvasRenderingContext2D;
interface IHooks {
    drawEntityInfo?(target: TObjectAny, ctx: TCTX, isTeammate: boolean): void;
    stringMessage?(data: TArrayNumberAny): void;
    drawItemBar?(ctx: TCTX, imageData: TObjectAny, index: number): void;
    drawItems?(target: TObjectAny, id: number, ctx: TCTX, step: number): void;
    UpdateClanList?(userList: number[]): void;
    DeleteClan?(): void;
    updatePlayer?(target: TObjectAny): void;
    renderLayers?(ctx: TCTX, now: number): void;
    moveUpdate?(): void;
    createEntity?(target: TObjectAny): void;
    renderLoop?(): void;
    resources?(food: number, stone: number, wood: number, gold: number): void;
    attackAnimation?(type: number, id: number, weapon: number, isObject: number, entity: TObjectAny): void;
}

declare global {
    interface Window {
        log: typeof console.log;
        COPY_CODE: string;
        Dsync: {
            props: IProps;
            hooks: IHooks;

            scale: TScale,
            settings: ISettings;
            myPlayer: IPlayer;
            target: TObjectAny;
            hsl: number;
            version: string;
            actualHat: number;

            selectItem?(id: number): void;
            selectByID?(id: number): void;
            equipHat?(id: number): void;
            chat?(message: string): void;
            attack?(angle: number): void;
            getAngle?(): number;
            stopAttack?(): void;
            autoattack?(type: boolean): void;
            move?(bitmask: number): void;
            createClan?(name: string): void;
            leaveClan?(): void;
            kickUser?(id: number): void;
            joinClan?(id: number): void;
            changeAngle?(angle: number): void;
            MoveByAngle?(angle: number): void;
            upgradeItem?(id: number): void;
            upgradeScythe?(goldenCowID: number): void;
            accept?(accept: boolean): void;

            clanData: TObjectAny;
            goldenCowID?(): number;
            mousedown?(event: MouseEvent): boolean;
            mouseup?(event: MouseEvent): void;
            toggleRotation?(): void;
            toggleChat?(): void;
            toggleMenu?(): void;
            itemBar?(): number[];
            myPlayerID?(): number;
            ping?: number;
            players?(): Map<number, TObjectAny>;

            entityData?: TObjectAny[];
            itemData?: TObjectAny[];
            maxCount?: number[];
            defaultData?: TObjectAny;
            active?: HTMLButtonElement;
            entityList?(): TObjectAny[][];
            itemList?: number[];
            mousemove: boolean;
            aimTarget: TObjectAny;
            step: number;
            PRODUCTION: boolean;
            resources: {
                food: number;
                wood: number;
                stone: number;
                gold: number
            }
            autobedToggle: boolean;
            automillToggle: boolean;
            playerAGE: number;
            connectURL: string;
        }
    }

    interface HTMLImageElement {
        loaded: boolean;
    }
}

export type StringNumber = string | number;
export interface ISettings {

    // Keybinds
    primary: StringNumber;
    secondary: StringNumber;
    heal: StringNumber;
    wall: StringNumber;
    spike: StringNumber;
    windmill: StringNumber;
    trap: StringNumber;
    turret: StringNumber;
    tree: StringNumber;
    platform: StringNumber;
    spawn: StringNumber;

    up: StringNumber;
    left: StringNumber;
    down: StringNumber;
    right: StringNumber;

    autoattack: StringNumber;
    lockRotation: StringNumber;
    openChat: StringNumber;

    invisibleHit: StringNumber;
    spikeInsta: StringNumber;
    toggleMenu: StringNumber;
    fastBreak: StringNumber;
    upgradeScythe: StringNumber;

    // hats
    unequip: StringNumber;
    bush: StringNumber;
    berserker: StringNumber;
    jungle: StringNumber;
    crystal: StringNumber;
    spikegear: StringNumber;
    immunity: StringNumber;
    boost: StringNumber;
    applehat: StringNumber;
    scuba: StringNumber;
    hood: StringNumber;
    demolist: StringNumber;

    // Combat
    placementSpeed: number;
    placementType: number;
    autobed: boolean;
    automill: boolean;

    autoheal: boolean;

    jungleOnClown: boolean;
    lastHat: boolean;
    autoScuba: boolean;
    
    meleeAim: boolean;
    bowAim: boolean;
    spikeInstaAim: boolean;

    // Visuals
    enemyTracers: boolean;
    teammateTracers: boolean;
    animalTracers: boolean;

    enemyColor: string;
    teammateColor: string;
    animalColor: string;
    arrows: boolean;
    rainbow: boolean;

    showHoods: boolean;
    drawHP: boolean;
    itemCounter: boolean;
    drawID: boolean;
    visualAim: boolean;
    hideNicknames: boolean;

    itemMarkers: boolean;
    teammateMarkers: boolean;
    enemyMarkers: boolean;
    trapActivated: boolean;

    itemMarkersColor: string;
    teammateMarkersColor: string;
    enemyMarkersColor: string;
    trapActivatedColor: string;
    markersBottom: boolean;

    hatReloadBar: boolean;
    hatReloadBarColor: string;

    fireballReloadBar: boolean;
    fireballReloadBarColor: string;

    turretReloadBar: boolean;
    turretReloadBarColor: string;

    weaponReloadBar: boolean;
    weaponReloadBarColor: string;

    windmillRotation: boolean;
    possibleShots: boolean;
    hideMessages: boolean;

    // Misc
    autochat: boolean;
    autochatMessages: string[];
    kill: boolean;
    killMessage: string;
    autospawn: boolean;
    smoothZoom: boolean;
    skipUpgrades: boolean;
    invisHitToggle: boolean;
    reverseZoom: boolean;
    autoAccept: boolean;
    connectTo: string;

    menuTransparency: boolean;

    blindUsers: [number, number, number];

    [key: string]: any;
}

export interface IData {
    id: number;
    type: number;
    x: number;
    y: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    angle: number;
    angle1: number;
    angle2: number;
    ownerID: number;
    target: TObjectAny;
    dir: number;
    distance: number;
}

export interface IProjectile extends IData {
    range: number;
    projectileType: number;
}

export interface IObject extends IData {
    radius: number;
}

export interface IEntity extends IObject {
    healthValue: number;
    health: number;
    maxHealth: number;
    playerValue: number;
}

export interface IPlayer extends IEntity {
    hat: number;
    oldHat?: number;
    isClown: boolean;
    currentItem: number;
}

export enum WebsocketString {
    LEADERBOARD = 3,
    CONNECT = 12,
    UPGRADE = 14,
    DIED = 19,
    KILLUPDATE = 22,
    KILLED = 28,
    PLAYERSPAWNED = 32,
    DEFAULTDATA = 33,
    SPAWN = 35
}

export enum EItems {
    PRIMARY,
    SECONDARY,
    HEAL,
    WALL,
    SPIKE,
    WINDMILL,
    TREE,
    TRAP,
    PLATFORM,
    SPAWN,
    TURRET,
}

export enum ELayer {
    PLAYER = 0,
    STONE = 1,
    HARDSPIKE = 2,
    TREE = 3,
    GOLD = 4,
    BUSH = 5,
    TRAP = 6,
    SPIKE = 7,
    WOODWALL = 8,
    PLATFORM = 9,
    BOOST = 10,
    LOOTBOX = 11,
    PROJECTILE = 12,
    WINDMILL = 13,
    COW = 14,
    SPAWN = 15,
    POWERMILL = 16,
    CASTLESPIKE = 17,
    TURRET = 18,
    WOODFARM = 19,
    CHERRYWOODFARM = 20,
    STONEWARM = 21,
    CASTLEWALL = 22,
    SHARK = 23,
    WOLF = 24,
    GOLDENCOW = 25,
    ROOF = 26,
    DRAGON = 27,
    MAMMOTH = 28,
    FIREBALL = 29,
    CHEST = 30,
    DRAGONWALLBIG = 31,
    DRAGONWALLMEDIUM = 32,
    DRAGONWALLSMALL = 33,
    MAMMOTHWALL = 34,
    MAMMOTHWALLSMALL = 35,
    DUCK = 36,
    TELEPORT = 37,
    CACTUS = 38,
    TORNADO = 39
}

// Array of items that you can't shoot throught
export const LayerObjects: number[] = [
    ELayer.STONE,
    ELayer.HARDSPIKE,
    ELayer.TREE,
    ELayer.GOLD,
    ELayer.BUSH,
    ELayer.SPIKE,
    ELayer.WOODWALL,
    ELayer.WINDMILL,
    ELayer.SPAWN,
    ELayer.POWERMILL,
    ELayer.CASTLESPIKE,
    ELayer.TURRET,
    ELayer.WOODFARM,
    ELayer.CHERRYWOODFARM,
    ELayer.STONEWARM,
    ELayer.CASTLEWALL,
    ELayer.CHEST,
    ELayer.DRAGONWALLBIG,
    ELayer.DRAGONWALLMEDIUM,
    ELayer.DRAGONWALLSMALL,
    ELayer.MAMMOTHWALL,
    ELayer.MAMMOTHWALLSMALL,
    ELayer.TELEPORT,
    ELayer.CACTUS
]

// Array of items you can't place on
export const CannotPlaceOn: number[] = [
    ELayer.STONE,
    ELayer.HARDSPIKE,
    ELayer.TREE,
    ELayer.GOLD,
    ELayer.BUSH,
    ELayer.TRAP,
    ELayer.SPIKE,
    ELayer.WOODWALL,
    ELayer.PLATFORM,
    ELayer.BOOST,
    ELayer.LOOTBOX,
    ELayer.WINDMILL,
    ELayer.SPAWN,
    ELayer.POWERMILL,
    ELayer.CASTLESPIKE,
    ELayer.TURRET,
    ELayer.WOODFARM,
    ELayer.CHERRYWOODFARM,
    ELayer.STONEWARM,
    ELayer.CASTLEWALL,
    ELayer.CHEST,
    ELayer.DRAGONWALLBIG,
    ELayer.DRAGONWALLMEDIUM,
    ELayer.DRAGONWALLSMALL,
    ELayer.MAMMOTHWALL,
    ELayer.MAMMOTHWALLSMALL,
    ELayer.TELEPORT,
    ELayer.CACTUS,
]

export const LayerExclude: number[] = [
    ELayer.TREE,
    // ELayer.WINDMILL,
    // ELayer.POWERMILL,
    ELayer.WOODFARM,
    ELayer.CHERRYWOODFARM
]

export enum EObjects {
    BOOST = 6,
    PLATFORM = 8,
    TRAP = 9,
    WINDMILL = 14,
    SPAWN = 16,
    POWERMILL = 19,
    ROOF = 48
}

export enum EHats {
    BUSH = 1,
    BERSERKER,
    JUNGLE,
    CRYSTAL,
    SPIKEGEAR,
    IMMUNITY,
    BOOST,
    APPLEHAT,
    SCUBA,
    HOOD,
    DEMOLIST,
}

export enum EWeapons {
    MUSKET = 4,
    SHIELD = 11,
    STICK = 13,
    HAMMER = 15,
    BOW = 26,
    XBOW = 27,
    PEARL = 50,
    SCYTHE = 57
}

export enum EItemTypes {
    ATTACKING = 0,
    SHOOTING = 1,
    PLACEABLE = 2,
    FOOD = 3
}

export enum EAnimals {
    COW = 14,
    SHARK = 23,
    WOLF = 24,
    GOLDENCOW = 25,
    DRAGON = 27,
    MAMMOTH = 28,
    DUCK = 36,
}

export enum PlacementType {
    DEFAULT,
    INVISIBLE,
    HOLDING
}

export enum EServers {
    SAND_EU_1 = "SFRA",
    SAND_EU_2 = "SFRA2BIS",
    SAND_USA_1 = "SCA",
    SAND_USA_2 = "SCA2",
    SAND_AS_1 = "SGP",
    SAND_AS_2 = "SGP2",
    SAND_AS_3 = "SGP3BIS",
    NORMAL_EU_1 = "FRA1FFA",
    NORMAL_USA_1 = "CA1FFA",
    NORMAL_AS_1 = "SGP1FFA",
    ROYALE_USA_1 = "BRSCA",
}

export const selectData = {
    placementType: PlacementType,
    connectTo: EServers
}

export enum TargetReload {
    TURRET = 3000,
    HAT = 1300,
    DRAGON = 3000,
}