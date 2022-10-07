import { controller, Dsync, log } from "..";
import { WebsocketServer } from "../modules/PacketManager";
import settings from "../modules/Settings";
import { EObjects } from "../types";

type TData = (
    [ WebsocketServer.LEADERBOARD, [number, number][] ] |
    [ WebsocketServer.DAMAGE, number, number, 0 | 1 ] |
    [ WebsocketServer.CONNECT, string ] |
    [ WebsocketServer.UPGRADE, number[] ] |
    [ WebsocketServer.DIED, [0, 0] ] |
    [ WebsocketServer.KILL_UPDATE, [number, number] ] |
    [ WebsocketServer.KILLED, string ] |
    [ WebsocketServer.PLAYER_SPAWNED, number, string ] |
    [
        WebsocketServer.DEFAULT,
        number, number, number,
        [number, string, number][],
        [number, number, string][],
        boolean
    ] | [
        WebsocketServer.SPAWN,
        number, string, number,
        [0, 10, 5, 7, 14],
        [number, number, number, number, number],
        [0, 0],
        0
    ]
)

const stringMessage = (data: TData) => {

    const id = data[0];
    if (id === WebsocketServer.SPAWN) {
        controller.reset(data[4]);
        controller.inGame = true;
        controller.automillSpawn = true;
        if (settings.lastHat) {
            const hat = controller.toggleJungle || controller.toggleScuba ? controller.previousHat : controller.actualHat;
            controller.equipHat(hat, true, true);
        }
    }

    if (id === WebsocketServer.UPGRADE) {
        const bar = data[1];

        const canAutobed = settings.autobed && bar.includes(EObjects.SPAWN);
        controller.autobed = canAutobed;
        if (settings.skipUpgrades && bar.length === 1 || canAutobed) {
            controller.PacketManager.upgrade(canAutobed ? EObjects.SPAWN : bar[0]);
        }
    }

    if (id === WebsocketServer.DIED) {
        controller.inGame = false;
        if (settings.autospawn) {
            controller.spawn();
        }
    }

    if (id === WebsocketServer.KILL_UPDATE) {
        controller.kills = data[1][0];
    }

    if (id === WebsocketServer.KILLED && settings.kill) {
        const killMessage = settings.killMessage.length ? settings.killMessage : "{KILL}x";
        const name = data[1].replace(/^Killed\s/, "").trim();
        const message = killMessage.replace(/\{KILL\}/g, controller.kills+"").replace(/\{NAME\}/g, name);
        controller.PacketManager.chat(message);
    }
}

export default stringMessage;