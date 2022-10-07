import createMenu from "./modules/createMenu";
import Regex from "./modules/Regex";
import settings, { storage } from "./modules/Settings";
import { fromCharCode, GM, IPlayer, isInput } from "./utils/Common";
const version = require("../package.json").version;
import zoomHandler, { Scale } from "./modules/zoomHandler";
import "./modules/PacketManager";
import Controller from "./modules/Controller";
import { ISaves } from "./types";
import attackAnimation from "./hooks/attackAnimation";
import createEntity from "./hooks/createEntity";
import drawEntityInfo from "./hooks/drawEntityInfo";
import drawItemBar from "./hooks/drawItemBar";
import moveUpdate from "./hooks/moveUpdate";
import renderItems from "./hooks/renderItems";
import renderLoop from "./hooks/renderLoop";
import resources from "./hooks/resources";
import updatePlayer from "./hooks/updatePlayer";
import { createClan, deleteClan, updateClan } from "./hooks/clanHandler";

export const log = console.log;
export const error = console.error;
export const controller = new Controller();

window.log = log;
window.Dsync = {
    props: {},
    hooks: {
        drawEntityInfo,
        updatePlayer,
        createEntity,
        drawItemBar,
        renderItems,
        resources,
        attackAnimation,
        createClan,
        updateClan,
        deleteClan,
        moveUpdate,
        renderLoop,
    },
    saves: {} as ISaves,
    controller: controller,
    scale: Scale,
    settings: settings,
    myPlayer: {} as IPlayer,
    version: version,
    step: 0,
    PRODUCTION: PRODUCTION,
    connectURL: null
};
export const Dsync = window.Dsync;
storage.delete("_adIds");

const proxyDetect = fromCharCode([97, 117, 116, 104, 111, 114]);
const evalDelay = fromCharCode([77, 117, 114, 107, 97]);
export const pingCount = fromCharCode([68, 111, 119, 110, 108, 111, 97, 100, 32, 68, 115, 121, 110, 99, 32, 67, 108, 105, 101, 110, 116, 32, 111, 110, 32, 103, 114, 101, 97, 115, 121, 102, 111, 114, 107]);
(window as any).pingCount = pingCount;

Object.freeze(Array.prototype);
Object.freeze(console);
window.alert = function(){};

Object.defineProperty(Object.prototype, "region", {
    get() {
        return settings.connectTo;
    },
    configurable: true
})

window.eval = new Proxy(window.eval, {
    apply(target, _this, args) {

        const code: string = args[0];
        if (code.length > 100000 && GM(proxyDetect, evalDelay)) {

            const Hook = new Regex(code, true);

            // Save a copy of bundle
            window.COPY_CODE = Hook.COPY_CODE.match(/^\((.+)\)\(.+\);$/)[1];

            // Make it possible to modify the bundle
            Hook.append(
                "EXTERNAL fix",
                /\(function (\w+)\(\w+\)\{/,
                `EXTERNAL.__proto__.toString=()=>COPY_CODE;`
            );

            Hook.replace(
                "strict",
                /{QUOTE}use strict{QUOTE}(?:,|;)?/,
                ""
            )

            Hook.prepend(
                "getAngle",
                /function (\w+)\(\)\{return (\w+)\?/,
                "Dsync.saves.getAngle=$2;Dsync.saves.toggleRotation=(value)=>{$3=value};"
            );

            const acceptList = Hook.append(
                "clanData",
                /(\w+)\.(\w+)\.\w+\(\)\);.+?\}/,
                `Dsync.saves.clanData=$2;`
            )[3];
            Dsync.props.acceptList = acceptList;

            Hook.append(
                "upgradeItem",
                /\.001.+?for\(let \w+=0,.+?\w+\(new \w+\(\[.+?,(\w+)\]\)(,|;)?/,
                `,Dsync.controller.upgradeItem($2)$3`
            );

            Hook.replace(
                "zoom",
                /(\w+):NUMBER{1824},(\w+):NUMBER{1026}/,
                "get $1(){return Dsync.scale.lerp.w},get $2(){return Dsync.scale.lerp.h}"
            );

            Hook.insert(
                "send",
                /=NUMBER{9999}.+?\(null\).+?{INSERT}function (\w+)\(\w+\)\{/,
                `Dsync.saves.send=$3;`
            );

            Hook.append(
                "renderLoop",
                /\w+\.\w+\(0,0,\w+,\w+\);/,
                "(Dsync.settings.smoothZoom&&Dsync.hooks.renderLoop());"
            );

            Hook.replace(
                "toggleChat",
                /(return \(?(\w+&&\w+.+?)(?:,)?(?:\))?void.+?)function/,
                `$1Dsync.saves.toggleChat=()=>{$2};function`
            );

            Hook.replace(
                "updatePlayer",
                /(\w+\(ARGS{16}\).+?(\w+)\.\w+=0[,;]?)\}function/,
                `$1;Dsync.hooks.updatePlayer($2)}function`
            );

            Hook.replace(
                "createEntity",
                /(\w+\(ARGS{17}\)\{.+?(\w+)\.\w+=0;?\})(\}\w+\(\))/,
                `$1Dsync.hooks.createEntity($2)$3`
            );

            Hook.append(
                "drawEntityInfo",
                /-NUMBER{50},.+?function \w+\((ARGS{3})\)\{/,
                `Dsync.hooks.drawEntityInfo($2);`
            );

            const id = Hook.match("id", /-NUMBER{1}!==\w+\.(\w+)&&/)[1];
            Dsync.props.id = id;

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

            const ownerID = Hook.match("ownerID", /&&\w+===\w+\.(\w+)\)/)[1];
            Dsync.props.ownerID = ownerID;

            const health = Hook.match("health", /\w+\.(\w+)\/NUMBER{255}\*/)[1];
            Dsync.props.health = health;

            const entityValue = Hook.match("entityValue", /!\(\w+\.(\w+)&/)[1];
            Dsync.props.entityValue = entityValue;

            const [, currentItem, hat] = Hook.match("hat", /\(\w+\.(\w+)\|\w+\.(\w+)<<NUMBER{8}\)/);
            Dsync.props.hat = hat;
            Dsync.props.currentItem = currentItem;

            const projectileType = Hook.match("projectileType", /,\w+\[\w+\]\.(\w+),/)[1];
            Dsync.props.projectileType = projectileType;

            Hook.prepend(
                "myPlayerID",
                /function \w+\(\)\{return \w+!==(\w+)/,
                `Dsync.saves.myPlayerID=()=>$2;`
            );

            const itemBar = Hook.replace(
                "defaultData",
                /(\W\w+>NUMBER{1}\W.+?(\w+)\.(\w+).+?)function/,
                "$1Dsync.saves.defaultData=$2;function"
            )[3];
            Dsync.props.itemBar = itemBar;

            const currentCount = Hook.match("currentCount", /(\w+):\[ARGS{11}\],/)[1];
            Dsync.props.currentCount = currentCount;

            Hook.replace(
                "entityList",
                /(\(this,.+?typeof window.+?(\w+)=\[\].+?)function/,
                `$1Dsync.saves.entityList=()=>$2;function`
            );

            Hook.append(
                "resources",
                /\w+\.\w+\(\w+\[NUMBER{1}\]\).+?\w+\.\w+\((ARGS{4})\)/,
                `;Dsync.hooks.resources($2)`
            );

            const rotateSpeed = Hook.match("rotateSpeed", /\w+\(ARGS{17}\)\{.+?\/NUMBER{4}.+?\/NUMBER{4}.+?\w+\.(\w+)=/)[1];
            Dsync.props.rotateSpeed = rotateSpeed;

            Hook.prepend(
                "moveUpdate",
                /for\(let \w+=NUMBER{1};\w+<\w+;\w+\+=NUMBER{18}\)/,
                `Dsync.hooks.moveUpdate();`
            );

            Hook.append(
                "hitAnimation",
                /\+=NUMBER{5}.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?(\w+)=.+?;/,
                "Dsync.hooks.attackAnimation($2, $3, $4, $5, $6);"
            );

            Hook.append(
                "showHoods",
                /\w+\.\w+!==\w+\)/,
                `||Dsync.settings.showHoods`
            );

            Hook.append(
                "itemCounter",
                /AGE 0.+?\[(\w+)\][,;](\w+)\.\w+\((\w+)\)([,;])/,
                `Dsync.hooks.drawItemBar($4,$3,$2)$5`
            );

            Hook.replace(
                "renderItems",
                /(\(\w+\.\w+\+\w+,\w+\.\w+\+\w+\).+?\w+\(\).+?\w+\.\w+\.\w+\)([,;]))/,
                `$1Dsync.hooks.renderItems(...arguments)$2`
            );

            Hook.replace(
                "JoinCreateClan",
                /(for\(let \w+=NUMBER{3};\w+<(\w+);.+?\w+\((\w+)\[\w+\],.+?,\w+,\w+-NUMBER{3}\).*?)\}function/,
                `$1;Dsync.hooks.createClan([...$3.slice(3,$2)]);}function`
            );

            Hook.replace(
                "UpdateClanList",
                /(for\(let \w+=NUMBER{2};\w+<(\w+);.+?\w+\((\w+)\[\w+\],.+?,\w+,\w+-NUMBER{2}\).*?)\}function/,
                `$1;Dsync.hooks.updateClan([...$3.slice(2,$2)]);}function`
            );

            Hook.append(
                "DeleteClan",
                /\+=NUMBER{5}.+?function \w+\(\)\{/,
                `Dsync.hooks.deleteClan();`
            );

            Hook.replace(
                "mousemove",
                /(\+NUMBER{110}.+?)(const \w+=\w+\(\).+?\w+!==\w+.+?\w+\(\w+\))/,
                `$1if(Dsync.controller.mousemove){$2}`
            );

            Hook.replace(
                "age",
                /({QUOTE}AGE {QUOTE}\+(\w+),.+?\))\}/,
                "$1;if($2!==0){Dsync.controller.age=$2}}"
            );

            Hook.replace(
                "chatMessage",
                /(\.NUMBER{18},.+?)(\w+\.\w+\((\w+),\w+\))/,
                `$1if(pingCount!==$3&&!Dsync.settings.hideMessages){$2}`
            );

            Hook.replace(
                "clanMessage",
                /(NUMBER{1006}.+?)(\w+\.\w+\(\w+,.+?\+(\w+)\))/,
                `$1if(pingCount!==$3&&!Dsync.settings.hideMessages){$2}`
            )

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

    const mousedown = canvas.onmousedown.bind(canvas);
    const mouseup = canvas.onmouseup.bind(canvas);
    canvas.onmousedown = null;
    canvas.onmouseup = null;

    canvas.addEventListener("mousedown", event => {
        if (event.button !== 0) return;
        mousedown(event);
    })

    canvas.addEventListener("mouseup", event => {
        if (event.button !== 0) return;
        mouseup(event);
    })

    new MutationObserver(mutations => {
        if (!controller.inGame || isInput()) return;
        for (let i=0;i<mutations.length;i++) {
            if (mutations[i].target.textContent === "UNEQUIP") {
                controller.actualHat = (i + 1);
                break;
            }
        }
    }).observe(hat_menu_content, { childList: true, subtree: true });

    createMenu();

    window.addEventListener("keydown", event => controller.handleKeydown(event, event.code));
    window.addEventListener("keyup", event => controller.handleKeyup(event, event.code));

    canvas.addEventListener("mousedown", event => controller.handleKeydown(event, event.button));
    canvas.addEventListener("mouseup", event => controller.handleKeyup(event, event.button));

    zoomHandler();
}