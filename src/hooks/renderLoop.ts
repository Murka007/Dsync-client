import { controller, Dsync, log } from "..";
import settings from "../modules/Settings";
import { Scale } from "../modules/zoomHandler";
import { TCTX } from "../types";
import { lerp } from "../utils/Common";

HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
    apply(target, _this: HTMLCanvasElement, args: ["2d"]) {
        const ctx = target.apply(_this, args) as TCTX;
        if (_this.id === "game-canvas") {
            ctx.clearRect = new Proxy(ctx.clearRect, {
                apply(target, _this: TCTX, args: Parameters<typeof ctx.clearRect>) {
                    target.apply(_this, args);

                    if (controller.inGame && settings.smoothZoom) {
                        Scale.lerp.w = lerp(Scale.lerp.w, Scale.current.w, 0.180);
                        Scale.lerp.h = lerp(Scale.lerp.h, Scale.current.h, 0.180);
                        window.dispatchEvent(new Event("resize"));
                    }
                }
            })
            HTMLCanvasElement.prototype.getContext = target;
        }
        return ctx;
    }
})