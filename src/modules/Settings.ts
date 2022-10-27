import { ISettings, PlacementType } from "../types";

interface IStorage {
    get(key: string): any;
    set(key: string, value: any): void;
    delete(key: string): void;
}

// export class storage: Readonly<IStorage> = {
//     get<T>(key: string): T {
//         const item = localStorage.getItem(key);
//         return item !== null ? JSON.parse(item) : null;
//     },
//     set(key: string, value) {
//         localStorage.setItem(key, JSON.stringify(value));
//     },
//     delete(key: string) {
//         localStorage.removeItem(key);
//     }
// };
export class Storage {
    static get<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : null;
    }

    static set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static delete(key: string): boolean {
        const has = localStorage.hasOwnProperty(key) && key in localStorage;
        localStorage.removeItem(key);
        return has;
    }
}

export const defaultSettings: Readonly<ISettings> = {
    // Keybinds
    primary: "Digit1",
    secondary: "Digit2",
    heal: "KeyQ",
    wall: "Digit4",
    spike: "KeyV",
    windmill: "KeyN",
    trap: "KeyF",
    turret: "KeyH",
    tree: "KeyU",
    platform: "KeyT",
    spawn: "KeyJ",

    up: "KeyW",
    left: "KeyA",
    down: "KeyS",
    right: "KeyD",

    autoattack: "KeyE",
    lockRotation: "KeyX",
    openChat: "Enter",

    invisibleHit: 2,
    spikeInsta: "KeyR",
    toggleMenu: "Escape",
    fastBreak: "KeyZ",
    upgradeScythe: "...",

    // hats
    unequip: "...",
    bush: "...",
    berserker: "...",
    jungle: "...",
    crystal: "...",
    spikegear: "...",
    immunity: 4,
    boost: 3,
    applehat: "...",
    scuba: "...",
    hood: "...",
    demolist: "...",

    // Combat
    placementType: PlacementType.INVISIBLE,
    placementSpeed: 1,
    autobed: true,
    automill: true,
    antiFireball: true,
    
    autoheal: true,
    jungleOnClown: true,
    lastHat: true,
    autoScuba: true,
    meleeAim: true,
    bowAim: true,
    spikeInstaAim: true,
    autosync: true,
    autoboostFollow: true,

    // Visuals
    enemyTracers: true,
    teammateTracers: true,
    animalTracers: true,
    
    enemyColor: "#cc5151",
    teammateColor: "#8ecc51",
    animalColor: "#518ccc",
    arrows: true,
    rainbow: false,

    drawHP: true,
    showHoods: true,
    itemCounter: true,
    visualAim: true,
    hideMessages: false,

    customSkins: false,
    skin: Storage.get<number>("skin") || 27,
    accessory: Storage.get<number>("accessory") || 30,
    back: Storage.get<number>("back") || 2,

    itemMarkers: true,
    teammateMarkers: true,
    enemyMarkers: true,
    trapActivated: true,

    itemMarkersColor: "#8ecc51",
    teammateMarkersColor: "#cfbc5f",
    enemyMarkersColor: "#cc5151",
    trapActivatedColor: "#48b2b8",

    hatReloadBar: true,
    hatReloadBarColor: "#5155cc",

    fireballReloadBar: true,
    fireballReloadBarColor: "#cf7148",

    turretReloadBar: true,
    turretReloadBarColor: "#51cc80",

    weaponReloadBar: true,
    weaponReloadBarColor: "#cc8251",
    smoothReloadBar: true,

    windmillRotation: false,
    possibleShots: true,

    // Misc
    autochat: true,
    autochatMessages: [
        "Dsync Client",
        "What is it?",
        "The most advanced hack for sploop!",
        "Download on greasyfork!"
    ],
    kill: true,
    killMessage: "{NAME}, you suck! {KILL}x",
    autospawn: false,
    smoothZoom: true,
    skipUpgrades: true,
    invisHitToggle: false,
    reverseZoom: false,
    autoAccept: false,
    connectTo: "SFRA",
    
    menuTransparency: false,
    blindUsers: [0, 0, 0],
};

const settings = { ...defaultSettings, ...Storage.get<ISettings>("Dsync-settings") };
for (const key in settings) {
    if (!defaultSettings.hasOwnProperty(key)) {
        delete settings[key as keyof typeof settings];
    }
}
Storage.set("Dsync-settings", settings);

export default settings;