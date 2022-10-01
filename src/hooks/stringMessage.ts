import { Dsync, log } from "..";
import { equipHat, place, reset, spawn } from "../modules/Controller";
import settings from "../modules/Settings";
import { EObjects, WebsocketString } from "../types";

let kills = 0;
const stringMessage = (data: [number, ...any[]]) => {
    const [ id ] = data;

    if (id === WebsocketString.LEADERBOARD || id === WebsocketString.PLAYERSPAWNED) return;

    if (id === WebsocketString.SPAWN && settings.lastHat) {
        equipHat(Dsync.actualHat, true);
    }

    if (id === WebsocketString.UPGRADE) {
        const upgradeBar: number[] = data[1];
        const item = upgradeBar[0];

        const canAutobed = settings.autobed && upgradeBar.includes(EObjects.SPAWN);
        Dsync.autobedToggle = canAutobed;
        if (settings.skipUpgrades && upgradeBar.length === 1 || canAutobed) {
            Dsync.upgradeItem(canAutobed ? EObjects.SPAWN : item);
        }
    }

    if (id === WebsocketString.DIED) {
        reset();
        kills = 0;
        if (settings.autospawn) {
            spawn();
        }
    }

    if (id === WebsocketString.KILLUPDATE) {
        kills = data[1][0];
    }

    if (id === WebsocketString.KILLED && settings.kill) {
        const killMessage = settings.killMessage.length ? settings.killMessage : "{KILL}x";
        const name = data[1].replace(/^Killed\s/, "").trim();
        const message = killMessage.replace(/\{KILL\}/g, kills+"").replace(/\{NAME\}/g, name);
        Dsync.chat(message);
    }
}

export default stringMessage;