import { log } from "..";

type TCallback = [() => any, () => any, () => any];
export class TimeoutManager {
    private readonly callbacks: Readonly<TCallback>;
    private readonly delay: (start: number) => boolean;
    private active: boolean;
    private old: number;

    constructor(
        callbacks: TCallback,
        delay: (start: number) => boolean
    ) {
        this.callbacks = callbacks;
        this.delay = delay;
        this.active = false;
        this.old = Date.now();
    }

    static waitUntil(condition: () => boolean, time?: number, callback?: () => void) {
        return new Promise<void>(resolve => {
            const start = Date.now();
            const int = setInterval(() => {
                if (
                    typeof time === "number" &&
                    Number.isFinite(time) &&
                    Date.now()-start>time || condition()
                ) {
                    clearInterval(int);
                }
                if (condition()) {
                    if (typeof callback === "function") return callback();
                    resolve();
                }
            }, 50);
        })
    }

    start() {
        if (this.active) return;
        this.active = true;
        this.old = Date.now();
        this.callbacks[0]();
    }

    async stop() {
        if (!this.active) return;
        this.callbacks[1]();
        if (!this.delay(this.old)) await TimeoutManager.waitUntil(() => this.delay(this.old), 3000);
        this.callbacks[2]();

        this.active = false;
    }

    isActive() {
        return this.active;
    }
}