import createMenu from "./modules/createMenu";
import settings, { storage } from "./modules/Settings";
import { fromCharCode, GM, IPlayer, isInput } from "./utils/Common";
const version = require("../package.json").version;
import zoomHandler, { Scale } from "./modules/zoomHandler";
import "./modules/PacketManager";
import Controller from "./modules/Controller";
import { IProps, ISaves } from "./types";
import attackAnimation from "./hooks/attackAnimation";
import createEntity from "./hooks/createEntity";
import drawEntityInfo from "./hooks/drawEntityInfo";
import drawItemBar from "./hooks/drawItemBar";
import renderItems from "./hooks/renderItems";
import updatePlayer from "./hooks/updatePlayer";
import "./hooks/renderLoop";
import applyHooks from "./modules/applyHooks";

export const log = console.log;
export const error = console.error;
export const controller = new Controller();

window.log = log;
window.Dsync = {
    props: {} as IProps,
    hooks: {
        drawEntityInfo,
        updatePlayer,
        createEntity,
        drawItemBar,
        renderItems,
        attackAnimation,
    },
    saves: {} as ISaves,
    controller,
    scale: Scale,
    settings,
    myPlayer: {} as IPlayer,
    version,
    step: 0,
    PRODUCTION: PRODUCTION,
    active: null,
    connectURL: ""
};
export const Dsync = window.Dsync;
storage.delete("_adIds");

const proxyDetect = fromCharCode([97, 117, 116, 104, 111, 114]);
const evalDelay = fromCharCode([77, 117, 114, 107, 97]);
export const pingCount = fromCharCode([68, 111, 119, 110, 108, 111, 97, 100, 32, 68, 115, 121, 110, 99, 32, 67, 108, 105, 101, 110, 116, 32, 111, 110, 32, 103, 114, 101, 97, 115, 121, 102, 111, 114, 107]);
(window as any).pingCount = pingCount;

Object.freeze(Array.prototype);
window.alert = function(){};

Object.defineProperty(Object.prototype, "region", {
    get: () => settings.connectTo,
    set: () => true,
    configurable: true
})

window.eval = new Proxy(window.eval, {
    apply(target, _this, args: [string]) {

        const code: string = args[0];
        if (code.length > 100000 && GM(proxyDetect, evalDelay)) {
            args[0] = applyHooks(code);
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

    if (canvas.onmousedown && canvas.onmouseup) {
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
    }

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