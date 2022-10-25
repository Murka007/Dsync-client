import { controller, Dsync, log } from "..";
import { Hats } from "../constants/Hats";
import { createClan, deleteClan, updateClan } from "../hooks/clanHandler";
import moveUpdate from "../hooks/moveUpdate";
import playerStats from "../hooks/playerStats";
import stringMessage from "../hooks/stringMessage";

export enum WebsocketServer {
    LEADERBOARD = 3,
    DAMAGE = 6,
    PLAYERSTATS = 8,
    CONNECT = 12,
    UPGRADE = 14,
    UPDATECLAN = 16,
    DIED = 19,
    MOVEUPDATE = 20,
    KILL_UPDATE = 22,
    JOINCREATECLAN = 24,
    DELETECLAN = 27,
    KILLED = 28,
    PLAYER_SPAWNED = 32,
    DEFAULT = 33,
    SPAWN = 35,
}

enum WebsocketClient {
    MOVE = 6,
    ANGLE = 13,
    selectByID = 2,
    ATTACK = 19,
    STOPATTACK = 18,
    LOGIN = 10,
    SCYTHE = 20,
    SELECTITEM = 0,
    HAT = 5,
    CHAT = 7,
    UPGRADE = 14,
    AUTOATTACK = 23,
    MOVEANGLE = 1,
    LEAVECLAN = 24,
    JOIN = 21,
    ACCEPTDECLINE = 17,
    KICK = 25,
    CREATECLAN = 22,
}

window.WebSocket = new Proxy(window.WebSocket, {
    construct(target, args: [url: string | URL, protocols?: string | string[]]) {
        if (typeof args[0] === "string") {
            if (args[0] !== Dsync.connectURL) {
                controller.age = 0;
                for (const hat of Hats) {
                    hat.bought = !!hat.default;
                    hat.equipped = !!hat.default;
                }
            }
            Dsync.connectURL = args[0];
        }
        const ws = new target(...args);
        ws.addEventListener("message", event => {
            const data = event.data;
            if (typeof data === "string" && /^\[.+\]$/.test(data)) {
                stringMessage(JSON.parse(data));
            } else {
                switch (Dsync.saves.buffer[0]) {
                    case WebsocketServer.PLAYERSTATS:
                        playerStats();
                        break;
                    case WebsocketServer.DELETECLAN:
                        deleteClan();
                        break;
                    case WebsocketServer.JOINCREATECLAN:
                        createClan();
                        break;
                    case WebsocketServer.UPDATECLAN:
                        updateClan();
                        break;
                    case WebsocketServer.MOVEUPDATE:
                        moveUpdate();
                        break;
                }
            }
        });
        return ws;
    }
});

export default class PacketManager {
    private readonly encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    private send(...args: readonly any[]) {
        Dsync.saves.send(new Uint8Array(args));
    }

    moveByBitmask(bitmask: number) {
        this.send(WebsocketClient.MOVE, bitmask);
    }
    
    changeAngle(angle: number) {
        angle = 65535 * (angle + Math.PI) / (2 * Math.PI),
        this.send(WebsocketClient.ANGLE, 255 & angle, angle >> 8 & 255);
    }
    
    selectByID(id: number) {
        this.send(WebsocketClient.selectByID, id);
    }
    
    attack(angle: number) {
        angle = 65535 * (angle + Math.PI) / (2 * Math.PI),
        this.send(WebsocketClient.ATTACK, 255 & angle, angle >> 8 & 255);
    }
    
    stopAttack() {
        this.send(WebsocketClient.STOPATTACK);
    }
    
    upgradeScythe(goldenCowID: number) {
        this.send(WebsocketClient.SCYTHE, 255 & goldenCowID, goldenCowID >> 8);
    }
    
    selectItemByType(type: number) {
        this.send(WebsocketClient.SELECTITEM, type);
    }
    
    equip(id: number) {
        this.send(WebsocketClient.HAT, id);
    }
    
    chat(message: string) {
        const bytes = this.encoder.encode(message);
        this.send(WebsocketClient.CHAT, ...bytes);
    }
    
    upgrade(id: number) {
        this.send(WebsocketClient.UPGRADE, id);
        controller.upgradeItem(id);
    }
    
    autoattack(toggle: boolean) {
        this.send(WebsocketClient.AUTOATTACK, Number(toggle));
    }
    
    moveAngle(angle: number) {
        angle = 65535 * (angle + Math.PI) / (2 * Math.PI),
        this.send(WebsocketClient.MOVEANGLE, 255 & angle, angle >> 8 & 255);
    }
    
    leaveClan() {
        this.send(WebsocketClient.LEAVECLAN);
    }
    
    joinClan(id: number) {
        this.send(WebsocketClient.JOIN, id);
    }
    
    accept(which: boolean) {
        this.send(WebsocketClient.ACCEPTDECLINE, which);
    }
    
    kick(id: number) {
        this.send(WebsocketClient.KICK, id);
    }
    
    createClan(name: string) {
        const bytes = this.encoder.encode(name);
        this.send(WebsocketClient.CREATECLAN, ...bytes);
    }
}