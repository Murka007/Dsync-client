import { ISettings, PlacementType } from "../types";

interface IStorage {
    get(key: string): any;
    set(key: string, value: any): void;
    delete(key: string): void;
}

export const storage: Readonly<IStorage> = {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    delete(key) {
        localStorage.removeItem(key);
    }
};

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
    
    autoheal: true,
    jungleOnClown: true,
    lastHat: true,
    autoScuba: true,
    meleeAim: true,
    bowAim: true,
    spikeInstaAim: true,
    autosync: true,

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
    drawID: false,
    visualAim: true,
    hideNicknames: false,

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
    hideMessages: false,

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
    autozoom: false,
    skipUpgrades: true,
    invisHitToggle: false,
    reverseZoom: false,
    autoAccept: false,
    connectTo: "SFRA",
    
    menuTransparency: false,
    blindUsers: [0, 0, 0],
};

const settings: ISettings = { ...defaultSettings, ...storage.get("Dsync-settings") as ISettings };

for (const key in settings) {
    if (!defaultSettings.hasOwnProperty(key)) {
        delete settings[key as keyof typeof settings];
    }
}

storage.set("Dsync-settings", settings);

export default settings;