// ==UserScript==
// @name Dsync Client [Sploop.io]
// @author Murka
// @description The most advanced hack for sploop.io
// @version 1.0.9
// @match *://sploop.io/*
// @run-at document-start
// @grant none
// @license MIT
// @namespace https://greasyfork.org/users/919633
// ==/UserScript==
/* jshint esversion:6 */

/*
    Author: Murka
    Github: https://github.com/Murka007/Dsync-client
    Discord: https://discord.gg/sG9cyfGPj5
    Greasyfork: https://greasyfork.org/en/users/919633

    PLEASE, I NEED YOUR SUPPORT ON GITHUB (GIVE ME A STAR ON MY REPOSITORY),
    ALSO SUPPORT THIS SCRIPT ON GREASYFORK,
    FOR MORE UPDATES JOIN MY DISCORD SERVER!!!
*/

(function() {
    "use strict";
    var __webpack_modules__ = {
        147: function(module) {
            module.exports = {
                i8: "1.0.9"
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    !function() {
        __webpack_require__.d = function(exports, definition) {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    }();
    !function() {
        __webpack_require__.o = function(obj, prop) {
            return Object.prototype.hasOwnProperty.call(obj, prop);
        };
    }();
    var __webpack_exports__ = {};
    !function() {
        __webpack_require__.d(__webpack_exports__, {
            s: function() {
                return Dsync;
            },
            c: function() {
                return log;
            }
        });
        var WebsocketString;
        (function(WebsocketString) {
            WebsocketString[WebsocketString["CONNECT"] = 12] = "CONNECT";
            WebsocketString[WebsocketString["DEFAULTDATA"] = 33] = "DEFAULTDATA";
            WebsocketString[WebsocketString["DIED"] = 19] = "DIED";
            WebsocketString[WebsocketString["KILLUPDATE"] = 22] = "KILLUPDATE";
            WebsocketString[WebsocketString["KILLED"] = 28] = "KILLED";
            WebsocketString[WebsocketString["SPAWN"] = 35] = "SPAWN";
        })(WebsocketString || (WebsocketString = {}));
        var EItems;
        (function(EItems) {
            EItems[EItems["PRIMARY"] = 0] = "PRIMARY";
            EItems[EItems["SECONDARY"] = 1] = "SECONDARY";
            EItems[EItems["HEAL"] = 2] = "HEAL";
            EItems[EItems["WALL"] = 3] = "WALL";
            EItems[EItems["SPIKE"] = 4] = "SPIKE";
            EItems[EItems["WINDMILL"] = 5] = "WINDMILL";
            EItems[EItems["TREE"] = 6] = "TREE";
            EItems[EItems["TRAP"] = 7] = "TRAP";
            EItems[EItems["PLATFORM"] = 8] = "PLATFORM";
            EItems[EItems["SPAWN"] = 9] = "SPAWN";
            EItems[EItems["TURRET"] = 10] = "TURRET";
        })(EItems || (EItems = {}));
        var ELayer;
        (function(ELayer) {
            ELayer[ELayer["PLAYER"] = 0] = "PLAYER";
            ELayer[ELayer["STONE"] = 1] = "STONE";
            ELayer[ELayer["HARDSPIKE"] = 2] = "HARDSPIKE";
            ELayer[ELayer["TREE"] = 3] = "TREE";
            ELayer[ELayer["GOLD"] = 4] = "GOLD";
            ELayer[ELayer["BUSH"] = 5] = "BUSH";
            ELayer[ELayer["TRAP"] = 6] = "TRAP";
            ELayer[ELayer["SPIKE"] = 7] = "SPIKE";
            ELayer[ELayer["WOODWALL"] = 8] = "WOODWALL";
            ELayer[ELayer["PLATFORM"] = 9] = "PLATFORM";
            ELayer[ELayer["BOOST"] = 10] = "BOOST";
            ELayer[ELayer["LOOTBOX"] = 11] = "LOOTBOX";
            ELayer[ELayer["PROJECTILE"] = 12] = "PROJECTILE";
            ELayer[ELayer["WINDMILL"] = 13] = "WINDMILL";
            ELayer[ELayer["COW"] = 14] = "COW";
            ELayer[ELayer["SPAWN"] = 15] = "SPAWN";
            ELayer[ELayer["POWERMILL"] = 16] = "POWERMILL";
            ELayer[ELayer["CASTLESPIKE"] = 17] = "CASTLESPIKE";
            ELayer[ELayer["TURRET"] = 18] = "TURRET";
            ELayer[ELayer["WOODFARM"] = 19] = "WOODFARM";
            ELayer[ELayer["CHERRYWOODFARM"] = 20] = "CHERRYWOODFARM";
            ELayer[ELayer["STONEWARM"] = 21] = "STONEWARM";
            ELayer[ELayer["CASTLEWALL"] = 22] = "CASTLEWALL";
            ELayer[ELayer["SHARK"] = 23] = "SHARK";
            ELayer[ELayer["WOLF"] = 24] = "WOLF";
            ELayer[ELayer["GOLDENCOW"] = 25] = "GOLDENCOW";
            ELayer[ELayer["ROOF"] = 26] = "ROOF";
            ELayer[ELayer["DRAGON"] = 27] = "DRAGON";
            ELayer[ELayer["MAMMOTH"] = 28] = "MAMMOTH";
            ELayer[ELayer["FIREBALL"] = 29] = "FIREBALL";
            ELayer[ELayer["CHEST"] = 30] = "CHEST";
            ELayer[ELayer["DRAGONWALLBIG"] = 31] = "DRAGONWALLBIG";
            ELayer[ELayer["DRAGONWALLMEDIUM"] = 32] = "DRAGONWALLMEDIUM";
            ELayer[ELayer["DRAGONWALLSMALL"] = 33] = "DRAGONWALLSMALL";
            ELayer[ELayer["MAMMOTHWALL"] = 34] = "MAMMOTHWALL";
            ELayer[ELayer["MAMMOTHWALLSMALL"] = 35] = "MAMMOTHWALLSMALL";
            ELayer[ELayer["DUCK"] = 36] = "DUCK";
            ELayer[ELayer["TELEPORT"] = 37] = "TELEPORT";
            ELayer[ELayer["CACTUS"] = 38] = "CACTUS";
            ELayer[ELayer["TORNADO"] = 39] = "TORNADO";
        })(ELayer || (ELayer = {}));
        const LayerObjects = [ ELayer.STONE, ELayer.HARDSPIKE, ELayer.TREE, ELayer.GOLD, ELayer.BUSH, ELayer.SPIKE, ELayer.WOODWALL, ELayer.WINDMILL, ELayer.SPAWN, ELayer.POWERMILL, ELayer.CASTLESPIKE, ELayer.TURRET, ELayer.WOODFARM, ELayer.CHERRYWOODFARM, ELayer.STONEWARM, ELayer.CASTLEWALL, ELayer.CHEST, ELayer.DRAGONWALLBIG, ELayer.DRAGONWALLMEDIUM, ELayer.DRAGONWALLSMALL, ELayer.MAMMOTHWALL, ELayer.MAMMOTHWALLSMALL, ELayer.TELEPORT, ELayer.CACTUS ];
        const LayerExclude = [ ELayer.TREE, ELayer.WOODFARM, ELayer.CHERRYWOODFARM ];
        var EObjects;
        (function(EObjects) {
            EObjects[EObjects["BOOST"] = 6] = "BOOST";
            EObjects[EObjects["PLATFORM"] = 8] = "PLATFORM";
            EObjects[EObjects["TRAP"] = 9] = "TRAP";
            EObjects[EObjects["ROOF"] = 48] = "ROOF";
        })(EObjects || (EObjects = {}));
        var EHats;
        (function(EHats) {
            EHats[EHats["BUSH"] = 1] = "BUSH";
            EHats[EHats["BERSERKER"] = 2] = "BERSERKER";
            EHats[EHats["JUNGLE"] = 3] = "JUNGLE";
            EHats[EHats["CRYSTAL"] = 4] = "CRYSTAL";
            EHats[EHats["SPIKEGEAR"] = 5] = "SPIKEGEAR";
            EHats[EHats["IMMUNITY"] = 6] = "IMMUNITY";
            EHats[EHats["BOOST"] = 7] = "BOOST";
            EHats[EHats["APPLEHAT"] = 8] = "APPLEHAT";
            EHats[EHats["SCUBA"] = 9] = "SCUBA";
            EHats[EHats["HOOD"] = 10] = "HOOD";
            EHats[EHats["DEMOLIST"] = 11] = "DEMOLIST";
        })(EHats || (EHats = {}));
        var EWeapons;
        (function(EWeapons) {
            EWeapons[EWeapons["SHIELD"] = 11] = "SHIELD";
            EWeapons[EWeapons["STICK"] = 13] = "STICK";
            EWeapons[EWeapons["HAMMER"] = 15] = "HAMMER";
        })(EWeapons || (EWeapons = {}));
        var EItemTypes;
        (function(EItemTypes) {
            EItemTypes[EItemTypes["ATTACKING"] = 0] = "ATTACKING";
            EItemTypes[EItemTypes["SHOOTING"] = 1] = "SHOOTING";
            EItemTypes[EItemTypes["PLACEABLE"] = 2] = "PLACEABLE";
            EItemTypes[EItemTypes["FOOD"] = 3] = "FOOD";
        })(EItemTypes || (EItemTypes = {}));
        var EAnimals;
        (function(EAnimals) {
            EAnimals[EAnimals["COW"] = 14] = "COW";
            EAnimals[EAnimals["SHARK"] = 23] = "SHARK";
            EAnimals[EAnimals["WOLF"] = 24] = "WOLF";
            EAnimals[EAnimals["GOLDENCOW"] = 25] = "GOLDENCOW";
            EAnimals[EAnimals["DRAGON"] = 27] = "DRAGON";
            EAnimals[EAnimals["MAMMOTH"] = 28] = "MAMMOTH";
            EAnimals[EAnimals["DUCK"] = 36] = "DUCK";
        })(EAnimals || (EAnimals = {}));
        var PlacementMode;
        (function(PlacementMode) {
            PlacementMode[PlacementMode["INVISIBLE"] = 0] = "INVISIBLE";
            PlacementMode[PlacementMode["HOLDING"] = 1] = "HOLDING";
            PlacementMode[PlacementMode["AUTOMATIC"] = 2] = "AUTOMATIC";
        })(PlacementMode || (PlacementMode = {}));
        let teammates = [];
        const UpdateClanList = userList => {
            teammates = userList;
        };
        const DeleteClan = () => {
            teammates = [];
        };
        const storage = {
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
        const defaultSettings = {
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
            attack: 0,
            autoattack: "KeyE",
            lockRotation: "KeyX",
            openChat: "Enter",
            invisibleHit: 2,
            spikeInsta: "KeyR",
            toggleMenu: "Escape",
            fastBreak: "KeyZ",
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
            placementMode: PlacementMode.AUTOMATIC,
            placementSpeed: 15,
            autoheal: true,
            autohealDelay: 80,
            jungleOnClown: true,
            lastHat: true,
            autoScuba: true,
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
            itemMarkers: true,
            teammateMarkers: true,
            enemyMarkers: true,
            trapActivated: true,
            itemMarkersColor: "#8ecc51",
            teammateMarkersColor: "#cfbc5f",
            enemyMarkersColor: "#cc5151",
            trapActivatedColor: "#48b2b8",
            markersBottom: true,
            hatReloadBar: true,
            hatReloadBarColor: "#5155cc",
            fireballReloadBar: true,
            fireballReloadBarColor: "#cf7748",
            turretReloadBar: true,
            turretReloadBarColor: "#51cc80",
            windmillRotation: false,
            possibleShots: true,
            autochat: false,
            autochatMessages: [ "Dsync Client", "What is it?", "The most advanced hack for sploop!", "Download on greasyfork!" ],
            kill: true,
            killMessage: "{NAME}, you suck! {KILL}x",
            autospawn: false,
            smoothZoom: true,
            skipUpgrades: true,
            invisHitToggle: false,
            reverseZoom: false,
            menuTransparency: false
        };
        const settings = Object.assign(Object.assign({}, defaultSettings), storage.get("Dsync-settings"));
        for (const key in settings) {
            if (!defaultSettings.hasOwnProperty(key)) {
                delete settings[key];
            }
        }
        storage.set("Dsync-settings", settings);
        var Settings = settings;
        const itemBar = index => Dsync.defaultData[Dsync.props.itemBar][index];
        const hasSecondary = () => {
            const id = itemBar(1);
            const item = Dsync.itemData[id];
            return item[Dsync.props.itemType] === EItems.SECONDARY;
        };
        const canShoot = () => {
            const id = itemBar(1);
            const item = Dsync.itemData[id];
            return item[Dsync.props.itemDataType] === EItemTypes.SHOOTING;
        };
        const hasItemByType = type => {
            const items = Dsync.defaultData[Dsync.props.itemBar];
            return items.some((id => Dsync.itemData[id][Dsync.props.itemType] === type));
        };
        const getAnimals = () => {
            const list = Dsync.entityList();
            return [ ...list[EAnimals.COW], ...list[EAnimals.SHARK], ...list[EAnimals.WOLF], ...list[EAnimals.GOLDENCOW], ...list[EAnimals.DRAGON], ...list[EAnimals.MAMMOTH], ...list[EAnimals.DUCK] ].map((entity => formatEntity(entity)));
        };
        const getEnemies = () => {
            const players = Dsync.entityList()[0];
            return players.map((player => formatEntity(player))).filter((({id: id, ownerID: ownerID}) => {
                const isMyPlayer = id === Dsync.myPlayerID();
                const isTeammate = teammates.includes(ownerID);
                return !isMyPlayer && !isTeammate;
            }));
        };
        const getEntities = () => [ ...getEnemies(), ...getAnimals() ];
        const lineSegmentIntersectsCircle = (x1, y1, x2, y2, cx, cy, r) => {
            const xL = x2 - x1;
            const xC = x1 - cx;
            const yL = y2 - y1;
            const yC = y1 - cy;
            const a = xL * xL + yL * yL;
            const hB = xL * xC + yL * yC;
            const c = xC * xC + yC * yC - r * r;
            return hB * hB >= a * c && (-hB <= a || c + hB + hB + a <= 0) && (hB <= 0 || c <= 0);
        };
        const getNearestEntities = shoot => {
            const enemies = getEnemies().map((enemy => Object.assign(Object.assign({}, enemy), {
                dir: getAngle(enemy, Dsync.myPlayer).angle,
                distance: distance(enemy, Dsync.myPlayer).dist
            }))).sort(((a, b) => a.distance - b.distance));
            if (shoot) {
                enemies.sort(((a, b) => {
                    const hasShield1 = a.target[Dsync.props.currentItem] === EWeapons.SHIELD;
                    const hasShield2 = b.target[Dsync.props.currentItem] === EWeapons.SHIELD;
                    return hasShield1 ? 1 : hasShield2 ? -1 : 0;
                }));
            }
            const animals = getAnimals().map((enemy => Object.assign(Object.assign({}, enemy), {
                dir: getAngle(enemy, Dsync.myPlayer).angle,
                distance: distance(enemy, Dsync.myPlayer).dist
            }))).sort(((a, b) => a.distance - b.distance));
            return [ ...enemies, ...animals ];
        };
        const entityIn = (entity, layer) => Dsync.entityList()[layer].some((target => {
            const object = formatObject(target);
            return distance(entity, object).dist < entity.radius + object.radius;
        }));
        const projectileCanHitEntity = entity => {
            if (!canShoot()) return false;
            const range = Dsync.itemData[itemBar(EItems.SECONDARY)].range;
            const enemy = Object.assign(Object.assign({}, entity), {
                dir: getAngle(entity, Dsync.myPlayer).angle,
                distance: distance(entity, Dsync.myPlayer).dist
            });
            const x1 = Dsync.myPlayer.x2;
            const y1 = Dsync.myPlayer.y2;
            const x2 = x1 + range * Math.cos(enemy.dir);
            const y2 = y1 + range * Math.sin(enemy.dir);
            const myPlayerOnPlatform = entityIn(Dsync.myPlayer, ELayer.PLATFORM);
            const entityInRoof = entityIn(entity, ELayer.ROOF);
            if (myPlayerOnPlatform && entityInRoof) return false;
            const layers = Dsync.entityList();
            for (const layer of LayerObjects) {
                if (myPlayerOnPlatform && !LayerExclude.includes(layer)) continue;
                for (const entity of layers[layer]) {
                    const object = formatObject(entity);
                    const dist = distance(object, Dsync.myPlayer).dist;
                    if (dist > enemy.distance) continue;
                    if (lineSegmentIntersectsCircle(x1, y1, x2, y2, object.x2, object.y2, object.radius)) {
                        const objectData = Dsync.entityData[object.type];
                        const maxHealth = objectData[Dsync.props.maxHealth];
                        if (maxHealth === undefined) return false;
                        return {
                            canHit: true,
                            needDestroy: true
                        };
                    }
                }
            }
            return {
                canHit: true,
                needDestroy: false
            };
        };
        const getNearestPossibleEnemy = index => {
            const range = Dsync.itemData[itemBar(index)].range;
            const shoot = canShoot() && index === 1;
            const enemies = getNearestEntities(shoot).filter((enemy => {
                const inDistance = enemy.distance < range + enemy.radius;
                if (shoot) {
                    const entityHit = projectileCanHitEntity(enemy);
                    return inDistance && typeof entityHit === "object" && entityHit.canHit;
                }
                return inDistance;
            }));
            if (shoot) {
                enemies.sort(((a, b) => {
                    const canHitA = projectileCanHitEntity(a);
                    const canHitB = projectileCanHitEntity(b);
                    return canHitA.needDestroy ? 1 : canHitB.needDestroy ? -1 : 0;
                }));
            }
            return enemies.length ? enemies[0] : null;
        };
        const createImage = src => {
            const img = new Image;
            img.src = src;
            img.loaded = false;
            img.onload = () => {
                img.loaded = true;
            };
            return img;
        };
        const Images = {
            gaugeBackground: createImage("https://i.imgur.com/xincrX4.png"),
            gaugeFront: createImage("https://i.imgur.com/6AkHQM4.png")
        };
        var utils_Images = Images;
        const TYPEOF = value => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        const removeClass = (target, name) => {
            if (target instanceof HTMLElement) {
                target.classList.remove(name);
                return;
            }
            for (const element of target) {
                element.classList.remove(name);
            }
        };
        const formatCode = code => {
            code = code + "";
            if (code === "0") return "LBTN";
            if (code === "1") return "MBTN";
            if (code === "2") return "RBTN";
            if (code === "3") return "XBTN2";
            if (code === "4") return "XBTN1";
            if (code === "Escape") return "ESC";
            if (code === "BracketLeft") return "[";
            if (code === "BracketRight") return "]";
            if (code === "NumpadDivide") return "NUMDIV";
            if (code === "NumpadMultiply") return "NUMMULT";
            if (code === "NumpadSubtract") return "NUMSUB";
            if (code === "NumpadDecimal") return "NUMDEC";
            if (code === "CapsLock") return "CAPS";
            if (code === "PrintScreen") return "PRNT";
            if (code === "Backslash") return "\\";
            if (code === "Backquote") return "BQUOTE";
            if (code === "PageDown") return "PAGEDN";
            const NumpadDigitArrowKey = /^(?:Numpad|Digit|Arrow|Key)(\w+)$/;
            if (NumpadDigitArrowKey.test(code)) {
                code = code.replace(NumpadDigitArrowKey, "$1").replace(/Numpad/, "NUM");
            }
            const ExtraKeysRegex = /^(Control|Shift|Alt)(.).*/;
            if (ExtraKeysRegex.test(code)) {
                code = code.replace(ExtraKeysRegex, "$2$1").replace(/Control/, "CTRL");
            }
            return code.toUpperCase();
        };
        const contains = (target, name) => target.classList.contains(name);
        const isInput = target => {
            const element = target || document.activeElement;
            return [ "TEXTAREA", "INPUT" ].includes(element.tagName);
        };
        const inGame = () => {
            const homepage = document.querySelector("#homepage");
            return homepage && homepage.style.display === "none";
        };
        const formatData = object => ({
            id: object[Dsync.props.id],
            type: object.type,
            x: object[Dsync.props.x],
            y: object[Dsync.props.y],
            x1: object[Dsync.props.x1],
            y1: object[Dsync.props.y1],
            x2: object[Dsync.props.x2],
            y2: object[Dsync.props.y2],
            angle: object[Dsync.props.angle],
            angle1: object[Dsync.props.angle1],
            angle2: object[Dsync.props.angle2],
            ownerID: object[Dsync.props.itemOwner],
            target: object
        });
        const formatProjectile = object => {
            const data = formatData(object);
            return Object.assign(Object.assign({}, data), {
                range: object.range
            });
        };
        const formatObject = object => {
            const data = formatData(object);
            const entityData = Dsync.entityData[object.type];
            return Object.assign(Object.assign({}, data), {
                radius: entityData[Dsync.props.radius]
            });
        };
        const formatEntity = entity => {
            const object = formatObject(entity);
            const entityData = Dsync.entityData[entity.type];
            const healthValue = entity[Dsync.props.health];
            const maxHealth = entityData[Dsync.props.maxHealth];
            return Object.assign(Object.assign({}, object), {
                healthValue: healthValue,
                health: Math.ceil(entity[Dsync.props.health] / 255 * maxHealth),
                maxHealth: maxHealth,
                playerValue: entity[Dsync.props.playerValue]
            });
        };
        const formatPlayer = entity => {
            const player = formatEntity(entity);
            return Object.assign(Object.assign({}, player), {
                hat: entity[Dsync.props.hat],
                isClown: player.playerValue === 128
            });
        };
        const getTracerColor = (entity, isTeammate) => {
            if (entity.id === Dsync.myPlayerID() || isTeammate) return Settings.teammateColor;
            if (entity.type === 0) return Settings.enemyColor;
            return Settings.animalColor;
        };
        const trapActive = object => {
            const trap = formatObject(object);
            return getEntities().some((entity => distance(entity, trap).dist < trap.radius + entity.radius - 25));
        };
        const getMarkerColor = (target, ownerID) => {
            let color = null;
            const isMyPlayers = (Dsync.myPlayer || {}).ownerID === ownerID;
            const isTeammates = teammates.includes(ownerID);
            const isTeammateTrap = target.type === 6 && (isMyPlayers || isTeammates);
            if (Settings.itemMarkers && isMyPlayers) {
                color = Settings.itemMarkersColor;
            } else if (Settings.teammateMarkers && isTeammates) {
                color = Settings.teammateMarkersColor;
            } else if (Settings.enemyMarkers && !isMyPlayers && !isTeammates) {
                color = Settings.enemyMarkersColor;
            }
            if (Settings.trapActivated && isTeammateTrap) {
                const id = target[Dsync.props.id];
                if (!target.active && trapActive(target)) {
                    target.active = id;
                }
                if (target.active === id) return Settings.trapActivatedColor;
                target.active = null;
            }
            return color;
        };
        const marker = (ctx, color) => {
            ctx.strokeStyle = "#303030";
            ctx.lineWidth = 3;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(0, 0, 9, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        };
        const arrow = (ctx, len, x, y, angle, color) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 4);
            ctx.rotate(angle);
            ctx.globalAlpha = .75;
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(-len, -len);
            ctx.lineTo(len, -len);
            ctx.lineTo(len, len);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        };
        const lines = (ctx, x1, y1, x2, y2, color) => {
            ctx.save();
            ctx.globalAlpha = .75;
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.restore();
        };
        const Common_images = {};
        const crosshair = (ctx, x, y, angle, color, radius, width, height) => {
            const canvas = Common_images[color] || function() {
                const canvas = document.createElement("canvas");
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext("2d");
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = width / 1.5;
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.rect(-width / 2, radius - height / 2, width, height);
                    ctx.fill();
                    ctx.rotate(Math.PI / 2);
                    ctx.closePath();
                }
                Common_images[color] = canvas;
                return canvas;
            }();
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.globalAlpha = .75;
            ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
            ctx.restore();
        };
        const drawImage = (ctx, image) => {
            ctx.drawImage(image, -.5 * image.width / 2, -.5 * image.height, image.width * .5, image.height * .5);
        };
        const drawBar = (ctx, entity, value, maxValue, color) => {
            const {x: x, y: y, radius: radius} = entity;
            const background = utils_Images.gaugeBackground;
            const front = utils_Images.gaugeFront;
            const scale = .5;
            const width = front.width * scale;
            const fill = value / maxValue * (width - 10);
            const h = entity.type === ELayer.TURRET ? 25 : 50;
            ctx.save();
            ctx.translate(x, y + radius + h + front.height * scale);
            drawImage(ctx, background);
            ctx.fillStyle = color;
            ctx.fillRect(-width / 2 + 5, -scale * front.height + 5, fill, scale * front.height - 10);
            drawImage(ctx, front);
            ctx.restore();
        };
        const drawHealth = (ctx, entity) => {
            if (!Settings.drawHP) return;
            const {x: x, y: y, health: health, maxHealth: maxHealth, radius: radius} = entity;
            const front = utils_Images.gaugeFront;
            let h = 0;
            if (Settings.hatReloadBar && entity.type === 0 || Settings.fireballReloadBar && entity.type === ELayer.DRAGON) {
                h = front.height * .5;
            }
            renderText(ctx, `HP ${health}/${maxHealth}`, ((width, height) => [ x - width / 2, y + radius + h + 55 ]));
        };
        const dist = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        const distance = (entity1, entity2) => {
            const entity1Has = "x" in entity1 && "y" in entity1;
            const entity2Has = "x" in entity2 && "y" in entity2;
            return {
                lerpDist: entity1Has && entity2Has ? dist(entity1.x, entity1.y, entity2.x, entity2.y) : null,
                dist: dist(entity1.x2, entity1.y2, entity2.x2, entity2.y2)
            };
        };
        const getAngle = (entity1, entity2) => {
            const entity1Has = "x" in entity1 && "y" in entity1;
            const entity2Has = "x" in entity2 && "y" in entity2;
            return {
                lerpAngle: entity1Has && entity2Has ? Math.atan2(entity1.y - entity2.y, entity1.x - entity2.x) : null,
                angle: Math.atan2(entity1.y2 - entity2.y2, entity1.x2 - entity2.x2)
            };
        };
        const lerp = (start, stop, amt) => amt * (stop - start) + start;
        const drawTracers = (ctx, entity, isTeammate) => {
            const player = formatPlayer(Dsync.target);
            const {x: x1, y: y1} = player;
            const {x: x2, y: y2} = entity;
            const color = Settings.rainbow ? `hsl(${Dsync.hsl}, 100%, 50%)` : getTracerColor(entity, isTeammate);
            if (Settings.arrows) {
                const arrowWidth = 8;
                const angle = getAngle(entity, player).lerpAngle;
                const dist = Math.min(100 + arrowWidth * 2, distance(entity, player).lerpDist - arrowWidth * 2);
                const x = x1 + dist * Math.cos(angle);
                const y = y1 + dist * Math.sin(angle);
                arrow(ctx, arrowWidth, x, y, angle, color);
            } else {
                lines(ctx, x1, y1, x2, y2, color);
            }
        };
        const TextOptions = {
            font: "bold 15px Montserrat",
            textBaseline: "top"
        };
        const renderText = (ctx, text, callback, options) => {
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#303030";
            ctx.lineWidth = 8;
            ctx.lineJoin = "round";
            Object.assign(ctx, TextOptions, options);
            const width = ctx.measureText(text).width;
            const height = parseInt(ctx.font.match(/\d+/)[0]) || 1;
            const data = callback(width, height);
            ctx.strokeText(text, ...data);
            ctx.fillText(text, ...data);
            ctx.restore();
        };
        const windmillRotation = target => {
            if (target.type !== ELayer.WINDMILL && target.type !== ELayer.POWERMILL) return;
            if (!target.rotSpeed) {
                target.rotSpeed = target[Dsync.props.rotSpeed];
            }
            const rot = Settings.windmillRotation ? target.rotSpeed : 0;
            if (target[Dsync.props.rotSpeed] !== rot) {
                target[Dsync.props.rotSpeed] = rot;
            }
        };
        const sleep = ms => new Promise((resolve => setTimeout(resolve, ms)));
        const linker = value => {
            const hook = {
                0: value,
                toString: radix => hook[0].toString(radix),
                valueOf: () => hook[0].valueOf()
            };
            return hook;
        };
        const download = (data, filename) => {
            const blob = new Blob([ JSON.stringify(data, null, 4) ], {
                type: "application/json "
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = (filename || "settings") + ".txt";
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        };
        var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        let move = 0;
        let attacking = false;
        let autoattack = false;
        let weapon = false;
        let isHealing = false;
        let attackingInvis = false;
        let toggleInvis = false;
        let currentItem = null;
        const hotkeys = new Map;
        const spawn = () => __awaiter(void 0, void 0, void 0, (function*() {
            yield sleep(100);
            const play = document.querySelector("#play");
            if (play) play.click();
        }));
        let chatCount = 0;
        let chatToggle = false;
        const autochat = () => __awaiter(void 0, void 0, void 0, (function*() {
            if (chatToggle || isInput() || !inGame()) return;
            chatToggle = true;
            const messages = Settings.autochatMessages.filter((msg => msg.length));
            if (!messages.length) return;
            Dsync.chat(messages[chatCount++]);
            chatCount %= messages.length;
            yield sleep(2e3);
            chatToggle = false;
        }));
        const Controller_reset = () => {
            move = 0;
            attacking = false;
            autoattack = false;
            weapon = false;
            isHealing = false;
            attackingInvis = false;
            toggleInvis = false;
            currentItem = null;
            for (const [key] of hotkeys) {
                hotkeys.delete(key);
            }
        };
        const equipHat = (id, ignore = false, actual = true) => {
            const hat = (Dsync.myPlayer || {}).hat || 0;
            if (id === 0) {
                id = hat;
            } else if (hat === id && !ignore) return;
            if (actual) {
                Dsync.actualHat = id;
            }
            Dsync.equipHat(id);
            Dsync.equipHat(id);
        };
        const whichWeapon = type => {
            if (type !== undefined) {
                weapon = type;
            }
            Dsync.selectByID(itemBar(Number(weapon)));
        };
        const attack = (angle = null) => {
            Dsync.attack(angle !== null ? angle : Dsync.getAngle());
        };
        const place = (id, angle = null) => {
            Dsync.selectItem(id);
            attack(angle);
            Dsync.stopAttack();
            whichWeapon();
            if (attacking) {
                attack(angle);
            }
        };
        let count = 0;
        const placement = () => {
            if (currentItem === null) return;
            place(currentItem);
            count++;
            if ((count %= Settings.placementSpeed) === 0) {
                setTimeout(placement);
            } else {
                queueMicrotask(placement);
            }
        };
        const placementHandler = (type, code) => {
            if (!hasItemByType(type)) return;
            hotkeys.set(code, type);
            currentItem = type;
            if (hotkeys.size === 1) {
                placement();
            }
        };
        const heal = () => {
            Dsync.selectItem(EItems.HEAL);
            attack();
            Dsync.stopAttack();
            whichWeapon();
            if (attacking) {
                attack();
            }
        };
        const healing = () => {
            if (!isHealing) return;
            heal();
            setTimeout(healing, 0);
        };
        const invisibleHit = () => {
            Dsync.mousemove = true;
            Dsync.aimTarget = null;
            if (Settings.invisHitToggle && !toggleInvis || !Settings.invisHitToggle && !attackingInvis) {
                toggleInvis = false;
                attackingInvis = false;
                return;
            }
            let angle = null;
            const enemy = getNearestPossibleEnemy(+!weapon);
            const shoot = canShoot() && !weapon;
            if (enemy) {
                angle = enemy.dir;
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
        };
        const spikeInsta = () => {
            let angle = null;
            const enemy = getNearestPossibleEnemy(0);
            if (enemy) {
                angle = enemy.dir;
            }
            const oldWeapon = weapon;
            equipHat(EHats.BERSERKER);
            whichWeapon(false);
            place(EItems.SPIKE, angle);
            attack(angle);
            Dsync.stopAttack();
            whichWeapon(oldWeapon);
        };
        let fastBreakHat = 0;
        let oldWeapon = false;
        let fastBreaking = false;
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
        };
        const fastBreakStop = () => __awaiter(void 0, void 0, void 0, (function*() {
            if (!fastBreaking) return;
            Dsync.stopAttack();
            attacking = false;
            whichWeapon(oldWeapon);
            const step = Date.now() - startFastBreak;
            if (step < 1300) yield sleep(1300 - step);
            if (!Dsync.myPlayer.isClown) equipHat(fastBreakHat);
            fastBreaking = false;
        }));
        const handleKeydown = (event, code) => {
            if (code === 1) event.preventDefault();
            if (event instanceof KeyboardEvent && event.repeat) return;
            if (Dsync.active) return;
            if (code === Settings.toggleMenu && !isInput(event.target)) {
                Dsync.toggleMenu();
            }
            if (!inGame()) return;
            if (code === Settings.openChat) {
                if (!isInput()) event.preventDefault();
                Dsync.toggleChat();
            }
            if (isInput(event.target)) return;
            if (code === Settings.primary) whichWeapon(false);
            if (code === Settings.secondary && hasSecondary()) whichWeapon(true);
            if (code === Settings.heal) {
                isHealing = true;
                healing();
            }
            if (code === Settings.wall) placementHandler(EItems.WALL, code);
            if (code === Settings.spike) placementHandler(EItems.SPIKE, code);
            if (code === Settings.windmill) placementHandler(EItems.WINDMILL, code);
            if (code === Settings.trap) placementHandler(EItems.TRAP, code);
            if (code === Settings.turret) placementHandler(EItems.TURRET, code);
            if (code === Settings.tree) placementHandler(EItems.TREE, code);
            if (code === Settings.platform) placementHandler(EItems.PLATFORM, code);
            if (code === Settings.spawn) placementHandler(EItems.SPAWN, code);
            if (code === Settings.unequip) equipHat(Dsync.myPlayer.hat, true);
            if (code === Settings.bush) equipHat(EHats.BUSH);
            if (code === Settings.berserker) equipHat(EHats.BERSERKER);
            if (code === Settings.jungle) equipHat(EHats.JUNGLE);
            if (code === Settings.crystal) equipHat(EHats.CRYSTAL);
            if (code === Settings.spikegear) equipHat(EHats.SPIKEGEAR);
            if (code === Settings.immunity) equipHat(EHats.IMMUNITY);
            if (code === Settings.boost) equipHat(EHats.BOOST);
            if (code === Settings.applehat) equipHat(EHats.APPLEHAT);
            if (code === Settings.scuba) equipHat(EHats.SCUBA);
            if (code === Settings.hood) equipHat(EHats.HOOD);
            if (code === Settings.demolist) equipHat(EHats.DEMOLIST);
            if (code === Settings.invisibleHit && hasSecondary()) {
                if (Settings.invisHitToggle) {
                    toggleInvis = !toggleInvis;
                } else {
                    attackingInvis = true;
                }
                if (toggleInvis || attackingInvis) invisibleHit();
            }
            if (code === Settings.spikeInsta) spikeInsta();
            if (code === Settings.fastBreak) fastBreak();
            const copyMove = move;
            if (code === Settings.up) move |= 1;
            if (code === Settings.left) move |= 4;
            if (code === Settings.down) move |= 2;
            if (code === Settings.right) move |= 8;
            if (copyMove !== move) Dsync.move(move);
            if (event instanceof MouseEvent && code === Settings.attack) {
                const canAttack = !Dsync.mousedown(event);
                if (canAttack && Dsync.mousemove) {
                    attacking = true;
                    Dsync.attack(Dsync.getAngle());
                }
            }
            if (code === Settings.autoattack) {
                autoattack = !autoattack;
                Dsync.autoattack(autoattack);
            }
            if (code === Settings.lockRotation) Dsync.toggleRotation();
        };
        const handleKeyup = (event, code) => {
            if (code === Settings.heal && isHealing) {
                isHealing = false;
            }
            if (code === Settings.invisibleHit && attackingInvis) {
                attackingInvis = false;
            }
            if (code === Settings.fastBreak) fastBreakStop();
            const copyMove = move;
            if (code === Settings.up) move &= -2;
            if (code === Settings.left) move &= -5;
            if (code === Settings.down) move &= -3;
            if (code === Settings.right) move &= -9;
            if (copyMove !== move) Dsync.move(move);
            if (event instanceof MouseEvent && code === Settings.attack) {
                Dsync.mouseup(event);
                attacking = false;
            }
            if (currentItem !== null && hotkeys.delete(code)) {
                const entries = [ ...hotkeys ];
                currentItem = entries.length ? entries[entries.length - 1][1] : null;
            }
        };
        var code = '<header> <span>Dsync Client</span> <div id="version"> <svg width="15" height="15" viewBox="0 0 16 16" version="1.1"> <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"></path> </svg> <span></span> </div> <svg id="close-menu" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"> <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/> </svg> </header>';
        var Header = code;
        var Navbar_code = '<aside id="navbar-container"> <button class="open-menu active">Keybinds</button> <button class="open-menu">Combat</button> <button class="open-menu">Visuals</button> <button class="open-menu">Misc</button> <button class="open-menu bottom-align">Credits</button> </aside>';
        var Navbar = Navbar_code;
        var Keybinds_code = '<div class="menu-page opened"> <h1>Keybinds</h1> <p>Setup keybinds for items, weapons and hats</p> <div class="section"> <div class="section-title"> <h2>Items & Weapons</h2> <svg class="icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" stroke="none"> <path d="M160 575 l-54 -55 99 -100 100 -100 -100 -100 -100 -100 58 -57 57 -58 157 158 158 157 -155 155 c-85 85 -157 155 -160 155 -3 0 -30 -25 -60 -55z"/> </g> </svg> </div> <div class="section-content"> <div class="split-section"> <div class="section-option"> <span class="section-option-title">Primary</span> <button id="primary" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Secondary</span> <button id="secondary" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Heal</span> <button id="heal" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Wall</span> <button id="wall" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Spike</span> <button id="spike" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Windmill</span> <button id="windmill" class="section-option-hotkeyInput"></button> </div> </div> <div class="split-section"> <div class="section-option"> <span class="section-option-title">Trap/Boost</span> <button id="trap" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Turret</span> <button id="turret" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Tree/Stone</span> <button id="tree" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Platform</span> <button id="platform" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Cosy bed</span> <button id="spawn" class="section-option-hotkeyInput"></button> </div> </div> </div> </div> <div class="section"> <div class="section-title"> <h2>Controls & Movement</h2> <svg class="icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" stroke="none"> <path d="M160 575 l-54 -55 99 -100 100 -100 -100 -100 -100 -100 58 -57 57 -58 157 158 158 157 -155 155 c-85 85 -157 155 -160 155 -3 0 -30 -25 -60 -55z"/> </g> </svg> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Up</span> <button id="up" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Left</span> <button id="left" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Down</span> <button id="down" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Right</span> <button id="right" class="section-option-hotkeyInput"></button> </div> <div class="split"></div> <div class="section-option"> <span class="section-option-title">Attack</span> <button id="attack" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Auto attack</span> <button id="autoattack" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Lock rotation</span> <button id="lockRotation" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Open chat</span> <button id="openChat" class="section-option-hotkeyInput"></button> </div> <div class="split"></div> <div class="section-option"> <span class="section-option-title">Invisible hit</span> <button id="invisibleHit" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Spike insta</span> <button id="spikeInsta" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Toggle Dsync Menu</span> <button id="toggleMenu" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title"> Fast break <span class="tooltip"> * <span class="tooltip-text">When you press a key, it equips a demolist and starts attacking</span> </span> </span> <button id="fastBreak" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Zoom In</span> <button class="section-option-hotkeyInput smaller">WHEEL DN</button> </div> <div class="section-option"> <span class="section-option-title">Zoom Out</span> <button class="section-option-hotkeyInput smaller">WHEEL UP</button> </div> </div> </div> <div class="section"> <div class="section-title"> <h2>Hats</h2> <svg class="icon" version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" stroke="none"> <path d="M160 575 l-54 -55 99 -100 100 -100 -100 -100 -100 -100 58 -57 57 -58 157 158 158 157 -155 155 c-85 85 -157 155 -160 155 -3 0 -30 -25 -60 -55z"/> </g> </svg> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Unequip hat</span> <button id="unequip" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Bush hat</span> <button id="bush" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Berserker</span> <button id="berserker" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Jungle gear</span> <button id="jungle" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Crystal gear</span> <button id="crystal" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Spike gear</span> <button id="spikegear" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Immunity gear</span> <button id="immunity" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Boost hat</span> <button id="boost" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Apple hat</span> <button id="applehat" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Scuba gear</span> <button id="scuba" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Hood</span> <button id="hood" class="section-option-hotkeyInput"></button> </div> <div class="section-option"> <span class="section-option-title">Demolist</span> <button id="demolist" class="section-option-hotkeyInput"></button> </div> </div> </div> </div>';
        var Keybinds = Keybinds_code;
        var Combat_code = '<div class="menu-page"> <h1>Combat</h1> <p>Modify combat settings, change pvp behavior</p> <div class="section opened"> <div class="section-title"> <h2>Placement</h2> </div> <div class="section-content one-row"> <div class="section-option"> <span class="section-option-title"> Placement speed <span class="tooltip"> * <span class="tooltip-text">The higher value, the faster you place</span> </span> </span> <label class="slider"> <input id="placementSpeed" min="1" max="100" type="range"> <span class="slider-value">100</span> </label> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Healing</h2> </div> <div class="section-content"> <div class="split-section"> <div class="section-option"> <span class="section-option-title">Autoheal</span> <label class="switch-checkbox"> <input id="autoheal" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Healing delay</span> <label class="slider"> <input id="autohealDelay" min="0" max="150" type="range"> <span class="slider-value">150</span> </label> </div> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Hats</h2> </div> <div class="section-content"> <div class="split-section"> <div class="section-option"> <span class="section-option-title">Jungle On Clown</span> <label class="switch-checkbox"> <input id="jungleOnClown" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title"> Equip last hat <span class="tooltip"> * <span class="tooltip-text">On spawn, the last hat you had will be equipped</span> </span> </span> <label class="switch-checkbox"> <input id="lastHat" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Auto scuba</span> <label class="switch-checkbox"> <input id="autoScuba" type="checkbox"> <span></span> </label> </div> </div> </div> </div> </div>';
        var Combat = Combat_code;
        var Visuals_code = '<div class="menu-page"> <h1>Visuals</h1> <p>Customize your visuals, or you can disable it for performance</p> <div class="section opened"> <div class="section-title"> <h2>Tracers</h2> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Enemies</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="enemyColor" type="color"> <label class="switch-checkbox"> <input id="enemyTracers" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Arrows</span> <label class="switch-checkbox"> <input id="arrows" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Teammates</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="teammateColor" type="color"> <label class="switch-checkbox"> <input id="teammateTracers" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Rainbow colors</span> <label class="switch-checkbox"> <input id="rainbow" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Animals</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="animalColor" type="color"> <label class="switch-checkbox"> <input id="animalTracers" type="checkbox"> <span></span> </label> </div> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Player</h2> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Show invisible players</span> <label class="switch-checkbox"> <input id="showHoods" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Draw HP value</span> <label class="switch-checkbox"> <input id="drawHP" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Item counter</span> <label class="switch-checkbox"> <input id="itemCounter" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Draw ID</span> <label class="switch-checkbox"> <input id="drawID" type="checkbox"> <span></span> </label> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Markers</h2> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Your markers</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="itemMarkersColor" type="color"> <label class="switch-checkbox"> <input id="itemMarkers" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Teammates</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="teammateMarkersColor" type="color"> <label class="switch-checkbox"> <input id="teammateMarkers" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Enemies</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="enemyMarkersColor" type="color"> <label class="switch-checkbox"> <input id="enemyMarkers" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title"> Trap activated <span class="tooltip"> * <span class="tooltip-text">When the player or animal will be trapped, marker will change color</span> </span> </span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="trapActivatedColor" type="color"> <label class="switch-checkbox"> <input id="trapActivated" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title"> Markers at bottom <span class="tooltip"> * <span class="tooltip-text">Faster, but you won\'t be able to see markers if you\'re trapped or on platform</span> </span> </span> <label class="switch-checkbox"> <input id="markersBottom" type="checkbox"> <span></span> </label> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Reload bars</h2> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Hat reload bar</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="hatReloadBarColor" type="color"> <label class="switch-checkbox"> <input id="hatReloadBar" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Fireball reload bar</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="fireballReloadBarColor" type="color"> <label class="switch-checkbox"> <input id="fireballReloadBar" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title">Turret reload bar</span> <div class="content"> <button class="default-color" title="Reset Color"></button> <input id="turretReloadBarColor" type="color"> <label class="switch-checkbox"> <input id="turretReloadBar" type="checkbox"> <span></span> </label> </div> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Other</h2> </div> <div class="section-content"> <div class="section-option"> <span class="section-option-title">Windmill rotation</span> <label class="switch-checkbox"> <input id="windmillRotation" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title"> Possible shots <span class="tooltip"> * <span class="tooltip-text">Draws a crosshair on entities that can be hit by a projectile</span> </span> </span> <label class="switch-checkbox"> <input id="possibleShots" type="checkbox"> <span></span> </label> </div> </div> </div> </div>';
        var Visuals = Visuals_code;
        var Misc_code = '<div class="menu-page"> <h1>Misc</h1> <p>Customize misc settings, add autochat messages, reset settings</p> <div class="section opened"> <div class="section-title"> <h2>Chat</h2> </div> <div class="section-content one-row"> <div class="section-option"> <span class="section-option-title">Autochat</span> <div class="content"> <input class="input autochat" type="text" maxlength="35"> <input class="input autochat" type="text" maxlength="35"> <input class="input autochat" type="text" maxlength="35"> <input class="input autochat" type="text" maxlength="35"> <label class="switch-checkbox"> <input id="autochat" type="checkbox"> <span></span> </label> </div> </div> <div class="section-option"> <span class="section-option-title"> Message on kill <span class="tooltip"> * <span class="tooltip-text left"> <div>Variables:</div> <div><span class="highlight">{KILL}</span> - amount of kills</div> <div><span class="highlight">{NAME}</span> - name of the player you killed</div> </span> </span> </span> <div class="content"> <input id="killMessage" class="input" type="text" maxlength="35"> <label class="switch-checkbox"> <input id="kill" type="checkbox"> <span></span> </label> </div> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Other</h2> </div> <div class="section-content one-row"> <div class="section-option"> <span class="section-option-title">Autospawn</span> <label class="switch-checkbox"> <input id="autospawn" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title"> Smooth zoom <span class="tooltip"> * <span class="tooltip-text">Disable for performance</span> </span> </span> <label class="switch-checkbox"> <input id="smoothZoom" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title"> Skip upgrades <span class="tooltip"> * <span class="tooltip-text">When you have only 1 item in the upgradebar, it will automatically select it</span> </span> </span> <label class="switch-checkbox"> <input id="skipUpgrades" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title"> Invis hit toggle <span class="tooltip"> * <span class="tooltip-text">If enabled, invisible hit hotkey will work in toggle mode. Useful when you don\'t want to hold this button permanently</span> </span> </span> <label class="switch-checkbox"> <input id="invisHitToggle" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <span class="section-option-title">Reverse zoom</span> <label class="switch-checkbox"> <input id="reverseZoom" type="checkbox"> <span></span> </label> </div> </div> </div> <div class="section opened"> <div class="section-title"> <h2>Menu</h2> </div> <div class="section-content one-row"> <div class="section-option"> <span class="section-option-title">Menu transparency</span> <label class="switch-checkbox"> <input id="menuTransparency" type="checkbox"> <span></span> </label> </div> <div class="section-option"> <div class="content-double"> <button id="reset-settings" class="button red">Reset settings</button> <button id="download-settings" class="button">Download settings</button> <div class="form-upload"> <input id="upload-settings" type="file" accept=".txt"> <span class="light">DRAG SETTINGS FILE HERE OR <span class="light-extra">BROWSE</span></span> </div> </div> </div> </div> </div> </div>';
        var Misc = Misc_code;
        var Credits_code = '<div class="menu-page"> <h1>Credits</h1> <P>Some details about the script and links to my socials</P> <div class="section opened"> <div class="section-content" style="max-height:100%"> <div class="split-section"> <div class="section-option text"> <span class="section-option-title">Author</span> <span class="text-value">Murka</span> </div> <div class="section-option text"> <svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"> <path d="M512 12.672c-282.88 0-512 229.248-512 512 0 226.261 146.688 418.133 350.080 485.76 25.6 4.821 34.987-11.008 34.987-24.619 0-12.16-0.427-44.373-0.64-87.040-142.421 30.891-172.459-68.693-172.459-68.693-23.296-59.093-56.96-74.88-56.96-74.88-46.379-31.744 3.584-31.104 3.584-31.104 51.413 3.584 78.421 52.736 78.421 52.736 45.653 78.293 119.851 55.68 149.12 42.581 4.608-33.109 17.792-55.68 32.427-68.48-113.707-12.8-233.216-56.832-233.216-253.013 0-55.893 19.84-101.547 52.693-137.387-5.76-12.928-23.040-64.981 4.48-135.509 0 0 42.88-13.739 140.8 52.48 40.96-11.392 84.48-17.024 128-17.28 43.52 0.256 87.040 5.888 128 17.28 97.28-66.219 140.16-52.48 140.16-52.48 27.52 70.528 10.24 122.581 5.12 135.509 32.64 35.84 52.48 81.493 52.48 137.387 0 196.693-119.68 240-233.6 252.587 17.92 15.36 34.56 46.763 34.56 94.72 0 68.523-0.64 123.563-0.64 140.203 0 13.44 8.96 29.44 35.2 24.32 204.843-67.157 351.403-259.157 351.403-485.077 0-282.752-229.248-512-512-512z"></path> </svg> <a href="https://github.com/Murka007/Dsync-client" class="text-value" target="_blank" title="Give a star please :)">Dsync client</a> </div> <div class="section-option text"> <svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"> <path d="M26.963 0c1.875 0 3.387 1.516 3.476 3.3v28.7l-3.569-3.031-1.96-1.784-2.139-1.864 0.893 2.94h-18.717c-1.869 0-3.387-1.42-3.387-3.301v-21.653c0-1.784 1.52-3.303 3.393-3.303h22zM18.805 7.577h-0.040l-0.269 0.267c2.764 0.8 4.101 2.049 4.101 2.049-1.781-0.891-3.387-1.336-4.992-1.516-1.16-0.18-2.32-0.085-3.3 0h-0.267c-0.627 0-1.96 0.267-3.747 0.98-0.623 0.271-0.98 0.448-0.98 0.448s1.336-1.336 4.28-2.049l-0.18-0.18c0 0-2.229-0.085-4.636 1.693 0 0-2.407 4.192-2.407 9.36 0 0 1.333 2.32 4.991 2.408 0 0 0.533-0.711 1.073-1.336-2.053-0.624-2.853-1.872-2.853-1.872s0.179 0.088 0.447 0.267h0.080c0.040 0 0.059 0.020 0.080 0.040v0.008c0.021 0.021 0.040 0.040 0.080 0.040 0.44 0.181 0.88 0.36 1.24 0.533 0.621 0.269 1.42 0.537 2.4 0.715 1.24 0.18 2.661 0.267 4.28 0 0.8-0.18 1.6-0.356 2.4-0.713 0.52-0.267 1.16-0.533 1.863-0.983 0 0-0.8 1.248-2.94 1.872 0.44 0.621 1.060 1.333 1.060 1.333 3.659-0.080 5.080-2.4 5.16-2.301 0-5.16-2.42-9.36-2.42-9.36-2.18-1.619-4.22-1.68-4.58-1.68zM19.029 13.461c0.937 0 1.693 0.8 1.693 1.78 0 0.987-0.76 1.787-1.693 1.787s-1.693-0.8-1.693-1.779c0.003-0.987 0.764-1.784 1.693-1.788zM12.972 13.461c0.933 0 1.688 0.8 1.688 1.78 0 0.987-0.76 1.787-1.693 1.787s-1.693-0.8-1.693-1.779c0-0.987 0.76-1.784 1.699-1.788z"></path> </svg> <a href="https://discord.gg/sG9cyfGPj5" class="text-value" target="_blank" title="Join my discord server">Coding paradise</a> </div> <div class="section-option text"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 96 96"> <circle fill="#36363d" stroke="#6a6a81" stroke-width="2" r="48" cy="48" cx="48"/> <clipPath id="GreasyForkCircleClip" clipPathUnits="userSpaceOnUse"> <circle fill="#000" r="47" cy="48" cx="48"/> </clipPath> <text fill="#9494b8" clip-path="url(#GreasyForkCircleClip)" text-anchor="middle" font-size="18" font-family="\'DejaVu Sans\', Verdana, Arial, \'Liberation Sans\', sans-serif" letter-spacing="-0.75" pointer-events="none" style="-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none"> <tspan x="51" y="13" textLength="57">= null;</tspan> <tspan x="56" y="35" textLength="98">function init</tspan> <tspan x="49" y="57" textLength="113">for (var i = 0;</tspan> <tspan x="50" y="79" textLength="105">XmlHttpReq</tspan> <tspan x="48" y="101" textLength="80">appendCh</tspan> </text> <path fill="#36363d" stroke="#36363d" stroke-width="4" d="M 44,29\r\n                          a6.36396,6.36396 0,0,1 0,9\r\n                          l36,36\r\n                          a3.25,3.25 0,0,1 -6.5,6.5\r\n                          l-36,-36\r\n                          a6.36396,6.36396 0,0,1 -9,0\r\n                          l-19,-19\r\n                          a1.76777,1.76777 0,0,1 0,-2.5\r\n                          l13.0,-13\r\n                          a1.76777,1.76777 0,0,1 2.5,0\r\n                          z"/> <path fill="#9494b8" d="M 44,29\r\n                          a6.36396,6.36396 0,0,1 0,9\r\n                          l36,36\r\n                          a3.25,3.25 0,0,1 -6.5,6.5\r\n                          l-36,-36\r\n                          a6.36396,6.36396 0,0,1 -9,0\r\n                          l-19,-19\r\n                          a1.76777,1.76777 0,0,1 2.5,-2.5\r\n                          l14,14 4,-4 -14,-14\r\n                          a1.76777,1.76777 0,0,1 2.5,-2.5\r\n                          l14,14 4,-4 -14,-14\r\n                          a1.76777,1.76777 0,0,1 2.5,-2.5\r\n                          z"/> </svg> <a href="https://greasyfork.org/en/users/919633" class="text-value" target="_blank" title="Please support this script on greasyfork">Dsync client</a> </div> </div> </div> </div> </div>';
        var Credits = Credits_code;
        var styles = '@import"https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap";header{background:#2f2f31;color:#76689a;padding:5px 10px;display:flex;justify-content:flex-start;align-items:center}header #version{align-self:flex-end;color:#9787bd;font-size:.5em;font-weight:600;margin-left:10px}header #version svg{fill:#9787bd}header .icon{margin-left:auto;width:35px;height:35px;fill:#cebcb4;transition:fill 100ms;cursor:pointer}header .icon:hover{fill:#ffe7dc}#navbar-container{display:flex;flex-direction:column;padding:10px;margin-right:10px;background:#2f2f31}#navbar-container .open-menu{outline:none;border:none;cursor:pointer;font-weight:900;font-size:1.4rem;padding:10px;background:#313135;color:#ffe7dc;border-right:1px solid;border-right-color:rgba(0,0,0,0);transition:background 100ms,color 100ms,border-right-color 100ms}#navbar-container .open-menu:hover{background:#313135}#navbar-container .open-menu:active{background:#ffe7dc;color:#313135}#navbar-container .open-menu.active{pointer-events:none;background:#313135;border-right-color:#ffe7dc}#navbar-container .bottom-align{margin-bottom:0px;margin-top:auto !important}@-webkit-keyframes appear{from{opacity:0}to{opacity:1}}@-webkit-keyframes disappear{from{opacity:1}to{opacity:0}}@-webkit-keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}@keyframes appear{from{opacity:0}to{opacity:1}}@keyframes disappear{from{opacity:1}to{opacity:0}}@keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}.menu-page{display:none;background:#2f2f31;padding:10px;padding-top:0px}.menu-page.opened{display:block;animation:appear 300ms forwards}.menu-page h1{color:#76689a;font-size:1.5em;font-weight:900}.menu-page h2{color:#9494b8;font-size:1em;font-weight:900}.menu-page p{color:#675a86;font-size:.5em;font-weight:700}.menu-page .content{display:flex;justify-content:space-between;align-items:center;gap:10px}.menu-page .content-double{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;width:250px}.menu-page .content-double button{width:48%}.menu-page .content-double:nth-child(3){width:100%}.menu-page #killMessage{width:270px}.menu-page .highlight{font-weight:700;color:#ffe7dc;background:#6a6a81;padding:0 1px}.menu-page .section{background:#36363d;border-radius:5px;margin:20px 0}.menu-page .section:last-child{margin-bottom:0px}.menu-page .section .section-title{display:flex;justify-content:space-between;align-items:center;padding:10px}.menu-page .section .section-title .icon{width:25px;height:25px;margin-right:10px;fill:#cebcb4;transition:fill 100ms,transform 100ms}.menu-page .section .section-title .icon.rotate{transform:rotate(90deg);fill:#ffe7dc}.menu-page .section .section-title:hover .icon{fill:#ffe7dc}.menu-page .section:not(.opened) .section-title{cursor:pointer}.menu-page .section:not(.opened) .section-content{overflow:hidden}.menu-page .section .section-content{padding:10px;padding-top:0px;display:grid;grid-template-columns:1fr 1fr;transition:max-height 250ms cubic-bezier(0, 1, 0, 1);max-height:0px}.menu-page .section .section-content.one-row{grid-template-columns:1fr}.menu-page .section .section-content.opened{transition:max-height 250ms ease-out;max-height:100%}.menu-page .section .section-content .split{grid-column:1/3;margin-top:10px;background:#40404a;height:2px}.menu-page .section .section-content .section-option{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.menu-page .section .section-content .section-option .icon{width:35px;height:35px;fill:#6a6a81}.menu-page .section .section-content .section-option.centered{justify-content:center}.menu-page .section .section-content .section-option.text{justify-content:flex-start;gap:10px}.menu-page .section .section-content .section-option.text .text-value{font-size:.7em;color:#9494b8}.menu-page .section .section-content .section-option .section-option-title{color:#6a6a81;font-size:.8em}.menu-page .section .section-content .section-option .section-option-hotkeyInput{margin-right:50px;cursor:pointer;font-weight:900;font-size:.6em;padding-bottom:8px;outline:none;border:none;text-align:center;width:80px;height:35px;border-radius:7.5px;background:#7d7d9b;color:#adbcd8;box-shadow:0px -6px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .section-option-hotkeyInput.red{background:#9e5454;color:#d8adad;box-shadow:0px -6px 0px 0px #783d3d inset}.menu-page .section .section-content .section-option .section-option-hotkeyInput:not([id]){cursor:not-allowed}.menu-page .section .section-content .section-option .section-option-hotkeyInput.smaller{font-size:.41em}.menu-page .section .section-content .section-option .switch-checkbox{position:relative;margin-right:25px;width:70px;height:25px}.menu-page .section .section-content .section-option .switch-checkbox input{width:0;height:0;opacity:0}.menu-page .section .section-content .section-option .switch-checkbox input:checked+span{background:#7d7d9b;box-shadow:0px 5px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .switch-checkbox input:checked+span:before{background:#ffe7dc;transform:translateX(42px)}.menu-page .section .section-content .section-option .switch-checkbox span{position:absolute;cursor:pointer;top:0;left:0;bottom:0;right:0;width:100%;height:100%;display:flex;align-items:center;background:#5f5f79;box-shadow:0px 5px 0px 0px #4d4d5f inset;border-radius:10px;transition:all 100ms ease-in-out}.menu-page .section .section-content .section-option .switch-checkbox span:before{position:absolute;content:"";width:28px;height:28px;border-radius:50%;background:#f0dcd3;box-shadow:0px -5px 0px 0px #cebcb4 inset;border:2px solid #adbcd8;transition:all 100ms ease-in-out}.menu-page .section .section-content .section-option .slider{position:relative;margin-right:45px}.menu-page .section .section-content .section-option .slider input{-webkit-appearance:none;outline:none;cursor:pointer;width:154px;height:20.8333333333px;border-radius:10px;background:#7d7d9b;box-shadow:0px 5px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .slider input::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:#ffe7dc;box-shadow:0px -5px 0px 0px #cebcb4 inset;border:2px solid #adbcd8}.menu-page .section .section-content .section-option .slider .slider-value{position:absolute;margin-left:5px;color:#6a6a81;font-size:.65em}.menu-page .section .section-content .section-option .input{outline:none;border:none;font-weight:900;text-align:center;width:130px;height:35px;padding-bottom:6px;border-radius:7.5px;background:#7d7d9b;color:#adbcd8;box-shadow:0px -6px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .input:focus{border:3px solid #f0dcd3}.menu-page .section .section-content .section-option .button{outline:none;border:none;font-weight:900;cursor:pointer;height:40px;padding-bottom:6px;border-radius:7.5px;background:#7d7d9b;color:#adbcd8;box-shadow:0px -6px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .button:active{padding-bottom:0px;padding-top:3px;box-shadow:0px 3px 0px 0px #68687c inset}.menu-page .section .section-content .section-option .button.red{background:#9e5454;color:#d8adad;box-shadow:0px -6px 0px 0px #783d3d inset}.menu-page .section .section-content .section-option .button.red:active{box-shadow:0px 3px 0px 0px #783d3d inset}.menu-page .section .section-content .section-option .button.width{width:9em;font-size:.6em}.menu-page .section .section-content .section-option .form-upload{position:relative;font-size:.55em;font-weight:400;letter-spacing:1.5px;text-align:center;width:100%;border-radius:5px;border:2px dashed;border-color:rgba(173,188,216,.5411764706);padding:15px 10px;transition:border-color 100ms}.menu-page .section .section-content .section-option .form-upload:hover{border-color:#adbcd8}.menu-page .section .section-content .section-option .form-upload.red{border-color:#9e5454;animation:failedTransition 400ms}.menu-page .section .section-content .section-option .form-upload.red .light{color:#d8adad}.menu-page .section .section-content .section-option .form-upload.green{border-color:#77c468}.menu-page .section .section-content .section-option .form-upload.green .light{color:#a1dda1}.menu-page .section .section-content .section-option .form-upload input{position:absolute;opacity:0;top:0;left:0;bottom:0;right:0;width:100%;height:100%;cursor:pointer}.menu-page .section .section-content .section-option .form-upload .light{color:#adbcd8}.menu-page .section .section-content .section-option .form-upload .light-extra{color:#f0dcd3}.menu-page .section .section-content .section-option .tooltip{position:relative;margin-left:5px;color:#8181a0}.menu-page .section .section-content .section-option .tooltip:hover{cursor:pointer}.menu-page .section .section-content .section-option .tooltip:hover .tooltip-text{visibility:visible}.menu-page .section .section-content .section-option .tooltip .tooltip-text{position:absolute;visibility:hidden;text-align:center;overflow:visible;bottom:calc(100% - 5px);left:50%;transform:translateX(-50%);background-color:#7d7d9b;color:#ffe7dc;width:225px;font-size:13px;font-weight:600;padding:5px;border-radius:5px;border:3px solid #5f5f79}.menu-page .section .section-content .section-option .tooltip .tooltip-text.left{text-align:left}@-webkit-keyframes appear{from{opacity:0}to{opacity:1}}@-webkit-keyframes disappear{from{opacity:1}to{opacity:0}}@-webkit-keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}@keyframes appear{from{opacity:0}to{opacity:1}}@keyframes disappear{from{opacity:1}to{opacity:0}}@keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}@-webkit-keyframes appear{from{opacity:0}to{opacity:1}}@-webkit-keyframes disappear{from{opacity:1}to{opacity:0}}@-webkit-keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}@keyframes appear{from{opacity:0}to{opacity:1}}@keyframes disappear{from{opacity:1}to{opacity:0}}@keyframes failedTransition{0%{transform:translate(0px, 0px)}10%{transform:translate(-35px, -10px)}30%{transform:translate(25px, 8px)}50%{transform:translate(-15px, -6px)}70%{transform:translate(5px, 4px)}100%{transform:translate(0px, 0px)}}html,body{margin:0;padding:0;background:rgba(0,0,0,0) !important;scrollbar-width:10px;scrollbar-track-color:#36363d;scrollbar-face-color:#494955}*{font-family:"Lato",sans-serif}h1,h2,h3,h4,p{margin:0}#menu-container{font-weight:900;font-size:2rem;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:1024px;height:700px;display:flex;justify-content:center;align-items:center;user-select:none}#menu-container.open{animation:appear 100ms forwards}#menu-container.close{animation:disappear 100ms forwards}#menu-container.transparent #menu-wrapper{background:rgba(43,43,44,.4666666667)}#menu-container.transparent #navbar-container{background:rgba(47,47,49,.6431372549)}#menu-container.transparent .menu-page{background:rgba(47,47,49,.6431372549)}#menu-container.transparent .section{background:rgba(54,54,61,.6509803922)}#menu-wrapper{display:flex;flex-direction:column;width:100%;height:80%;background:#2b2b2c;border-radius:5px;padding:10px}main{display:flex;justify-content:space-between;margin-top:10px;height:100%}main #menu-page-container{width:100%;height:500px;overflow-y:scroll}.default-color{outline:none;border:none;width:10px;height:10px;border-radius:100%;cursor:pointer}input[id][type=color]{outline:none;border:none;padding:0 1px;margin:0;height:24px;background-color:#7d7d9b;border-radius:5px;cursor:pointer}::-webkit-scrollbar{width:10px}::-webkit-scrollbar-track{background:#36363d;border-radius:10px}::-webkit-scrollbar-thumb{background:#494955;border-radius:10px}';
        var createMenu_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        const createMenu = () => {
            const IFRAME_CONTENT = `\n        <style>${styles}</style>\n        <div id="menu-container" class="open">\n            <div id="menu-wrapper">\n                ${Header}\n\n                <main>\n                    ${Navbar}\n\n                    <div id="menu-page-container">\n                        ${Keybinds}\n                        ${Combat}\n                        ${Visuals}\n                        ${Misc}\n                        ${Credits}\n                    </div>\n                </main>\n            </div>\n        </div>\n    `;
            const IFRAME_STYLE = `\n        #iframe-page-container {\n            position: absolute;\n            top: 0;\n            left: 0;\n            bottom: 0;\n            right: 0;\n            width: 100%;\n            height: 100%;\n            margin: 0;\n            padding: 0;\n            z-index: 99;\n            border: none;\n            outline: none;\n            overflow: scroll;\n            display: none;\n        }\n\n        .iframe-opened {\n            display: block!important;\n        }\n    `;
            const IFRAME = document.createElement("iframe");
            const blob = new Blob([ IFRAME_CONTENT ], {
                type: "text/html; charset=utf-8"
            });
            IFRAME.src = URL.createObjectURL(blob);
            IFRAME.id = "iframe-page-container";
            document.body.appendChild(IFRAME);
            const style = document.createElement("style");
            style.innerHTML = IFRAME_STYLE;
            document.head.appendChild(style);
            IFRAME.onload = () => {
                const iframeWindow = IFRAME.contentWindow;
                const iframeDocument = iframeWindow.document;
                URL.revokeObjectURL(IFRAME.src);
                const menuContainer = iframeDocument.getElementById("menu-container");
                const openMenu = iframeDocument.querySelectorAll(".open-menu");
                const menuPage = iframeDocument.querySelectorAll(".menu-page");
                const sections = iframeDocument.querySelectorAll(".section");
                const hotkeyInputs = iframeDocument.querySelectorAll(".section-option-hotkeyInput[id]");
                const closeMenu = iframeDocument.querySelector("#close-menu");
                const checkboxs = iframeDocument.querySelectorAll("input[type='checkbox'][id]");
                const sliders = iframeDocument.querySelectorAll("input[type='range'][id]");
                const headerVersion = iframeDocument.querySelector("#version > span");
                const autochatInputs = iframeDocument.querySelectorAll(".input.autochat");
                const killMessage = iframeDocument.querySelector("#killMessage");
                const resetSettings = iframeDocument.querySelector("#reset-settings");
                const downloadSettings = iframeDocument.querySelector("#download-settings");
                const uploadSettings = iframeDocument.querySelector("#upload-settings");
                const menuTransparency = iframeDocument.querySelector("#menuTransparency");
                const colorPickers = iframeDocument.querySelectorAll("input[type='color'][id]");
                const update = () => {
                    for (const picker of colorPickers) {
                        const resetColor = picker.previousElementSibling;
                        if (resetColor) {
                            const defaultColor = defaultSettings[picker.id];
                            resetColor.style.backgroundColor = defaultColor;
                            resetColor.onclick = () => {
                                picker.value = defaultColor;
                                Settings[picker.id] = defaultColor;
                                storage.set("Dsync-settings", Settings);
                            };
                        }
                        picker.value = Settings[picker.id];
                        picker.onchange = () => {
                            Settings[picker.id] = picker.value;
                            storage.set("Dsync-settings", Settings);
                            picker.blur();
                        };
                    }
                    menuContainer.classList[Settings.menuTransparency ? "add" : "remove"]("transparent");
                    killMessage.value = Settings.killMessage;
                    killMessage.onchange = () => {
                        Settings.killMessage = killMessage.value;
                        storage.set("Dsync-settings", Settings);
                        killMessage.blur();
                    };
                    for (let i = 0; i < autochatInputs.length; i++) {
                        const input = autochatInputs[i];
                        input.value = Settings.autochatMessages[i] || "";
                        input.onchange = () => {
                            Settings.autochatMessages[i] = input.value;
                            storage.set("Dsync-settings", Settings);
                            input.blur();
                        };
                    }
                    headerVersion.textContent = "v" + Dsync.version;
                    for (const slider of sliders) {
                        const sliderValue = slider.nextElementSibling;
                        slider.value = Settings[slider.id];
                        if (sliderValue) {
                            sliderValue.textContent = slider.value;
                        }
                        slider.oninput = () => {
                            const value = Number(slider.value) % 5;
                            slider.value -= value;
                            if (sliderValue) {
                                sliderValue.textContent = slider.value;
                            }
                            Settings[slider.id] = Number(slider.value);
                            storage.set("Dsync-settings", Settings);
                        };
                    }
                    for (const checkbox of checkboxs) {
                        checkbox.checked = Settings[checkbox.id];
                        checkbox.onchange = () => {
                            Settings[checkbox.id] = checkbox.checked;
                            storage.set("Dsync-settings", Settings);
                            checkbox.blur();
                        };
                    }
                    Dsync.toggleMenu = () => {
                        menuContainer.classList.toggle("close");
                        menuContainer.classList.toggle("open");
                        setTimeout((() => {
                            IFRAME.classList.toggle("iframe-opened");
                        }), 100);
                    };
                    closeMenu.onclick = Dsync.toggleMenu;
                    for (let i = 0; i < openMenu.length; i++) {
                        openMenu[i].onclick = () => {
                            removeClass(openMenu, "active");
                            openMenu[i].classList.add("active");
                            removeClass(menuPage, "opened");
                            menuPage[i].classList.add("opened");
                        };
                    }
                    for (const section of sections) {
                        const title = section.children[0];
                        const content = section.children[1];
                        if (!title || !content) continue;
                        if (contains(section, "opened")) {
                            content.classList.add("opened");
                            continue;
                        }
                        content.style.display = "none";
                        title.onclick = () => {
                            if (!content.classList.contains("opened")) {
                                content.style.display = "grid";
                            } else {
                                setTimeout((() => {
                                    content.style.display = "none";
                                }), 100);
                            }
                            setTimeout((() => {
                                content.classList.toggle("opened");
                                title.children[1].classList.toggle("rotate");
                            }), 0);
                        };
                    }
                    for (const hotkeyInput of hotkeyInputs) {
                        try {
                            hotkeyInput.textContent = formatCode(Settings[hotkeyInput.id]);
                        } catch (err) {
                            throw new Error(hotkeyInput.id + " doesn't exist in settings");
                        }
                    }
                    checkForRepeats();
                };
                menuTransparency.addEventListener("change", (() => {
                    menuContainer.classList[menuTransparency.checked ? "add" : "remove"]("transparent");
                }));
                resetSettings.onclick = () => {
                    Object.assign(Settings, defaultSettings);
                    storage.set("Dsync-settings", Settings);
                    update();
                };
                downloadSettings.onclick = () => {
                    download(Settings, "DsyncSettings" + Dsync.version);
                };
                uploadSettings.onchange = event => createMenu_awaiter(void 0, void 0, void 0, (function*() {
                    const target = event.target;
                    const parent = uploadSettings.parentElement;
                    const spanText = parent.children[1];
                    parent.classList.remove("red");
                    parent.classList.remove("green");
                    try {
                        const text = yield target.files[0].text();
                        const sets = JSON.parse(text);
                        if (Object.keys(sets).every((key => defaultSettings.hasOwnProperty(key)))) {
                            Object.assign(Settings, sets);
                            storage.set("Dsync-settings", Settings);
                            update();
                            parent.classList.add("green");
                            spanText.innerHTML = `SETTINGS LOADED SUCCESSFULLY`;
                        } else {
                            throw new Error("Invalid settings");
                        }
                    } catch (err) {
                        parent.classList.add("red");
                        spanText.innerHTML = "SETTINGS ARE NOT VALID, TRY ANOTHER";
                    }
                }));
                const checkForRepeats = () => {
                    const list = new Map;
                    for (const hotkeyInput of hotkeyInputs) {
                        const value = Settings[hotkeyInput.id];
                        const [count, inputs] = list.get(value) || [ 0, [] ];
                        list.set(value, [ (count || 0) + 1, [ ...inputs, hotkeyInput ] ]);
                        hotkeyInput.classList.remove("red");
                    }
                    for (const data of list) {
                        const [number, hotkeyInputs] = data[1];
                        if (number === 1) continue;
                        for (const hotkeyInput of hotkeyInputs) {
                            hotkeyInput.classList.add("red");
                        }
                    }
                };
                Dsync.active = null;
                const applyCode = code => {
                    if (!Dsync.active) return;
                    const key = code === "Backspace" ? "..." : formatCode(code);
                    Settings[Dsync.active.id] = code === "Backspace" ? "..." : code;
                    Dsync.active.textContent = key;
                    storage.set("Dsync-settings", Settings);
                    Dsync.active = null;
                    checkForRepeats();
                };
                menuContainer.addEventListener("keyup", (event => {
                    if (event.keyCode < 5 || !Dsync.active) return;
                    applyCode(event.code);
                }));
                menuContainer.addEventListener("mouseup", (event => {
                    const target = event.target;
                    if (Dsync.active) return applyCode(event.button);
                    if (!contains(target, "section-option-hotkeyInput") || !target.id) return;
                    target.textContent = "Wait...";
                    Dsync.active = target;
                }));
                iframeWindow.addEventListener("keydown", (event => handleKeydown(event, event.code)));
                iframeWindow.addEventListener("keyup", (event => handleKeyup(event, event.code)));
                const resize = () => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    const scale = Math.min(1, Math.min(width / 1024, height / 700));
                    menuContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
                };
                resize();
                window.addEventListener("resize", resize);
                setTimeout((() => IFRAME.classList.add("iframe-opened")), 0);
                iframeWindow.addEventListener("contextmenu", (event => event.preventDefault()));
                iframeWindow.addEventListener("mousedown", (event => 1 === event.button && event.preventDefault()));
                iframeWindow.addEventListener("mouseup", (event => [ 3, 4 ].includes(event.button) && event.preventDefault()));
                window.addEventListener("mouseup", (event => [ 3, 4 ].includes(event.button) && event.preventDefault()));
                update();
            };
        };
        var modules_createMenu = createMenu;
        const ANY_LETTER = "(?:[^\\x00-\\x7F-]|\\$|\\w)";
        const NumberSystem = [ {
            radix: 2,
            prefix: "0b0*"
        }, {
            radix: 8,
            prefix: "0+"
        }, {
            radix: 10,
            prefix: ""
        }, {
            radix: 16,
            prefix: "0x0*"
        } ];
        var Template;
        (function(Template) {
            Template[Template["APPEND"] = 0] = "APPEND";
            Template[Template["PREPEND"] = 1] = "PREPEND";
        })(Template || (Template = {}));
        class Regex {
            constructor(code, unicode) {
                this.code = code;
                this.COPY_CODE = code;
                this.unicode = unicode || false;
                this.hooks = {};
            }
            static parseValue(value) {
                try {
                    return Function(`return (${value})`)();
                } catch (err) {
                    return null;
                }
            }
            isRegexp(value) {
                return TYPEOF(value) === "regexp";
            }
            generateNumberSystem(int) {
                const copy = [ ...NumberSystem ];
                const template = copy.map((({prefix: prefix, radix: radix}) => prefix + int.toString(radix)));
                return `(?:${template.join("|")})`;
            }
            parseVariables(regex) {
                regex = regex.replace(/\{VAR\}/g, "(?:let|var|const)");
                regex = regex.replace(/\{QUOTE\}/g, "['\"`]");
                regex = regex.replace(/ARGS\{(\d+)\}/g, ((...args) => {
                    let count = Number(args[1]), arr = [];
                    while (count--) arr.push("\\w+");
                    return arr.join("\\s*,\\s*");
                }));
                regex = regex.replace(/NUMBER\{(\d+)\}/g, ((...args) => {
                    const int = Number(args[1]);
                    return this.generateNumberSystem(int);
                }));
                return regex;
            }
            format(name, inputRegex, flags) {
                let regex = null;
                if (Array.isArray(inputRegex)) {
                    regex = inputRegex.map((exp => this.isRegexp(exp) ? exp.source : exp)).join("\\s*");
                } else if (this.isRegexp(inputRegex)) {
                    regex = inputRegex.source;
                }
                regex = this.parseVariables(regex);
                if (this.unicode) {
                    regex = regex.replace(/\\w/g, ANY_LETTER);
                }
                const expression = new RegExp(regex.replace(/\{INSERT\}/, ""), flags);
                const match = this.code.match(expression);
                if (match === null) throw new Error("Failed to find: " + name);
                return regex.includes("{INSERT}") ? new RegExp(regex, flags) : expression;
            }
            template(type, name, regex, substr) {
                const expression = new RegExp(`(${this.format(name, regex).source})`);
                this.code = this.code.replace(expression, type === Template.APPEND ? "$1" + substr : substr + "$1");
            }
            match(name, regex, flags, debug = false) {
                const expression = this.format(name, regex, flags);
                const match = this.code.match(expression);
                this.hooks[name] = {
                    expression: expression,
                    match: match
                };
                if (debug) log(name, this.hooks[name]);
                return match;
            }
            matchAll(name, regex, flags, debug = false) {
                const expression = this.format(name, regex, flags);
                const matches = this.code.matchAll(expression);
                this.hooks[name] = {
                    expression: expression,
                    match: [ ...matches ]
                };
                if (debug) log(name, this.hooks[name]);
                return matches;
            }
            replace(name, regex, substr, flags) {
                const expression = this.format(name, regex, flags);
                this.code = this.code.replace(expression, substr);
            }
            append(name, regex, substr) {
                this.template(Template.APPEND, name, regex, substr);
            }
            prepend(name, regex, substr) {
                this.template(Template.PREPEND, name, regex, substr);
            }
            insert(name, regex, substr) {
                const {source: source} = this.format(name, regex);
                if (!source.includes("{INSERT}")) throw new Error("Your regexp must contain {INSERT} keyword");
                const findExpression = new RegExp(source.replace(/^(.*)\{INSERT\}(.*)$/, "($1)($2)"));
                this.code = this.code.replace(findExpression, `$1${substr}$2`);
            }
        }
        var modules_Regex = Regex;
        let kills = 0;
        const stringMessage = data => {
            const [id] = data;
            if (id === WebsocketString.SPAWN && Settings.lastHat) {
                equipHat(Dsync.actualHat, true);
            }
            if (id === WebsocketString.DIED) {
                Controller_reset();
                kills = 0;
                if (Settings.autospawn) {
                    spawn();
                }
            }
            if (id === WebsocketString.KILLUPDATE) {
                kills = data[1][0];
            }
            if (Settings.kill && id === WebsocketString.KILLED) {
                const killMessage = Settings.killMessage.length ? Settings.killMessage : "{KILL}x";
                const name = data[1].replace(/^Killed\s/, "").trim();
                const message = killMessage.replace(/\{KILL\}/g, kills + "").replace(/\{NAME\}/g, name);
                Dsync.chat(message);
            }
        };
        var hooks_stringMessage = stringMessage;
        const drawItemBar = (ctx, imageData, index) => {
            if (!Settings.itemCounter) return;
            const itemId = itemBar(index);
            const itemType = Dsync.itemData[itemId][Dsync.props.itemType];
            const currentCount = Dsync.defaultData[Dsync.props.currentCount][itemType];
            const maxCount = Dsync.maxCount[itemType];
            if (maxCount === 0) return;
            const x = imageData[Dsync.props.x] - 10;
            const y = imageData[Dsync.props.y] + 10;
            const w = imageData.width;
            renderText(ctx, `${currentCount}/${maxCount}`, ((width, height) => [ x + w - width, y ]), {
                font: "bold 16px Montserrat"
            });
        };
        var hooks_drawItemBar = drawItemBar;
        const drawEntityInfo = (target, ctx, isTeammate) => {
            const entity = formatEntity(target);
            const id = Dsync.myPlayerID();
            if (id === entity.id) {
                if (Settings.rainbow) {
                    Dsync.hsl = (Dsync.hsl + .3) % 360;
                }
                if (Dsync.aimTarget) {
                    const aimTarget = formatEntity(Dsync.aimTarget);
                    Dsync.target[Dsync.props.angle] = getAngle(aimTarget, entity).lerpAngle;
                }
            }
            drawHealth(ctx, entity);
            if (target.oldId) {
                if (Settings.hatReloadBar && entity.type === 0) {
                    drawBar(ctx, entity, target.hatReload, 1300, Settings.hatReloadBarColor);
                }
                if (Settings.fireballReloadBar && entity.type === ELayer.DRAGON) {
                    drawBar(ctx, entity, target.fireballReload, 3e3, Settings.fireballReloadBarColor);
                }
            }
            if (Settings.drawID && entity.type === 0) {
                const front = utils_Images.gaugeFront;
                const w = front.width * .5;
                const h = front.height * .5;
                renderText(ctx, entity.id.toString(), ((width, height) => [ entity.x + w / 2 + 5, entity.y - h + (entity.radius + 50) + 5 ]), {
                    font: "bold 14px Montserrat",
                    textBaseline: "top"
                });
            }
            if (id === entity.id || Dsync.myPlayer === null) return;
            if (Settings.possibleShots && !isTeammate) {
                const entityHit = projectileCanHitEntity(entity);
                if (typeof entityHit === "object" && entityHit.canHit && !entityHit.needDestroy) {
                    const color = Settings.rainbow ? `hsl(${Dsync.hsl}, 100%, 50%)` : getTracerColor(entity, isTeammate);
                    crosshair(ctx, entity.x, entity.y, entity.angle, color, 20, 8, 18);
                }
            }
            if (Settings.enemyTracers && entity.type === 0 && !isTeammate || Settings.teammateTracers && entity.type === 0 && isTeammate || Settings.animalTracers && entity.type !== 0) {
                drawTracers(ctx, entity, isTeammate);
            }
        };
        var hooks_drawEntityInfo = drawEntityInfo;
        const zoomHandler = () => {
            let canZoom = true;
            let wheels = 0;
            const scaleFactor = 150;
            const zoomLoop = () => {
                const {w: w, h: h, w2: w2, h2: h2} = Dsync.scale;
                const wx = Math.abs(w[0] - w2);
                const hy = Math.abs(h[0] - h2);
                if (wx < 3 || hy < 3) {
                    canZoom = true;
                    return;
                }
                w[0] = lerp(w[0], w2, .175);
                h[0] = lerp(h[0], h2, .175);
                window.dispatchEvent(new Event("resize"));
                setTimeout(zoomLoop, 0);
            };
            window.addEventListener("wheel", (event => {
                if (!(event.target instanceof HTMLCanvasElement) || event.ctrlKey || event.shiftKey || event.altKey || isInput() || !inGame()) return;
                const scale = Dsync.scale;
                const {w: w, h: h, w2: w2, h2: h2} = scale;
                if (w2 === 1824 && h2 === 1026 && (wheels = (wheels + 1) % 5) !== 0) return;
                const zoom = !Settings.reverseZoom && event.deltaY > 0 || Settings.reverseZoom && event.deltaY < 0 ? -scaleFactor : scaleFactor;
                scale.w2 = Math.max(924, w2 + zoom);
                scale.h2 = Math.max(126, h2 + zoom);
                if (Settings.smoothZoom) {
                    if (canZoom) {
                        canZoom = false;
                        zoomLoop();
                    }
                    return;
                }
                w[0] = scale.w2;
                h[0] = scale.h2;
                window.dispatchEvent(new Event("resize"));
            }));
        };
        var modules_zoomHandler = zoomHandler;
        const drawItems = (target, id, ctx, step) => {
            const object = formatObject(target);
            if (object.ownerID === 0) return;
            if (Settings.turretReloadBar && object.type === ELayer.TURRET && target.turretReload !== undefined) {
                drawBar(ctx, Object.assign(Object.assign({}, object), {
                    x: 0,
                    y: 0
                }), target.turretReload, 3e3, Settings.turretReloadBarColor);
            }
            const color = getMarkerColor(target, object.ownerID) || "red";
            if (color === null) return;
            marker(ctx, color);
            windmillRotation(target);
        };
        var drawitems = drawItems;
        let toggleClown = false;
        let toggleScuba = false;
        let playerHealth = 100;
        const updatePlayer = target => {
            const entity = formatEntity(target);
            const player = formatPlayer(target);
            if (entity.type === 0) {
                if (player.id === Dsync.myPlayerID()) {
                    Dsync.myPlayer = Object.assign(Object.assign({}, Dsync.myPlayer), player);
                    if (Settings.skipUpgrades) {
                        const upgradeBar = Dsync.defaultData[Dsync.props.upgradeBar];
                        if (upgradeBar.length === 1) {
                            Dsync.upgradeItem(upgradeBar[0]);
                        }
                    }
                    const {x2: x2, y2: y2, angle2: angle2, health: health, maxHealth: maxHealth, isClown: isClown, hat: hat, oldHat: oldHat} = Dsync.myPlayer;
                    const inTornado = entityIn(Dsync.myPlayer, ELayer.TORNADO);
                    const diff = Math.abs(health - playerHealth);
                    const restore = Dsync.defaultData[Dsync.props.itemBar].includes(12) ? 35 : 20;
                    let times = 0;
                    if (Settings.autoheal && health < maxHealth - (inTornado ? restore - 5 : 10) && !isClown && (diff > 3 || diff === 0)) {
                        playerHealth = health;
                        times = Math.max(1, Math.ceil((maxHealth - health) / restore));
                        setTimeout((() => {
                            for (let i = 0; i <= times; i++) place(EItems.HEAL);
                        }), Settings.autohealDelay);
                    }
                    const inRiver = y2 > 8075 && y2 < 8925;
                    const notInRiver = !(y2 > 8e3 && y2 < 9e3);
                    if (Settings.autoScuba && inRiver && !toggleScuba) {
                        toggleScuba = true;
                        Dsync.myPlayer.oldHat = hat;
                        equipHat(EHats.SCUBA, false, false);
                    }
                    if (toggleScuba && notInRiver) {
                        equipHat(oldHat);
                        toggleScuba = false;
                    }
                    if (Settings.jungleOnClown && isClown && hat !== EHats.JUNGLE && !toggleClown) {
                        toggleClown = true;
                        Dsync.myPlayer.oldHat = fastBreaking ? fastBreakHat : hat;
                        equipHat(EHats.JUNGLE, false, false);
                    }
                    if (!isClown && toggleClown) {
                        equipHat(oldHat);
                        toggleClown = false;
                    }
                    if (Settings.autochat) autochat();
                }
                if (Settings.hatReloadBar) {
                    if (target.oldId !== player.id) {
                        target.oldId = player.id;
                        target.oldHat = player.hat;
                        target.hatReload = 1300;
                    }
                    if (target.oldHat !== player.hat) {
                        target.oldHat = player.hat;
                        target.hatReload = 0;
                    }
                    target.hatReload = Math.min(target.hatReload + Dsync.step, 1300);
                }
            } else {
                if (Settings.fireballReloadBar && entity.type === ELayer.DRAGON) {
                    const fireballs = Dsync.entityList()[ELayer.FIREBALL].map((object => {
                        const fireball = formatEntity(object);
                        return distance(entity, fireball).dist;
                    }));
                    const total = fireballs.reduce(((total, int) => total + int), 0);
                    const reload = 2900;
                    if (target.oldId !== entity.id) {
                        target.oldId = entity.id;
                        target.total = total;
                        target.fireballReload = reload;
                    }
                    if ((fireballs.length === 5 && total < 600 || fireballs.length === 1 && total < 100) && target.fireballReload === reload) {
                        target.total = total;
                        target.fireballReload = 0;
                    }
                    target.fireballReload = Math.min(target.fireballReload + Dsync.step, reload);
                }
                if (Settings.turretReloadBar && entity.type === ELayer.TURRET) {
                    const projectile = Dsync.entityList()[ELayer.PROJECTILE].find((object => {
                        const bullet = formatProjectile(object);
                        return bullet.ownerID === entity.ownerID && entity.angle2 === bullet.angle2;
                    }));
                    if (target.turretReload === undefined) {
                        target.turretReload = 3e3;
                    }
                    if (projectile) {
                        const bullet = formatProjectile(projectile);
                        if (bullet && target.bulletID !== bullet.id) {
                            target.bulletID = bullet.id;
                            target.turretReload = 0;
                        }
                    }
                    target.turretReload = Math.min(target.turretReload + Dsync.step, 3e3);
                }
            }
        };
        var hooks_updatePlayer = updatePlayer;
        const renderLayers = (ctx, now) => {
            const entities = Dsync.entityList();
            for (let i = 0; i < Dsync.itemList.length; i++) {
                const id = Dsync.itemList[i];
                for (let j = 0; j < entities[id].length; j++) {
                    const target = entities[id][j];
                    const object = formatObject(target);
                    if (object.ownerID === 0) continue;
                    if (Settings.turretReloadBar && target.type === ELayer.TURRET && target.turretReload !== undefined) {
                        drawBar(ctx, object, target.turretReload, 3e3, Settings.turretReloadBarColor);
                    }
                    const color = getMarkerColor(target, object.ownerID);
                    if (color === null) continue;
                    ctx.save();
                    ctx.translate(object.x + target.dirX, object.y + target.dirY);
                    marker(ctx, color);
                    ctx.restore();
                    windmillRotation(target);
                }
            }
        };
        var hooks_renderLayers = renderLayers;
        let start = Date.now();
        const moveUpdate = () => {
            const now = Date.now();
            Dsync.step = now - start;
            start = now;
        };
        var hooks_moveUpdate = moveUpdate;
        const version = __webpack_require__(147).i8;
        const log = console.log;
        window.log = log;
        window.Dsync = {
            props: {},
            hooks: {},
            settings: Settings,
            myPlayer: null,
            target: null,
            hsl: 0,
            version: version,
            actualHat: 0,
            scale: {
                w: linker(1824),
                h: linker(1026),
                w2: 1824,
                h2: 1026
            },
            itemList: [],
            mousemove: true,
            aimTarget: null,
            step: 0
        };
        const Dsync = window.Dsync;
        storage["delete"]("_adIds");
        window.eval = new Proxy(window.eval, {
            apply(target, _this, args) {
                const code = args[0];
                if (code.length > 1e5) {
                    const Hook = new modules_Regex(code, true);
                    const sendFunction = (name, fname, content = "") => {
                        Hook.prepend(name, [ `function`, fname ], `Dsync.${name}=${fname};` + content);
                    };
                    window.COPY_CODE = Hook.COPY_CODE.match(/^\((.+)\)\(.+\);$/)[1];
                    Hook.append("EXTERNAL fix", [ /\(function/, /(\w+)/, /\(/, /\w+/, /\)/, /\{/ ], `EXTERNAL.__proto__.toString=()=>COPY_CODE;`);
                    Hook.replace("Debugger fix", [ /debugger/ ], ``, "g");
                    const selectItem = Hook.match("selectItem", [ /!/, /\w+/, /\[/, /\w+/, /\]/, /&&/, /(\w+)/, /\(/, /\d/, /\)/, /,/ ])[1];
                    sendFunction("selectItem", selectItem);
                    const equipHat = Hook.match("equipHat", [ /!/, /\w+/, /\)/, /return/, /;/, /(\w+)/, /\(/, /\w+/, /\)/ ])[1];
                    sendFunction("equipHat", equipHat);
                    const chat = Hook.match("chat", [ /break/, /\}/, /(\w+)/, /\(/, /\w+/, /\)/ ])[1];
                    sendFunction("chat", chat);
                    const [, attack, getAngle] = Hook.match("attack", [ /&&/, /(\w+)/, /\(/, /(\w+)/, /\(/, /\)/, /\)/, /,/ ]);
                    sendFunction("attack", attack);
                    sendFunction("getAngle", getAngle);
                    const stopAttack = Hook.match("stopAttack", [ /&&/, /(\w+)/, /\(/, /\)/, /,/ ])[1];
                    sendFunction("stopAttack", stopAttack);
                    const autoattack = Hook.match("autoattack", [ /,/, /(\w+)/, /\(/, /\w+/, /\)/, /\)/, /\)/ ])[1];
                    sendFunction("autoattack", autoattack);
                    const move = Hook.match("move", [ /&&/, /\(/, /(\w+)/, /\(/, /\w+/, /\)/ ])[1];
                    sendFunction("move", move);
                    const createClan = Hook.match("createClan", [ /,/, /\w+/, /=>/, /\{/, /(\w+)/, /\(/, /\w+/ ])[1];
                    sendFunction("createClan", createClan);
                    const leaveClan = Hook.match("leaveClan", [ /=>/, /\{/, /(\w+)/, /\(/, /\)/, /\}/ ])[1];
                    sendFunction("leaveClan", leaveClan);
                    const kickUser = Hook.match("kickUser", [ /return/, /;/, /(\w+)/, /\(/, /\w+/, /\)/, /\}/, /:/ ])[1];
                    sendFunction("kickUser", kickUser);
                    const joinClan = Hook.match("joinClan", [ /(\w+)/, /\(/, /\w+/, /\)/, /\}/, /\}/, /\)/, /\}/, /\}/ ])[1];
                    sendFunction("joinClan", joinClan);
                    const changeAngle = Hook.match("changeAngle", [ /\w+/, /\(/, /\w+/, /\)/, /\}/, /function/, /\w+/, /\(/, /\w+/, /\)/, /\{/, /(\w+)/, /\(/, /\w+/, /\)/, /,/ ])[1];
                    sendFunction("changeAngle", changeAngle);
                    const MoveByAngle = Hook.match("MoveByAngle", [ /\w+\s\s*of/, /\w+\..+?(\w+)/, /\(/, /\w+/, /\)/, /,/ ])[1];
                    sendFunction("MoveByAngle", MoveByAngle);
                    Hook.append("mousedown", [ /&&/, /\w+/, /\>/, /\w+/, /\)/, /return/, /;/, `(.+?=`, /(\w+)/, `.+?),`, `!(\\w+`, /\(/, /\w+/, /,/, /\w+/, `\\)).+?`, /\}/ ], `Dsync.mousedown=($3)=>{$2;return $4;};`);
                    Hook.append("mouseup", [ /!\w+\.\w+/, /\)/, /return/, /;/, `(\\w+`, /=/, /(\w+).+?\w+/, /\(/, /\w+/, /,/, /\w+/, `\\))`, /\}/ ], `Dsync.mouseup=($3)=>{$2};`);
                    const [, toggleRotation, rotVar] = Hook.match("lockRotation", [ /\[/, /\w+/, /\]/, /&&/, /(\w+)/, /\(/, /!(\w+)/, /\)/, /,/ ]);
                    Hook.prepend("lockRotation", [ `function`, `${toggleRotation}` ], `Dsync.toggleRotation=()=>{${rotVar}=!${rotVar};};`);
                    const toggleChat = Hook.match("toggleChat", [ /return/, `(\\w+`, /&&/, /\w+/, /\(/, /!\[/, /\]/, /\)/, `,.+?),\\w+\\.` ])[1];
                    Hook.insert("toggleChat", [ /null/, /\}/, /\)/, /\)/, /;/, /{INSERT}/, /{VAR}/, /\w+/, /=/ ], `Dsync.toggleChat=()=>{${toggleChat}};`);
                    const [, selectByID, defaultData, itemBar] = Hook.match("selectByID", [ /(\w+)/, /\(/, /(\w+)\.(\w+)/, /\[/, /Number/ ]);
                    sendFunction("selectByID", selectByID, `Dsync.defaultData=${defaultData};`);
                    Dsync.props.itemBar = itemBar;
                    Hook.append("drawEntityInfo", [ /function/, /\w+/, /\(/, /ARGS{3}/, /\)/, /\{/, /{VAR}/, /\w+/, /=/, /\w+/, /\[/, /\w+/, /\(/, /\).+?\.5;/ ], "if(Dsync.hooks.drawEntityInfo){Dsync.hooks.drawEntityInfo(...arguments);}");
                    const [, x, x1, x2] = Hook.match("positionX", [ /\(\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /\+/, /\(\w+\.(\w+)/ ]);
                    Dsync.props.x = x;
                    Dsync.props.x1 = x1;
                    Dsync.props.x2 = x2;
                    const [, y, y1, y2] = Hook.match("positionY", [ /,\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /\+/, /\(\w+\.(\w+)/ ]);
                    Dsync.props.y = y;
                    Dsync.props.y1 = y1;
                    Dsync.props.y2 = y2;
                    const [, angle, angle1, angle2] = Hook.match("angle", [ /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+/, /,/, /\w+\.\w+/, /=/, /\w+/, /,/ ]);
                    Dsync.props.angle = angle;
                    Dsync.props.angle1 = angle1;
                    Dsync.props.angle2 = angle2;
                    const id = Hook.match("id", [ /-NUMBER{1}/, /!==/, /\w+\.(\w+)/, /&&/ ])[1];
                    Dsync.props.id = id;
                    const health = Hook.match("health", [ /(\w+)/, /\//, /NUMBER{255}/, /\*/ ])[1];
                    Dsync.props.health = health;
                    const maxHealth = Hook.match("maxHealth", [ /\w+/, /:/, /NUMBER{35}/, /,/, /(\w+)/, /:/, /NUMBER{100}/ ])[1];
                    Dsync.props.maxHealth = maxHealth;
                    const hat = Hook.match("hat", [ /\w+/, /\(/, /\)/, /\[/, /\w+/, /\./, /(\w+)/, /\]/, /;/, /if/ ])[1];
                    Dsync.props.hat = hat;
                    const playerValue = Hook.match("playerValue", [ /if/, /\(/, /!/, /\(/, /\w+/, /\./, /(\w+)/, /&/, /\w+/, /\(/, /\)/ ])[1];
                    Dsync.props.playerValue = playerValue;
                    const [, itemData, itemType] = Hook.match("itemType", [ /(\w+)/, /\(/, /\)/, /\[/, /\w+/, /\]/, /\./, /(\w+)/, /;/ ]);
                    Dsync.props.itemType = itemType;
                    const playerData = Hook.match("playerData", [ /\w+\.\w+/, /\(/, /(?!\d+)\w+/, /,/, /(?!arguments)(\w+)/, /\)/, /;/ ])[1];
                    Hook.prepend("myPlayerID", [ /function/, /\w+/, /\(/, /\)/, /\{/, /return/, /\w+/, /!==/, /(\w+)/ ], `Dsync.myPlayerID=()=>$2;Dsync.playerData=${playerData};`);
                    const entityList = Hook.match("entityList", [ /new/, /Map/, /,/, /(\w+)/, /=/, /\[/, /\]/, /;/ ])[1];
                    const [, entityData, entityRadius] = Hook.match("entityData", /(\w+)\(\)\[\w+\.\w+\]\.(\w+)/);
                    Hook.prepend("entityData", [ /function/, /\w+/, /\(/, /ARGS{2}/, /\)/, /\{/, /{VAR}/, /\w+/, /,/ ], `Dsync.entityData=${entityData}();Dsync.itemData=${itemData}();Dsync.entityList=()=>${entityList};`);
                    Dsync.props.radius = entityRadius;
                    Hook.insert("showHoods1", [ /\w+/, /\(/, /\)/, /\./, /\w+/, /{INSERT}/, /\)/, /continue/, /;/ ], `&&!Dsync.settings.showHoods`);
                    Hook.insert("showHoods2", [ /\w+\.\w+/, /===/, /\w+/, /{INSERT}/, /\)/, /\{/ ], `||Dsync.settings.showHoods`);
                    Hook.insert("websocketString", [ /;/, /{INSERT}/, /switch/, /\(/, /(\w+)/, /\[/, /NUMBER{0}/, /\]/, /\)/, /\{/ ], `if(Dsync.hooks.stringMessage){Dsync.hooks.stringMessage($3);}`);
                    Hook.replace("zoomWidth", [ /(\w+)/, /:/, /NUMBER{1824}/, /,/ ], "$1:Dsync.scale.w,");
                    Hook.replace("zoomHeight", [ /(\w+)/, /:/, /NUMBER{1026}/, /,/ ], "$1:Dsync.scale.h,");
                    Hook.append("itemCounter", [ /(\w+)/, /\]/, /,/, /(\w+)/, /\./, /\w+/, /\(/, /(\w+)/, /\)/, /,/ ], `(Dsync.hooks.drawItemBar&&Dsync.hooks.drawItemBar($4,$3,$2)),`);
                    Hook.append("maxCount", [ `(\\w+`, `\\.`, `\\w+)`, /=/, /\[/, /ARGS{11}/, /\]/, /,/ ], `Dsync.maxCount=$2;`);
                    const currentCount = Hook.match("currentCount", [ /(\w+)/, /:/, /\[/, /ARGS{11}/, /\]/, /,/ ])[1];
                    Dsync.props.currentCount = currentCount;
                    const [, upgradeItem, upgradeBar] = Hook.match("upgradeList", [ /&&/, /\(/, /(\w+)/, /\(/, /\w+/, /\./, /(\w+)/, /\[/, /\w+/, /\]/, /\),/ ]);
                    Dsync.props.upgradeBar = upgradeBar;
                    sendFunction("upgradeItem", upgradeItem);
                    Hook.replace("ping", [ `({VAR}`, /(\w+)/, /=/, /\w+/, /\[/, /NUMBER{1}/, /\]/, /\|/, /\w+/, /\[/, /NUMBER{2}/, /\]/, /<</, /NUMBER{8}/, `;)`, /(?!{VAR})(\w+)/ ], `$1Dsync.ping=$2;$3`);
                    const clan = Hook.match("clan", [ /===/, /\w+/, /\./, /(\w+)/, /\)/, /\)/ ])[1];
                    Dsync.props.clan = clan;
                    const itemOwner = Hook.match("itemOwner", [ /\!/, /\(/, /\w+/, /\./, /(\w+)/, /===/ ])[1];
                    Dsync.props.itemOwner = itemOwner;
                    const byteLength = Hook.match("byteLength", [ /NUMBER{3}/, /;/, /\w+/, /</, /(\w+)/ ])[1];
                    Hook.append("JoinCreateClan", [ /,/, /\w+/, /=/, /(\w+)/, /\[/, /NUMBER{2}/, /\]/, /;/ ], `if(Dsync.hooks.UpdateClanList){Dsync.hooks.UpdateClanList([...$2.slice(3,${byteLength})]);}`);
                    Hook.append("UpdateClanList", [ /(\w+)/, /\[/, /NUMBER{1}/, /\]/, /;/, /\w+/, /\(/, /\)/, /\./, /\w+/, /\(/, /\w+/, /\)/, /;/ ], `if(Dsync.hooks.UpdateClanList){Dsync.hooks.UpdateClanList([...$2.slice(2,${byteLength})]);}`);
                    Hook.append("DeleteClan", [ /{QUOTE}none{QUOTE}/, /,/, /\w+/, /=/, /null/, /,/ ], `(Dsync.hooks.DeleteClan&&Dsync.hooks.DeleteClan()),`);
                    Hook.append("drawItem", [ /\)/, /;/, /const/, /\w+/, /=/, /\w+/, /\[/, /(?!\d+)\w+/, /\]/, /;.+?\)/, /,/ ], "(Dsync.settings.markersBottom&&Dsync.hooks.drawItems&&Dsync.hooks.drawItems(...arguments)),");
                    Hook.append("bounceProps", [ /(\w+)\.\w+/, /\+/, /(\w+)/, /,/, /\w+\.\w+/, /\+/, /(\w+)/, /\),/ ], `$2.dirX=$3,$2.dirY=$4,`);
                    const [, upgradeScythe, goldenCowID] = Hook.match("scythe", [ /\w+/, /&&/, /(\w+)/, /\(/, /(\w+)/, /\)/, /,/ ]);
                    sendFunction("upgradeScythe", upgradeScythe, `Dsync.goldenCowID=()=>${goldenCowID};`);
                    const itemDamage = Hook.match("itemDamage", [ /(\w+)/, /:/, /46\.5/, /,/ ])[1];
                    Dsync.props.itemDamage = itemDamage;
                    const itemDataType = Hook.match("itemDataType", [ /\w+/, /\./, /(\w+)/, /===/, /NUMBER{2}/ ])[1];
                    Dsync.props.itemDataType = itemDataType;
                    Hook.append("updatePlayer", [ /\(/, /ARGS{16}/, /\).+?/, /(\w+)/, /\./, /\w+/, /=/, /NUMBER{0}/ ], `;if(Dsync.hooks.updatePlayer){Dsync.hooks.updatePlayer($2);}`);
                    Hook.append("createEntity", [ /(\w+)/, /\./, /\w+/, /=/, /NUMBER{0}/, /;/, /break/, /;/, /default/, /:/, /break/, /\}/ ], `if (Dsync.myPlayerID() === $2[Dsync.props.id]){Dsync.target=$2;}`);
                    Hook.replace("renderLayers", [ `(function`, /\w+/, /\(/, /ARGS{2}/, /\)/, /\{/, /{VAR}/, /\w+/, /,/, /\w+/, /=.+?,/, /ARGS{2}/, `\\))`, /\}/ ], `$1;if(Dsync.itemList&&Dsync.hooks.renderLayers&&!Dsync.settings.markersBottom){Dsync.hooks.renderLayers(...arguments);}}`);
                    Hook.replace("mousemove", [ `(const`, /\w+/, /=/, /\w+/, /\(/, /\)/, /;.+?&&/, /\w+/, /\(/, /\w+/, `\\))` ], "if(Dsync.mousemove){$1}");
                    const renderLayer = Hook.match("renderLayer", [ /:/, /NUMBER{38}/, /,/, /(\w+)/, /:/, /\w+/, /\./, /\w+/, /,/ ])[1];
                    Dsync.props.renderLayer = renderLayer;
                    const currentItem = Hook.match("currentItem", [ /,/, /\w+/, /\./, /(\w+)/, /===/ ])[1];
                    Dsync.props.currentItem = currentItem;
                    const rotSpeed = Hook.match("rotSpeed", [ /\+=/, /\w+/, /\./, /(\w+)/, /\*/, /\w+/, /\)/ ])[1];
                    Dsync.props.rotSpeed = rotSpeed;
                    Hook.append("moveUpdate", [ /const/, /\w+/, /=/, /\+/, /new/, /\w+/, /;/ ], `if(Dsync.hooks.moveUpdate){Dsync.hooks.moveUpdate();}`);
                    args[0] = Hook.code;
                    window.eval = target;
                    target.apply(_this, args);
                    load();
                    return;
                }
                return target.apply(_this, args);
            }
        });
        const load = () => {
            const canvas = document.querySelector("#game-canvas");
            const gridToggle = document.querySelector("#grid-toggle");
            const displayPingToggle = document.querySelector("#display-ping-toggle");
            const itemMarkerToggle = document.querySelector("#native-helper-toggle");
            const hat_menu_content = document.querySelector("#hat_menu_content");
            if (gridToggle.checked) gridToggle.click();
            if (!displayPingToggle.checked) displayPingToggle.click();
            if (itemMarkerToggle.checked) itemMarkerToggle.click();
            window.onkeydown = null;
            window.onkeyup = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
            Dsync.hooks.stringMessage = hooks_stringMessage;
            Dsync.hooks.updatePlayer = hooks_updatePlayer;
            new MutationObserver((mutations => {
                if (!inGame() || isInput()) return;
                for (let i = 0; i < mutations.length; i++) {
                    if (mutations[i].target.textContent === "UNEQUIP") {
                        Dsync.actualHat = i + 1;
                        break;
                    }
                }
            })).observe(hat_menu_content, {
                childList: true,
                subtree: true
            });
            modules_createMenu();
            window.addEventListener("keydown", (event => handleKeydown(event, event.code)));
            window.addEventListener("keyup", (event => handleKeyup(event, event.code)));
            canvas.addEventListener("mousedown", (event => handleKeydown(event, event.button)));
            canvas.addEventListener("mouseup", (event => handleKeyup(event, event.button)));
            Dsync.hooks.drawEntityInfo = hooks_drawEntityInfo;
            Dsync.hooks.drawItemBar = hooks_drawItemBar;
            Dsync.hooks.drawItems = drawitems;
            Dsync.hooks.UpdateClanList = UpdateClanList;
            Dsync.hooks.DeleteClan = DeleteClan;
            Dsync.hooks.renderLayers = hooks_renderLayers;
            Dsync.hooks.moveUpdate = hooks_moveUpdate;
            Dsync.itemList = Dsync.itemData.filter((item => item[Dsync.props.itemDataType] === EItemTypes.PLACEABLE)).map((item => item[Dsync.props.renderLayer]));
            modules_zoomHandler();
        };
    }();
})();