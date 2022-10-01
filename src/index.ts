import { handleKeydown, handleKeyup } from "./modules/Controller";
import createMenu from "./modules/createMenu";
import Regex from "./modules/Regex";
import settings, { storage } from "./modules/Settings";
import { fromCharCode, GM, inGame, isInput, linker } from "./utils/Common";
const version = require("../package.json").version;
import stringMessage from "./hooks/stringMessage";
import drawItemBar from "./hooks/drawItemBar";
import drawEntityInfo from "./hooks/drawEntityInfo";
import zoomHandler from "./modules/zoomHandler";
import drawItems from "./hooks/drawitems";
import { DeleteClan, UpdateClanList } from "./hooks/clanHandler";
import updatePlayer from "./hooks/updatePlayer";
import renderLayers from "./hooks/renderLayers";
import { EItemTypes } from "./types";
import moveUpdate from "./hooks/moveUpdate";
import attackAnimation from "./hooks/attackAnimation";
import createEntity from "./hooks/createEntity";
import renderLoop from "./hooks/renderLoop";
import resources from "./hooks/resources";

export const log = console.log;
export const error = console.error;
window.log = log;
window.Dsync = {
    props: {},
    hooks: {},
    settings: settings,
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
    step: 0,
    clanData: null,
    PRODUCTION: PRODUCTION,
    resources: {
        food: 200,
        wood: 200,
        stone: 200,
        gold: 200
    },
    autobedToggle: false,
    automillToggle: false,
    playerAGE: 0,
    connectURL: null
};
export const Dsync = window.Dsync;
storage.delete("_adIds");

const proxyDetect = fromCharCode([97, 117, 116, 104, 111, 114]);
const evalDelay = fromCharCode([77, 117, 114, 107, 97]);
export const pingCount = fromCharCode([68, 111, 119, 110, 108, 111, 97, 100, 32, 68, 115, 121, 110, 99, 32, 67, 108, 105, 101, 110, 116, 32, 111, 110, 32, 103, 114, 101, 97, 115, 121, 102, 111, 114, 107]);
(window as any).pingCount = pingCount;

window.eval = new Proxy(window.eval, {
    apply(target, _this, args) {

        const code: string = args[0];
        if (code.length > 100000 && GM(proxyDetect, evalDelay)) {

            const Hook = new Regex(code, true);
            const sendFunction = (name: string, fname: string, content: string = "") => {
                if (fname === undefined) return;
                Hook.prepend(name, [`function`, fname], `Dsync.${name}=${fname};` + content);
            }

            // Save a copy of bundle
            window.COPY_CODE = Hook.COPY_CODE.match(/^\((.+)\)\(.+\);$/)[1];

            // Make it possible to modify the bundle
            Hook.append(
                "EXTERNAL fix",
                [/\(function/, /(\w+)/, /\(/, /\w+/, /\)/, /\{/],
                `EXTERNAL.__proto__.toString=()=>COPY_CODE;`
            );

            Hook.replace(
                "antiError",
                [/Array\.prototype\.pop/, /=/, /Array\.prototype\.shift,/],
                ""
            );

            // Prevent from executing debugger
            // Hook.replace("Debugger fix", /debugger/, ``, "g");

            const selectItem = Hook.match("selectItem", [/\|\|/, /(\w+)/, /\(/, /NUMBER{2}/, /\)/, /,/])[1];
            sendFunction("selectItem", selectItem);

            // const equipHat = Hook.match("equipHat", [/!/, /\w+/, /\)/, /return/, /;/, /(\w+)/, /\(/, /\w+/, /\)/])[1];
            // sendFunction("equipHat", equipHat);
            Hook.append(
                "equipHat",
                // [/&&/, /\w+/, /&&/, /\(/, /(\w+)/, /=/, /\w+/, /,.+?])/],
                [/&&/, /\w+/, /&&/, /\(/, /(\w+)/, /=/, /\w+/, /,(.+?\]\)\)).+?\}\)\}/],
                "Dsync.equipHat=($2)=>{$3};"
            );

            // const chat = Hook.match("chat", [/break/, /\}/, /(\w+)/, /\(/, /\w+/, /\)/])[1];
            const chat = Hook.match("chat", [/\)/, /\)/, /\}/, /(\w+)/, /\(/, /\w+/, /\)/, /\}/, /\}/, /\)/])[1];
            sendFunction("chat", chat);

            const [, attack, getAngle] = Hook.match("attack", [/\|\|/, /(\w+)/, /\(/, /(\w+)/, /\(/, /\)/, /\)/, /,/]);
            sendFunction("attack", attack);
            sendFunction("getAngle", getAngle);
            
            const stopAttack = Hook.match("stopAttack", [/&&/, /(\w+)/, /\(/, /\)/, /,/])[1];
            sendFunction("stopAttack", stopAttack);

            const autoattack = Hook.match("autoattack", [/,/, /(\w+)/, /\(/, /\w+/, /\)/, /\)/, /\)/])[1];
            sendFunction("autoattack", autoattack);

            const move = Hook.match("move", [/&&/, /\(/, /(\w+)\(\w+\)/, /,/])[1];
            sendFunction("move", move);

            // const createClan = Hook.match("createClan", [/,/, /\w+/, /=>/, /\{/, /(\w+)/, /\(/, /\w+/])[1];
            // sendFunction("createClan", createClan);

            const leaveClan = Hook.match("leaveClan", [/=>/, /\{/, /(\w+)/, /\(/, /\)/, /\}/])[1];
            sendFunction("leaveClan", leaveClan);

            const [, kickUser, joinClan] = Hook.match(
                "kickUser",
                [/n\s*\w+/, /\(/, /ARGS{4}/, /\).+?:/, /\w+/, /\?/, /\w+/, /=>/, /\{.+?(\w+)\(\w+\).+?(\w+)\(\w+\)/]
            );
            sendFunction("kickUser", kickUser);
            sendFunction("joinClan", joinClan);

            const changeAngle = Hook.match("changeAngle", [/\w+/, /\(/, /\w+/, /\)/, /\}/, /function/, /\w+/, /\(/, /\w+/, /\)/, /\{/, /(\w+)/, /\(/, /\w+/, /\)/, /,/])[1];
            sendFunction("changeAngle", changeAngle);

            const MoveByAngle = Hook.match("MoveByAngle", [/\w+\s\s*of/, /\w+\..+?(\w+)/, /\(/, /\w+/, /\)/, /,/])[1];
            sendFunction("MoveByAngle", MoveByAngle);

            // Get mousedown function without it's protection
            // Hook.append(
            //     "mousedown",
            //     [/&&/, /\w+/, /\>/, /\w+/, /\)/, /return/, /;/, `(.+?=`, /(\w+)/,
            //     `.+?),`, `!(\\w+`, /\(/, /\w+/, /,/, /\w+/, `\\)).+?`, /\}/],
            //     `Dsync.mousedown=($3)=>{$2;return $4;};`
            // );
            const event = Hook.append(
                "mousedown",
                [/\w+/, /&&/, /\w+/, /\>/, /\w+/, /\|\|/, `\\(?(.+?=\\s*(\\w+).+?)\\|\\|.+?\}`],
                `Dsync.mousedown=($3)=>($2);`
            )[3];

            // Get mouseup function without it's protection
            const mouseup = Hook.prepend(
                "mouseup",
                [/function/, /(\w+)/, /\(/, /\w+/, /\)/, /\{/, /\w+\.isTrusted/, /&&/, /\(/, /\w+/, /=/, /\w+.+?\}/],
                `Dsync.mouseup=$2;`
            );

            // Create toggleRotation function
            const [, toggleRotation, rotVar] = Hook.match(
                "lockRotation",
                [/\[/, /\w+/, /\]/, /\|\|/, /(\w+)/, /\(/, /!(\w+)/, /\)/, /,/]
            );
            Hook.prepend("lockRotation", [`function`, `${toggleRotation}`], `Dsync.toggleRotation=()=>{${rotVar}=!${rotVar};};`);

            // Copy toggle chat function
            const toggleChat = Hook.match("toggleChat", [/return/, `(\\w+`, /&&/, /\w+/, /\(/, /!\d+/, /\)/, `,.+?),void`])[1];
            Hook.insert(
                "toggleChat",
                [/null/, /\}/, /\)/, /\)/, /;/, /{INSERT}/, /{VAR}/, /\w+/, /=/],
                `Dsync.toggleChat=()=>{${toggleChat}};`
            );

            const [, selectByID, defaultData, itemBar] = Hook.match("selectByID", [/(\w+)/, /\(/, /(\w+)\.(\w+)/, /\[/, /Number/]);
            sendFunction("selectByID", selectByID, `Dsync.defaultData=${defaultData};`);
            Dsync.props.itemBar = itemBar;

            // Hook draw entity function
            const drawEntityInfo = Hook.append(
                "drawEntityInfo",
                [/clan_decline.+?\)/, /\}/, /function/, /(\w+)/, /\(/, /ARGS{3}/, /\)/, /\{/, /{VAR}/, /\w+/, /=/, /\w+.+?\.5;/],
                "if(Dsync.hooks.drawEntityInfo){Dsync.hooks.drawEntityInfo(...arguments);}"
            )[2];

            const [,
                x, x1, x2,
                y, y1, y2,
                angle, angle1, angle2
            ] = Hook.match(
                "PositionFormat",
                [
                    /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/,
                    /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/,
                    /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+\.(\w+)/, /=/, /\w+,/
                ]
            );
            Dsync.props.x = x;
            Dsync.props.x1 = x1;
            Dsync.props.x2 = x2;

            Dsync.props.y = y;
            Dsync.props.y1 = y1;
            Dsync.props.y2 = y2;

            Dsync.props.angle = angle;
            Dsync.props.angle1 = angle1;
            Dsync.props.angle2 = angle2;

            // Get entity id property
            const id = Hook.match("id", [/-NUMBER{1}/, /!==/, /\w+\.(\w+)/, /&&/])[1];
            Dsync.props.id = id;

            // Get entity health property
            const health = Hook.match("health", [/\w+\.(\w+)/, /\//, /NUMBER{255}/, /\*/])[1];
            Dsync.props.health = health;

            // Get entity maxHealth property
            const maxHealth = Hook.match("maxHealth", [/\w+/, /:/, /NUMBER{35}/, /,/, /(\w+)/, /:/, /NUMBER{100}/])[1];
            Dsync.props.maxHealth = maxHealth;

            // Get entity hat property
            const hat = Hook.match("hat", [/\w+/, /\(/, /\)/, /\[/, /\w+/, /\./, /(\w+)/, /\]/, /;/, /if/])[1];
            Dsync.props.hat = hat;

            // Get entity state property, if entity has clown (128), or it is hidden (dZ)
            const playerValue = Hook.match("playerValue", [/if/, /\(/, /!/, /\(/, /\w+/, /\./, /(\w+)/, /&/, /\w+/, /\(/, /\)/])[1];
            Dsync.props.playerValue = playerValue;

            // 1 argument - Function name that returns list of items
            // 2 argument - Property that returns type of item 0-11
            const [,itemData, itemType] = Hook.match("itemType", [/(\w+)/, /\(/, /\)/, /\[/, /\w+/, /\]/, /\./, /(\w+)/, /;/]);
            Dsync.props.itemType = itemType;

            const playerData = Hook.match("playerData", [/\w+\.\w+/, /\(/, /(?!\d+)\w+/, /,/, /(?!arguments)(\w+)/, /\)/, /;/])[1];

            // Create a function that returns myPlayer id
            Hook.prepend(
                "myPlayerID",
                [/function/, /\w+/, /\(/, /\)/, /\{/, /return/, /\w+/, /!==/, /(\w+)/],
                `Dsync.myPlayerID=()=>$2;Dsync.playerData=${playerData};`
            );

            const entityList = Hook.match("entityList", [/new/, /Map/, /,/, /(\w+)/, /=/, /\[/, /\]/, /;/])[1];

            // entityData - name of function, that returns entity data (radius, maxHealth)
            const [, entityData, entityRadius] = Hook.match("entityData", /(\w+)\(\)\[\w+\.\w+\]\.(\w+)/);
            Hook.insert(
                "entityData",
                [/clan_decline{QUOTE}/, /\)/, /\).+?;{INSERT}function/, /\w+/, /\(/, /ARGS{2}/, /\)/, /\{/, /{VAR}/],
                `Dsync.entityData=${entityData}();Dsync.itemData=${itemData}();Dsync.entityList=()=>${entityList};`
            );
            Dsync.props.radius = entityRadius;

            // Add condition to render nicknames and health in anyway
            // Hook.insert(
            //     "showHoods1",
            //     [/\w+/, /\(/, /\)/, /\./, /\w+/, /{INSERT}/, /\)/, /continue/, /;/],
            //     `&&!Dsync.settings.showHoods`
            // );
            // Hook.insert(
            //     "showHoods2",
            //     [/\w+\.\w+/, /===/, /\w+/, /{INSERT}/, /\)/, /\{/],
            //     `||Dsync.settings.showHoods`
            // );
            Hook.append(
                "showHoods",
                [/\w+\.\w+/, /!==/, /\w+/, /\)/],
                `||Dsync.settings.showHoods`
            )

            // Hook websocket that parses incoming strings
            Hook.insert(
                "websocketString",
                [/;/, /{INSERT}/, /switch/, /\(/, /(\w+)/, /\[/, /NUMBER{0}/, /\]/, /\)/, /\{/],
                `if(Dsync.hooks.stringMessage){Dsync.hooks.stringMessage($3);}`
            );

            // Replace maxWidth and maxHeight properties with our own
            Hook.replace("zoomWidth", [/(\w+)/, /:/, /NUMBER{1824}/, /,/], "$1:Dsync.scale.w,");
            Hook.replace("zoomHeight", [/(\w+)/, /:/, /NUMBER{1026}/, /,/], "$1:Dsync.scale.h,");

            // Hook renderItemBar function
            // $2 - index
            // $3 - imageData (width, height, x, y)
            // $4 - ctx
            Hook.append(
                "itemCounter",
                [/(\w+)/, /\]/, /,/, /(\w+)/, /\./, /\w+/, /\(/, /(\w+)/, /\)/, /,/],
                `(Dsync.hooks.drawItemBar&&Dsync.hooks.drawItemBar($4,$3,$2)),`
            );

            // Get max count array
            Hook.append(
                "maxCount",
                [`(\\w+`, `\\.`, `\\w+)`, /=/, /\[/, /ARGS{11}/, /\]/, /,/],
                `Dsync.maxCount=$2;`
            );

            // Get currentCount property
            const currentCount = Hook.match("currentCount", [/(\w+)/, /:/, /\[/, /ARGS{11}/, /\]/, /,/])[1];
            Dsync.props.currentCount = currentCount;

            // Get upgradeBar property and upgradeItem function
            // const [, upgradeItem, upgradeBar] = Hook.match("upgradeList", [/&&/, /\(/, /(\w+)/, /\(/, /\w+/, /\./, /(\w+)/, /\[/, /\w+/, /\]/, /\),/]);
            // Dsync.props.upgradeBar = upgradeBar;
            // sendFunction("upgradeItem", upgradeItem);
            const upgradeBar = Hook.append(
                "upgradeList",
                [/Dsync.mouseup.+?\}.+?&&/, /\(/, /(\w+)/, /=/, /\w+\.(\w+).+?,(.+?),/, /\w+/, /=.+?\}/],
                `Dsync.upgradeItem=($2)=>{$4};`
            )[3];
            Dsync.props.upgradeBar = upgradeBar;

            // Hook.replace(
            //     "ping",
            //     [`({VAR}`, /(\w+)/, /=/, /\w+/, /\[/, /NUMBER{1}/, /\]/, /\|/, /\w+/, /\[/, /NUMBER{2}/, /\]/, /<</, /NUMBER{8}/, `;)`, /(?!{VAR})(\w+)/],
            //     `$1Dsync.ping=$2;$3`
            // );

            // const clan = Hook.match("clan", [/===/, /\w+/, /\./, /(\w+)/, /\)/, /\)/])[1];
            const clan = Hook.match("clan", [/===/, /\w+\.(\w+)/, /\|\|/, /\w+/])[1];
            Dsync.props.clan = clan;

            const itemOwner = Hook.match("itemOwner", [/&&/, /(?!\d+)\w+/, /===/, /\w+\.(\w+)/, /\)/])[1];
            Dsync.props.itemOwner = itemOwner;

            const byteLength = Hook.match("byteLength", [/NUMBER{3}/, /;/, /\w+/, /</, /(\w+)/])[1];

            Hook.append(
                "JoinCreateClan",
                [/,/, /\w+/, /=/, /(\w+)/, /\[/, /NUMBER{2}/, /\]/, /;/],
                `if(Dsync.hooks.UpdateClanList){Dsync.hooks.UpdateClanList([...$2.slice(3,${byteLength})]);}`
            );

            Hook.append(
                "UpdateClanList",
                [/(\w+)/, /\[/, /NUMBER{1}/, /\]/, /;/, /\w+/, /\(/, /\)/, /\./, /\w+/, /\(/, /\w+/, /\)/, /;/],
                `if(Dsync.hooks.UpdateClanList){Dsync.hooks.UpdateClanList([...$2.slice(2,${byteLength})]);}`
            );

            Hook.append(
                "DeleteClan",
                [/{QUOTE}none{QUOTE}/, /,/, /\w+/, /=/, /null/, /,/],
                `(Dsync.hooks.DeleteClan&&Dsync.hooks.DeleteClan()),`
            );

            Hook.append(
                "drawItem",
                [/\)/, /;/, /const/, /\w+/, /=/, /\w+/, /\[/, /(?!\d+)\w+/, /\]/, /;.+?\)/, /,/],
                "(Dsync.settings.markersBottom&&Dsync.hooks.drawItems&&Dsync.hooks.drawItems(...arguments)),"
            );

            Hook.append(
                "bounceProps",
                [/(\w+)\.\w+/, /\+/, /(\w+)/, /,/, /\w+\.\w+/, /\+/, /(\w+)/, /\),/],
                `$2.dirX=$3,$2.dirY=$4,`
            );

            const [, upgradeScythe, goldenCowID] = Hook.match("scythe", [/\w+/, /&&/, /(\w+)/, /\(/, /(\w+)/, /\)/, /,/]);
            sendFunction("upgradeScythe", upgradeScythe, `Dsync.goldenCowID=()=>${goldenCowID};`);

            const itemDamage = Hook.match("itemDamage", [/(\w+)/, /:/, /46\.5/, /,/])[1];
            Dsync.props.itemDamage = itemDamage;

            const itemDataType = Hook.match("itemDataType", [/\w+/, /\./, /(\w+)/, /===/, /NUMBER{2}/])[1];
            Dsync.props.itemDataType = itemDataType;

            Hook.append(
                "updatePlayer",
                [/\(/, /ARGS{16}/, /\).+?/, /(\w+)/, /\./, /\w+/, /=/, /NUMBER{0}/],
                `;if(Dsync.hooks.updatePlayer){Dsync.hooks.updatePlayer($2);}`
            );

            Hook.append(
                "createEntity",
                // [/(\w+)/, /\./, /\w+/, /=/, /NUMBER{0}/, /;/, /break/, /;/, /default/, /:/, /break/, /\}/],
                [/(\w+)\[\w+\(\w+\)\]/, /=/, /NUMBER{0}/, /\}/],
                // `if (Dsync.myPlayerID() === $2[Dsync.props.id]){Dsync.target=$2;}`
                `Dsync.hooks.createEntity($2);`
            );

            Hook.prepend(
                "renderLayers",
                [/\}/, /function/, `${drawEntityInfo}\\(ARGS{3}\\)`],
                `;if(Dsync.itemList&&Dsync.hooks.renderLayers&&!Dsync.settings.markersBottom){Dsync.hooks.renderLayers(...arguments);}`
                // [`(function`, /\w+/, /\(/, /ARGS{2}/, /\)/, /\{/, /{VAR}/, /\w+/, /,/, /\w+/, /=.+?,/, /ARGS{2}/, `\\))`, /\}/],
                // `$1;if(Dsync.itemList&&Dsync.hooks.renderLayers&&!Dsync.settings.markersBottom){Dsync.hooks.renderLayers(...arguments);}}`
            );

            Hook.replace(
                "mousemove",
                // [`(const`, /\w+/, /=/, /\w+/, /\(/, /\)/, /;.+?&&/, /\w+/, /\(/, /\w+/, `\\))`],
                [`({VAR}`, `\\w+`, `=`, `${getAngle}\\(\\);.+?)\\}`],
                "if(Dsync.mousemove){$1}}"
            );

            const renderLayer = Hook.match("renderLayer", [/:/, /NUMBER{38}/, /,/, /(\w+)/, /:/, /\w+/, /\./, /\w+/, /,/])[1];
            Dsync.props.renderLayer = renderLayer;

            const currentItem = Hook.match("currentItem", [/,/, /\w+/, /\./, /(\w+)/, /===/])[1];
            Dsync.props.currentItem = currentItem;

            const rotSpeed = Hook.match("rotSpeed", [/\+=/, /\w+/, /\./, /(\w+)/, /\*/, /\w+/, /\)/])[1];
            Dsync.props.rotSpeed = rotSpeed;

            Hook.append(
                "moveUpdate",
                [/const/, /\w+/, /=/, /\+/, /new/, /\w+/, /;/],
                `if(Dsync.hooks.moveUpdate){Dsync.hooks.moveUpdate();}`
            );

            Hook.replace(
                "hideNicknames",
                [`(const`, /\w+/, /=/, /\w+\.\w+/, `\\|\\|.+),`, `(?=\\w+`, /\(/, /ARGS{3}/, `&&)`],
                `if(!Dsync.settings.hideNicknames){$1}`
            );

            const weaponType = Hook.match("weaponType", [/(\w+)/, /:/, /\w+\.\w+/, /,/, `${Dsync.props.id}`, /:/, /\w+\.\w+/, /,/])[1];
            Dsync.props.weaponType = weaponType;

            Hook.append(
                "playerMessage",
                [/\(/, /\w+/, /\)/, /\}/, /,/, /this/, /\./, /\w+/, /=/, /function/, /\(/, /(\w+)/, /,/, /\w+/, /\)/, /\{/],
                `if(Dsync.settings.hideMessages||$2===pingCount)return;`
            );

            Hook.append(
                "teamMessage",
                [/ARGS{7}/, /\)/, /\}/, /,/, /this/, /\./, /\w+/, /=/, /function/, /\(/, /\w+/, /,/, /(\w+)/, /\)/, /\{/],
                `if(Dsync.settings.hideMessages||$2.replace(/\\w+:\\s/, "")===pingCount)return;`
            );

            // const [,, accept, clanData, acceptList] = Hook.append(
            const acceptList = Hook.append(
                "autoAccept",
                // [/\(/, /(\w+)/, /\(/, /NUMBER{0}/, /===/, /\w+/, /\)/, /\,/, /(\w+)\.(\w+).+?/, /\)/, /\}/],
                [/\((\w+)/, /=/, /\w+/, /===/, /\w+,(.+?),(\w+)\.(\w+).+?\)\}/],
                "Dsync.accept=($2)=>{$3};Dsync.clanData=$4;"
            )[5];
            Dsync.props.acceptList = acceptList;

            Hook.append(
                "hitAnimation",
                [/\+=NUMBER{5}.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?;/],
                "Dsync.hooks.attackAnimation($2, $3, $4, $5, $6);"
            );

            Hook.prepend(
                "getUser",
                [/function/, /\w+/, /\(/, /ARGS{16}.+?(\w+)\.\w+/, /\(/, /\w+/, /\)/],
                `Dsync.players=()=>$2;`
            );

            const bulletType = Hook.match("bulletType", [/reload:/, /NUMBER{235},/, /(\w+):/, /\w+\.\w+,/])[1];
            Dsync.props.bulletType = bulletType;

            const projectileType = Hook.match("projectileType", [/,\w+\[\w+\]\.(\w+),/])[1];
            Dsync.props.projectileType = projectileType;

            Hook.append(
                "renderLoop",
                [/\w+\.clearRect/, /\(/, /0,/, /0,/, /\w+,/, /\w+/, /\)/, /;/],
                "if(Dsync.hooks.renderLoop&&Dsync.settings.smoothZoom){Dsync.hooks.renderLoop();}"
            );

            Hook.append(
                "resources",
                [/\w+\.\w+/, /\(/, /\w+/, /\)/, /,/, /\w+\.\w+/, /\(/, /(ARGS{4})/, /\)/],
                ";Dsync.hooks.resources($2);"
            );

            const resourceAmount = Hook.match("resourceAmount", [/(\w+):/, /\[/, /ARGS{4}/, /\]/, /,/])[1];
            Dsync.props.resourceAmount = resourceAmount;

            Hook.append(
                "images",
                [/(\w+)\[\w+\(\)\.\w+\]=\w+\.\w+\(\w+\.\w+\({QUOTE}clan_decline{QUOTE}\)\);/],
                "Dsync.images=$2;"
            );

            Hook.append(
                "playerAGE",
                [/{QUOTE}AGE {QUOTE}/, /\+/, /(\w+)/, /,.+?\)\)/],
                ",($2!==0&&(Dsync.playerAGE=$2))"
            );

            args[0] = Hook.code;
            window.eval = target;
            target.apply(_this, args);

            load();
            return;
        }

        return target.apply(_this, args);
    }
});

window.WebSocket = new Proxy(window.WebSocket, {
    construct(target, args: [url: string | URL, protocols?: string | string[]]) {
        if (typeof args[0] === "string") {
            if (Dsync.connectURL === null) {
                args[0] = `wss://${settings.connectTo}.sploop.io:443/ws`;
            }

            if (args[0] !== Dsync.connectURL) {
                Dsync.playerAGE = 0;
            }
            Dsync.connectURL = args[0];
        }
        const socket = new target(...args);
        return socket;
    }
})

const load = () => {

    const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    const gridToggle = document.querySelector("#grid-toggle") as HTMLInputElement;
    const displayPingToggle = document.querySelector("#display-ping-toggle") as HTMLInputElement;
    const itemMarkerToggle = document.querySelector("#native-helper-toggle") as HTMLInputElement;
    const hat_menu_content = document.querySelector("#hat_menu_content") as HTMLDivElement;

    if (gridToggle.checked) gridToggle.click();
    if (!displayPingToggle.checked) displayPingToggle.click();
    if (itemMarkerToggle.checked) itemMarkerToggle.click();

    const toRemoveElements = ["google_play", "cross-promo", "right-content", "game-left-main", "game-right-main", "bottom-content"];
    for (const id of toRemoveElements) {
        const element = document.getElementById(id);
        if (element !== null) {
            element.style.display = "none";
        }
    }

    window.onkeydown = null;
    window.onkeyup = null;

    canvas.onmousedown = null;
    canvas.onmouseup = null;

    Dsync.hooks.stringMessage = stringMessage;
    Dsync.hooks.updatePlayer = updatePlayer;

    new MutationObserver(mutations => {
        if (!inGame() || isInput()) return;
        for (let i=0;i<mutations.length;i++) {
            if (mutations[i].target.textContent === "UNEQUIP") {
                Dsync.actualHat = (i + 1);
                break;
            }
        }
    }).observe(hat_menu_content, { childList: true, subtree: true });

    createMenu();

    window.addEventListener("keydown", event => handleKeydown(event, event.code));
    window.addEventListener("keyup", event => handleKeyup(event, event.code));

    canvas.addEventListener("mousedown", event => handleKeydown(event, event.button));
    canvas.addEventListener("mouseup", event => handleKeyup(event, event.button));

    Dsync.hooks.drawEntityInfo = drawEntityInfo;
    Dsync.hooks.drawItemBar = drawItemBar;
    Dsync.hooks.drawItems = drawItems;
    Dsync.hooks.UpdateClanList = UpdateClanList;
    Dsync.hooks.DeleteClan = DeleteClan;
    Dsync.hooks.renderLayers = renderLayers;
    Dsync.hooks.moveUpdate = moveUpdate;
    Dsync.hooks.createEntity = createEntity;
    Dsync.hooks.attackAnimation = attackAnimation;
    Dsync.hooks.renderLoop = renderLoop;
    Dsync.hooks.resources = resources;
    Dsync.itemList = Dsync.itemData
                        .filter(item => item[Dsync.props.itemDataType] === EItemTypes.PLACEABLE)
                        .map(item => item[Dsync.props.renderLayer]);

    zoomHandler();
}