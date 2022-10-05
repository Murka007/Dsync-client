import { ArrElement } from "../types"

export enum ActionType {
    MELEE,
    RANGED,
    PLACEABLE,
    EATABLE
}

export enum ItemType {
    PRIMARY,
    SECONDARY,
    FOOD,
    WALL,
    SPIKE,
    WINDMILL,
    FARM,
    TRAP,
    PLATFORM,
    SPAWN,
    TURRET,
}

export enum upgradeType {
    STONE = 1,
    GOLD,
    DIAMOND,
    RUBY
}

const ItemData = [{
    id: 0,
    "gs": 46,
    upgradeType: upgradeType.STONE,
    imageinv: 29,
    image: 25,
    name: "Tool Hammer",
    description: "Gather materials",
    range: 80,
    itemType: ItemType.PRIMARY,
    damage: 25,
    reload: 300,
    "_s": 30,
    "Ms": 200,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -3.5,
    "os": 1
}, {
    id: 1,
    "ks": 1,
    "ys": 2,
    imageinv: 28,
    image: 24,
    name: "Stone Sword",
    description: "Sharp and pointy",
    range: 135,
    "Ms": 250,
    itemType: ItemType.PRIMARY,
    damage: 35,
    reload: 300,
    "Us": 0.85,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -8,
    "os": -4
}, {
    id: 2,
    "gs": 39,
    upgradeType: upgradeType.STONE,
    "ks": 1,
    "ys": 4,
    imageinv: 31,
    image: 26,
    name: "Stone Spear",
    description: "Long melee range",
    range: 160,
    itemType: ItemType.PRIMARY,
    damage: 49,
    "Us": 0.81,
    "Ms": 450,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": 2
}, {
    id: 3,
    "gs": 33,
    upgradeType: upgradeType.STONE,
    "ks": 1,
    "ys": 128,
    imageinv: 32,
    image: 35,
    name: "Stone Axe",
    description: "Gathers materials faster",
    range: 90,
    itemType: ItemType.PRIMARY,
    damage: 30,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -2,
    "os": 2,
    "Es": 2,
    "Cs": 2,
    "Bs": 2,
    "zs": 2
}, {
    id: 4,
    cost: {
        food: 0,
        wood: 0,
        stone: 10,
        gold: 0
    },
    "ks": 16,
    "xs": 2,
    "ys": 8,
    imageinv: 30,
    image: 27,
    name: "Stone Musket",
    description: "Deal Long Range Damage",
    range: 1000,
    itemType: ItemType.SECONDARY,
    damage: 49,
    reload: 1500,
    projectile: 17,
    "Ls": 1500,
    actionType: ActionType.RANGED,
    "ps": 1,
    "Us": 0.63,
    "As": 0,
    "os": 0
}, {
    id: 5,
    cost: {
        food: 0,
        wood: 10,
        stone: 0,
        gold: 0
    },
    imageinv: 33,
    image: 103,
    name: "Wood Wall",
    description: "A sturdy wall",
    itemType: ItemType.WALL,
    actionType: ActionType.PLACEABLE,
    "Hs": 5,
    "As": 0,
    "os": 15,
    "Ss": 8,
    "ps": 2
}, {
    id: 6,
    cost: {
        food: 0,
        wood: 5,
        stone: 20,
        gold: 0
    },
    "ks": 1,
    "ys": 512,
    imageinv: 36,
    image: 106,
    name: "Boost",
    description: "Provides a thrust",
    itemType: ItemType.TRAP,
    actionType: ActionType.PLACEABLE,
    "Hs": -5,
    "As": 0,
    "os": 3,
    "Ss": 10,
    "ps": 2
}, {
    id: 7,
    cost: {
        food: 0,
        wood: 20,
        stone: 5,
        gold: 0
    },
    imageinv: 37,
    image: 104,
    name: "Spike",
    description: "Sharp defence",
    itemType: ItemType.SPIKE,
    actionType: ActionType.PLACEABLE,
    "Hs": 2,
    "As": 0,
    "os": 15,
    "Ss": 7,
    "ps": 2
}, {
    id: 8,
    cost: {
        food: 0,
        wood: 20,
        stone: 0,
        gold: 0
    },
    "ks": 1,
    imageinv: 38,
    image: 114,
    name: "Platform",
    description: "Shoot over structures",
    itemType: ItemType.PLATFORM,
    actionType: ActionType.PLACEABLE,
    "Hs": -2,
    "As": 0,
    "os": 8,
    "Ss": 9,
    "ps": 2
}, {
    id: 9,
    cost: {
        food: 0,
        wood: 30,
        stone: 30,
        gold: 0
    },
    "ks": 1,
    "ys": 1024,
    imageinv: 39,
    image: 107,
    name: "Trap",
    description: "Snared enemies are stuck",
    itemType: ItemType.TRAP,
    actionType: ActionType.PLACEABLE,
    "Hs": 2,
    "As": 0,
    "os": 26,
    "Ss": 6,
    "ps": 2
}, {
    id: 10,
    cost: {
        food: 10,
        wood: 0,
        stone: 0,
        gold: 0
    },
    imageinv: 43,
    image: 42,
    name: "Apple",
    description: "Heals you",
    itemType: ItemType.FOOD,
    actionType: ActionType.EATABLE,
    restore: 20,
    "As": 0,
    "os": 22,
    "ps": 2
}, {
    id: 11,
    "ks": 1,
    "ys": 256,
    imageinv: 47,
    image: 46,
    name: "Shield",
    description: "Reduces damage",
    itemType: ItemType.SECONDARY,
    actionType: ActionType.MELEE,
    "Us": 0.7,
    shieldAngle: 0.75,
    range: 55,
    "Ms": 350,
    damage: 15,
    "_s": 40,
    reload: 500,
    "As": -15,
    "os": 10,
    "ps": 3
}, {
    id: 12,
    cost: {
        food: 15,
        wood: 0,
        stone: 0,
        gold: 0
    },
    "ks": 1,
    "ys": 64,
    imageinv: 52,
    image: 51,
    name: "Cookie",
    description: "Heals you",
    itemType: ItemType.FOOD,
    actionType: ActionType.EATABLE,
    restore: 35,
    "As": 0,
    "os": 22,
    "ps": 2
}, {
    id: 13,
    "gs": 41,
    upgradeType: upgradeType.STONE,
    "ks": 1,
    "ys": 32,
    imageinv: 55,
    image: 54,
    name: "Stick",
    description: "Gathers resources quickly",
    range: 100,
    itemType: ItemType.PRIMARY,
    damage: 1,
    reload: 400,
    actionType: ActionType.MELEE,
    "Ms": 60,
    "ps": 0,
    "As": 4,
    "os": 0,
    "Es": 7,
    "Cs": 7,
    "Bs": 7,
    "zs": 4
}, {
    id: 14,
    cost: {
        food: 0,
        wood: 50,
        stone: 10,
        gold: 0
    },
    imageinv: 57,
    image: 61,
    name: "Windmill",
    description: "Generates score over time",
    itemType: ItemType.WINDMILL,
    actionType: ActionType.PLACEABLE,
    rotateSpeed: Math.PI / 4,
    "Hs": -5,
    "As": 0,
    "os": 38,
    "Ss": 13,
    "ps": 2
}, {
    id: 15,
    "ks": 1,
    "ys": 1,
    imageinv: 63,
    image: 62,
    name: "Hammer",
    description: "Breaks structures faster",
    range: 80,
    itemType: ItemType.SECONDARY,
    damage: 12,
    "_s": 76,
    "Us": 0.89,
    "Ms": 200,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 5,
    "os": 2
}, {
    id: 16,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 0,
        wood: 200,
        stone: 200,
        gold: 200
    },
    imageinv: 65,
    image: 115,
    name: "Cosy Bed",
    description: "Respawn at the bed",
    itemType: ItemType.SPAWN,
    actionType: ActionType.PLACEABLE,
    "Hs": 8,
    "As": 0,
    "os": 25,
    "Ss": 15,
    "ps": 2
}, {
    id: 17,
    "gs": 37,
    upgradeType: upgradeType.STONE,
    "ks": 2,
    "ys": 2,
    imageinv: 68,
    image: 67,
    name: "Katana",
    description: "Excellent melee weapon",
    range: 140,
    "Ms": 150,
    itemType: ItemType.PRIMARY,
    damage: 40,
    reload: 300,
    "Us": 0.85,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 1,
    "os": 3
}, {
    id: 18,
    cost: {
        food: 0,
        wood: 30,
        stone: 30,
        gold: 0
    },
    "ks": 160,
    "ys": 1,
    imageinv: 69,
    image: 113,
    name: "Castle Spike",
    description: "Great for bases",
    itemType: ItemType.SPIKE,
    actionType: ActionType.PLACEABLE,
    damage: {
        hit: 24,
        touch: 5
    },
    "Hs": -8,
    "As": 0,
    "os": 14,
    "Ss": 17,
    "ps": 2
}, {
    id: 19,
    cost: {
        food: 0,
        wood: 100,
        stone: 50,
        gold: 0
    },
    "ks": 1,
    "ys": 1,
    imageinv: 57,
    image: 61,
    name: "Powermill",
    description: "Generates more score over time",
    itemType: ItemType.WINDMILL,
    actionType: ActionType.PLACEABLE,
    rotateSpeed: Math.PI / 2,
    "Hs": 5,
    "As": 0,
    "os": 38,
    "Ss": 16,
    "ps": 2
}, {
    id: 20,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 0,
        wood: 30,
        stone: 10,
        gold: 0
    },
    imageinv: 73,
    image: 112,
    name: "Hard Spike",
    description: "Sharper defence",
    itemType: ItemType.SPIKE,
    actionType: ActionType.PLACEABLE,
    "Hs": 2,
    "As": 0,
    "os": 15,
    "Ss": 2,
    "ps": 2
}, {
    id: 21,
    cost: {
        food: 0,
        wood: 200,
        stone: 150,
        gold: 10
    },
    "ks": 1,
    "ys": 1,
    imageinv: 77,
    image: 74,
    name: "Turret",
    description: "Defence for your base",
    itemType: ItemType.TURRET,
    actionType: ActionType.PLACEABLE,
    "Hs": 6,
    "As": 0,
    "os": 25,
    "Ss": 18,
    "ps": 2
}, {
    id: 22,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 0,
        wood: 200,
        stone: 0,
        gold: 0
    },
    imageinv: 78,
    image: 110,
    name: "Cherry wood farm",
    description: "Used for decoration and wood",
    itemType: ItemType.FARM,
    actionType: ActionType.PLACEABLE,
    "Hs": 3,
    "As": 0,
    "os": 47,
    "Ss": 20,
    "ps": 2
}, {
    id: 23,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 0,
        wood: 200,
        stone: 0,
        gold: 0
    },
    imageinv: 80,
    image: 111,
    name: "Wood farm",
    description: "Used for decoration and wood",
    itemType: ItemType.FARM,
    actionType: ActionType.PLACEABLE,
    "Hs": 3,
    "As": 0,
    "os": 47,
    "Ss": 19,
    "ps": 2
}, {
    id: 24,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 200,
        wood: 0,
        stone: 0,
        gold: 0
    },
    imageinv: 85,
    image: 109,
    name: "Berry farm",
    description: "Used for decoration and berries",
    itemType: ItemType.FARM,
    actionType: ActionType.PLACEABLE,
    "Hs": 3,
    "As": 0,
    "os": 17,
    "Ss": 5,
    "ps": 2
}, {
    id: 25,
    "ks": 1,
    "ys": 1,
    cost: {
        food: 0,
        wood: 0,
        stone: 200,
        gold: 0
    },
    imageinv: 83,
    image: 108,
    name: "Stone farm",
    description: "Used for decoration and stone",
    itemType: ItemType.FARM,
    actionType: ActionType.PLACEABLE,
    "Hs": 3,
    "As": 0,
    "os": 20,
    "Ss": 21,
    "ps": 2
}, {
    id: 26,
    cost: {
        food: 0,
        wood: 4,
        stone: 0,
        gold: 0
    },
    "ks": 1,
    "ys": 16,
    imageinv: 86,
    image: 87,
    name: "Bow",
    description: "Deal Long Range Damage",
    range: 800,
    itemType: ItemType.SECONDARY,
    damage: 25,
    reload: 600,
    projectile: 88,
    "Ls": 1200,
    actionType: ActionType.RANGED,
    "ps": 1,
    "Us": 0.75,
    "As": 0,
    "os": 35
}, {
    id: 27,
    cost: {
        food: 0,
        wood: 10,
        stone: 0,
        gold: 0
    },
    "ks": 16,
    "ys": 176,
    imageinv: 90,
    image: 91,
    name: "XBow",
    description: "Rapid fire bow",
    range: 800,
    itemType: ItemType.SECONDARY,
    damage: 27,
    reload: 235,
    projectile: 88,
    "Ls": 1200,
    actionType: ActionType.RANGED,
    "ps": 1,
    "Us": 0.35,
    "As": 0,
    "os": 30
}, {
    id: 28,
    "gs": 45,
    upgradeType: upgradeType.STONE,
    "ks": 4,
    "ys": 4,
    imageinv: 100,
    image: 99,
    name: "Naginata",
    description: "Long melee range",
    range: 165,
    itemType: ItemType.PRIMARY,
    damage: 52,
    "Us": 0.81,
    "Ms": 470,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": -4
}, {
    id: 29,
    cost: {
        food: 0,
        wood: 0,
        stone: 35,
        gold: 10
    },
    "ks": 1,
    "ys": 1,
    imageinv: 101,
    image: 105,
    name: "Castle Wall",
    description: "A very sturdy wall",
    itemType: ItemType.WALL,
    actionType: ActionType.PLACEABLE,
    "Hs": 8,
    "As": 0,
    "os": 13,
    "Ss": 22,
    "ps": 2
}, {
    id: 30,
    "gs": 35,
    upgradeType: upgradeType.STONE,
    "ks": 128,
    "ys": 128,
    imageinv: 117,
    image: 116,
    name: "Great Axe",
    description: "More powerful axe.",
    range: 94,
    itemType: ItemType.PRIMARY,
    damage: 37,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 4,
    "os": 2,
    "Es": 4,
    "Cs": 4,
    "Bs": 4,
    "zs": 2
}, {
    id: 31,
    "ks": 1,
    "ys": 2048,
    imageinv: 128,
    image: 127,
    name: "Bat",
    description: "Hit enemies for a home run",
    range: 115,
    itemType: ItemType.PRIMARY,
    damage: 28,
    "Us": 0.92,
    "Ms": 870,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 10,
    "os": 2
}, {
    id: 32,
    "ks": 1,
    "ys": 128,
    imageinv: 131,
    image: 130,
    name: "Diamond Axe",
    description: "Gathers materials faster",
    range: 90,
    itemType: ItemType.PRIMARY,
    damage: 35.5,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -2,
    "os": 2,
    "Es": 2,
    "Cs": 2,
    "Bs": 2,
    "zs": 2
}, {
    id: 33,
    "gs": 32,
    upgradeType: upgradeType.GOLD,
    "ks": 1,
    "ys": 128,
    imageinv: 133,
    image: 132,
    name: "Gold Axe",
    description: "Gathers materials faster",
    range: 90,
    itemType: ItemType.PRIMARY,
    damage: 33,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -2,
    "os": 2,
    "Es": 2,
    "Cs": 2,
    "Bs": 2,
    "zs": 2
}, {
    id: 34,
    "ks": 128,
    "ys": 128,
    imageinv: 135,
    image: 134,
    name: "Diamond Great Axe",
    description: "More powerful axe.",
    range: 94,
    itemType: ItemType.PRIMARY,
    damage: 47,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 4,
    "os": 2,
    "Es": 4,
    "Cs": 4,
    "Bs": 4,
    "zs": 2
}, {
    id: 35,
    "gs": 34,
    upgradeType: upgradeType.GOLD,
    "ks": 128,
    "ys": 128,
    imageinv: 145,
    image: 144,
    name: "Gold Great Axe",
    description: "More powerful axe.",
    range: 94,
    itemType: ItemType.PRIMARY,
    damage: 40,
    "Ms": 250,
    reload: 400,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 4,
    "os": 2,
    "Es": 4,
    "Cs": 4,
    "Bs": 4,
    "zs": 2
}, {
    id: 36,
    "gs": 40,
    upgradeType: upgradeType.DIAMOND,
    "ks": 2,
    "ys": 2,
    imageinv: 137,
    image: 136,
    name: "Diamond Katana",
    description: "Excellent melee weapon",
    range: 140,
    "Ms": 150,
    itemType: ItemType.PRIMARY,
    damage: 46.5,
    reload: 300,
    "Us": 0.85,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 1,
    "os": 3
}, {
    id: 37,
    "gs": 36,
    upgradeType: upgradeType.GOLD,
    "ks": 2,
    "ys": 2,
    imageinv: 139,
    image: 138,
    name: "Gold Katana",
    description: "Excellent melee weapon",
    range: 140,
    "Ms": 150,
    itemType: ItemType.PRIMARY,
    damage: 43,
    reload: 300,
    "Us": 0.85,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 1,
    "os": 3
}, {
    id: 38,
    "ks": 1,
    "ys": 4,
    imageinv: 141,
    image: 140,
    name: "Diamond Spear",
    description: "Long melee range",
    range: 160,
    itemType: ItemType.PRIMARY,
    damage: 53,
    "Us": 0.81,
    "Ms": 450,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": 2
}, {
    id: 39,
    "gs": 38,
    upgradeType: upgradeType.GOLD,
    "ks": 1,
    "ys": 4,
    imageinv: 143,
    image: 142,
    name: "Gold Spear",
    description: "Long melee range",
    range: 160,
    itemType: ItemType.PRIMARY,
    damage: 51,
    "Us": 0.81,
    "Ms": 450,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": 2
}, {
    id: 40,
    "ks": 2,
    "ys": 2,
    imageinv: 147,
    image: 148,
    name: "Chillrend",
    description: "A powerful force flows through this blade.",
    range: 140,
    "Ms": 150,
    itemType: ItemType.PRIMARY,
    damage: 48.5,
    reload: 300,
    "Us": 0.9,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 1,
    "os": 3
}, {
    id: 41,
    "gs": 42,
    upgradeType: upgradeType.GOLD,
    "ks": 1,
    "ys": 32,
    imageinv: 150,
    image: 149,
    name: "Gold Stick",
    description: "Gathers resources quickly",
    range: 100,
    itemType: ItemType.PRIMARY,
    damage: 1,
    reload: 400,
    actionType: ActionType.MELEE,
    "Ms": 60,
    "ps": 0,
    "As": 4,
    "os": 0,
    "Es": 8,
    "Cs": 8,
    "Bs": 8,
    "zs": 5
}, {
    id: 42,
    "gs": 43,
    upgradeType: upgradeType.DIAMOND,
    "ks": 1,
    "ys": 32,
    imageinv: 167,
    image: 151,
    name: "Diamond Stick",
    description: "Gathers resources quickly",
    range: 100,
    itemType: ItemType.PRIMARY,
    damage: 1,
    reload: 400,
    actionType: ActionType.MELEE,
    "Ms": 60,
    "ps": 0,
    "As": 4,
    "os": 0,
    "Es": 9,
    "Cs": 9,
    "Bs": 9,
    "zs": 6
}, {
    upgradeType: upgradeType.RUBY,
    id: 43,
    "ks": 1,
    "ys": 32,
    imageinv: 168,
    image: 152,
    name: "Ruby Stick",
    description: "Gathers resources quickly",
    range: 100,
    itemType: ItemType.PRIMARY,
    damage: 1,
    reload: 400,
    actionType: ActionType.MELEE,
    "Ms": 60,
    "ps": 0,
    "As": 4,
    "os": 0,
    "Es": 10,
    "Cs": 10,
    "Bs": 10,
    "zs": 7
}, {
    id: 44,
    "ks": 4,
    "ys": 4,
    imageinv: 154,
    image: 153,
    name: "Diamond Naginata",
    description: "Long melee range",
    range: 165,
    itemType: ItemType.PRIMARY,
    damage: 56,
    "Us": 0.81,
    "Ms": 470,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": -4
}, {
    id: 45,
    "gs": 44,
    upgradeType: upgradeType.GOLD,
    "ks": 4,
    "ys": 4,
    imageinv: 156,
    image: 155,
    name: "Gold Naginata",
    description: "Long melee range",
    range: 165,
    itemType: ItemType.PRIMARY,
    damage: 54,
    "Us": 0.81,
    "Ms": 470,
    reload: 700,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 0,
    "os": -4
}, {
    id: 46,
    "gs": 47,
    upgradeType: upgradeType.GOLD,
    imageinv: 158,
    image: 157,
    name: "Gold Tool Hammer",
    description: "Gather materials",
    range: 80,
    itemType: ItemType.PRIMARY,
    damage: 32,
    reload: 300,
    "_s": 30,
    "Ms": 200,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -3.5,
    "os": 1
}, {
    id: 47,
    "gs": 48,
    upgradeType: upgradeType.DIAMOND,
    imageinv: 160,
    image: 159,
    name: "Diamond Tool Hammer",
    description: "Gather materials",
    range: 80,
    itemType: ItemType.PRIMARY,
    damage: 38,
    reload: 300,
    "_s": 30,
    "Ms": 200,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -3.5,
    "os": 1
}, {
    upgradeType: upgradeType.RUBY,
    id: 48,
    imageinv: 162,
    image: 161,
    name: "Ruby Tool Hammer",
    description: "Gather materials",
    range: 80,
    itemType: ItemType.PRIMARY,
    damage: 41,
    reload: 300,
    "_s": 30,
    "Ms": 200,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -3.5,
    "os": 1
}, {
    id: 49,
    cost: {
        food: 0,
        wood: 20,
        stone: 0,
        gold: 0
    },
    "ks": 1,
    imageinv: 170,
    image: 169,
    name: "Roof",
    description: "Take cover from projectiles",
    itemType: ItemType.PLATFORM,
    actionType: ActionType.PLACEABLE,
    "Hs": 0,
    "As": 0,
    "os": 15,
    "Ss": 26,
    "ps": 2
}, {
    id: 50,
    cost: {
        food: 80,
        wood: 80,
        stone: 80,
        gold: 80
    },
    "ks": 1,
    "ys": 256,
    imageinv: 182,
    image: 182,
    name: "Pearl",
    description: "Teleport on impact",
    range: 700,
    itemType: ItemType.SECONDARY,
    damage: 10,
    reload: 10000,
    projectile: 182,
    "Ls": 1000,
    actionType: ActionType.RANGED,
    "ps": 1,
    "Us": 0.4,
    "As": 0,
    "os": 35
}, {
    id: 51,
    cost: {
        food: 0,
        wood: 50,
        stone: 50,
        gold: 0
    },
    "ks": 2208,
    "ys": 1,
    imageinv: 183,
    image: 183,
    name: "Teleporter",
    description: "Teleports to location on map",
    itemType: ItemType.SPAWN,
    actionType: ActionType.PLACEABLE,
    "Hs": 5,
    "As": 0,
    "os": 15,
    "Ss": 37,
    "ps": 2
}, {
    "gs": 53,
    upgradeType: upgradeType.STONE,
    id: 52,
    "ks": 1,
    "ys": 4096,
    imageinv: 189,
    image: 193,
    name: "Stone Dagger",
    description: "A stubbier sword",
    range: 80,
    "Ms": 100,
    itemType: ItemType.PRIMARY,
    damage: 22,
    reload: 150,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 10,
    "os": 20
}, {
    "gs": 54,
    upgradeType: upgradeType.GOLD,
    id: 53,
    "ks": 1,
    "ys": 4096,
    imageinv: 190,
    image: 194,
    name: "Gold Dagger",
    description: "A stubbier sword",
    range: 80,
    "Ms": 100,
    itemType: ItemType.PRIMARY,
    damage: 24,
    reload: 150,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 10,
    "os": 20
}, {
    "gs": 55,
    upgradeType: upgradeType.DIAMOND,
    id: 54,
    "ks": 1,
    "ys": 4096,
    imageinv: 191,
    image: 195,
    name: "Diamond Dagger",
    description: "A stubbier sword",
    range: 80,
    "Ms": 100,
    itemType: ItemType.PRIMARY,
    damage: 26,
    reload: 150,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 10,
    "os": 20
}, {
    upgradeType: upgradeType.RUBY,
    id: 55,
    "ks": 1,
    "ys": 4096,
    imageinv: 192,
    image: 196,
    name: "Ruby Dagger",
    description: "A stubbier sword",
    range: 80,
    "Ms": 100,
    itemType: ItemType.PRIMARY,
    damage: 29,
    reload: 150,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 10,
    "os": 20
}, {
    id: 56,
    "gs": 57,
    upgradeType: upgradeType.GOLD,
    "ks": 1,
    "ys": 1,
    imageinv: 198,
    image: 198,
    name: "Secret Item",
    description: "Dont leak how to get it :)",
    range: 115,
    itemType: ItemType.PRIMARY,
    damage: 28,
    "Us": 0.92,
    "Ms": 1570,
    reload: 2000,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": 40,
    "os": 40
}, {
    id: 57,
    "ks": 2,
    "ys": 2,
    imageinv: 199,
    image: 199,
    name: "Daedric Scythe",
    description: "Whispers fill the air",
    range: 160,
    "Ms": 150,
    itemType: ItemType.PRIMARY,
    damage: 52,
    reload: 450,
    "Us": 0.85,
    actionType: ActionType.MELEE,
    "ps": 0,
    "As": -5,
    "os": 20
}]

export const Items: Readonly<ArrElement<typeof ItemData>>[] = ItemData;

export const ItemList = Items.filter(item => item.actionType === ActionType.PLACEABLE);
export const Shooting = Items.filter(item => item.actionType === ActionType.RANGED);