import Controller from "./modules/Controller";
import settings from "./modules/Settings";
import { Scale } from "./modules/zoomHandler";
import { IPlayer } from "./utils/Common";

export interface IProps {
    id: string;
    x: string;
    y: string;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    angle: string;
    angle1: string;
    angle2: string;
    ownerID: string;

    health: string;
    entityValue: string;

    hat: string;
    currentItem: string;

    acceptList: string;
    projectileType: string;
    currentCount: string;
    rotateSpeed: string;
    itemBar: string;

    skin: string;
    accessory: string;
    back: string;
}

export type TObjectAny = { [key: string]: any };
export type TCTX = CanvasRenderingContext2D;
interface IHooks {
    drawEntityInfo(target: TObjectAny, ctx: TCTX, isTeammate: boolean): void;
    updatePlayer(target: TObjectAny): void;
    createEntity(target: TObjectAny): void;
    drawItemBar(ctx: TCTX, imageData: TObjectAny, index: number): void;
    renderItems(target: TObjectAny, id: number, ctx: TCTX, step: number): void;
}

export interface ISaves {
    send(bytes: Uint8Array): void;
    myPlayerID(): number;
    readonly clanData: TObjectAny;
    readonly defaultData: TObjectAny;
    entityList(): TObjectAny[][];
    toggleChat(): void;
    toggleRotation(value: boolean): void;
    readonly buffer: Uint8Array;
    byteLength(): number;
    players(): Map<number, TObjectAny>;
}

declare global {
    interface Window {
        log: typeof console.log;
        COPY_CODE: string;
        Dsync: {
            readonly props: IProps;
            readonly hooks: Readonly<IHooks>;
            readonly saves: Readonly<ISaves>;
            readonly controller: Controller;
            readonly scale: typeof Scale,
            readonly settings: ISettings;
            myPlayer: IPlayer;
            readonly version: string;
            step: number;

            toggleMenu?(): void;
            active: HTMLButtonElement | null;
            readonly PRODUCTION: boolean;
            connectURL: string;
        }
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
    antiFireball: boolean;

    autoheal: boolean;

    jungleOnClown: boolean;
    lastHat: boolean;
    autoScuba: boolean;
    
    meleeAim: boolean;
    bowAim: boolean;
    spikeInstaAim: boolean;
    autosync: boolean;
    autoboostFollow: boolean;

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
    visualAim: boolean;
    hideMessages: boolean;

    customSkins: boolean;
    skin: number;
    accessory: number;
    back: number;

    itemMarkers: boolean;
    teammateMarkers: boolean;
    enemyMarkers: boolean;
    trapActivated: boolean;

    itemMarkersColor: string;
    teammateMarkersColor: string;
    enemyMarkersColor: string;
    trapActivatedColor: string;

    hatReloadBar: boolean;
    hatReloadBarColor: string;

    fireballReloadBar: boolean;
    fireballReloadBarColor: string;

    turretReloadBar: boolean;
    turretReloadBarColor: string;

    weaponReloadBar: boolean;
    weaponReloadBarColor: string;
    smoothReloadBar: boolean;

    windmillRotation: boolean;
    possibleShots: boolean;

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

export enum EObjects {
    BOOST = 6,
    PLATFORM = 8,
    TRAP = 9,
    WINDMILL = 14,
    SPAWN = 16,
    POWERMILL = 19,
    ROOF = 48
}

export enum PlacementType {
    DEFAULT,
    INVISIBLE,
    HOLDING
}

export enum EServers {
    SAND_EU1 = "SFRA",
    SAND_EU2 = "SFRA2BIS",
    SAND_USA1 = "SCA",
    SAND_USA2 = "SCA2",
    SAND_AS1 = "SGP",
    SAND_AS2 = "SGP2",
    SAND_AS3 = "SGP3BIS",
    NORM_EU1 = "FRA1FFA",
    NORM_USA1 = "CA1FFA",
    NORM_AS1 = "SGP1FFA",
    BATTLE_USA1 = "BRSCA",
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

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export enum Hit {
    CANNOT,
    CAN,
    NEEDDESTROY
}

export const Reload = {
    hat: {
        current: TargetReload.HAT,
        lerp: TargetReload.HAT,
        max: TargetReload.HAT,
        color: () => settings.hatReloadBarColor,
    },
    weapon: {
        current: 0,
        lerp: 0,
        max: 0,
        color: () => settings.weaponReloadBarColor,
    },
    turret: {
        current: TargetReload.TURRET,
        lerp: TargetReload.TURRET,
        max: TargetReload.TURRET,
        color: () => settings.turretReloadBarColor,
    },
    fireball: {
        current: TargetReload.DRAGON,
        lerp: TargetReload.DRAGON,
        max: TargetReload.DRAGON,
        color: () => settings.fireballReloadBarColor,
    },
}

export type TReload = typeof Reload[keyof typeof Reload];