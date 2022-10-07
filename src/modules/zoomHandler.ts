import { controller, Dsync } from "..";
import { isInput } from "../utils/Common";
import settings from "./Settings";

export const Scale = {
    Default: {
        w: 1824,
        h: 1026
    },
    lerp: {
        w: 1824,
        h: 1026
    },
    current: {
        w: 1824,
        h: 1026
    }
}

export const getMinScale = (scale: number) => {
    let w = Scale.Default.w;
    let h = Scale.Default.h;
    while (w > scale && h > scale) {
        w -= scale;
        h -= scale;
    }
    return {
        w,
        h
    }
}

const zoomHandler = () => {
    let wheels = 0;
    const scaleFactor = 150;

    window.addEventListener("wheel", event => {
        if (
            !(event.target instanceof HTMLCanvasElement) ||
            event.ctrlKey || event.shiftKey || event.altKey ||
            isInput() || !controller.inGame
        ) return;

        const { Default, current, lerp } = Scale;
        if (
            current.w === Default.w && current.h === Default.h &&
            (wheels = (wheels + 1) % 5) !== 0
        ) return;

        const { w, h } = getMinScale(scaleFactor); 
        const zoom = !settings.reverseZoom && event.deltaY > 0 || settings.reverseZoom && event.deltaY < 0 ? -scaleFactor : scaleFactor;
        current.w = Math.max(w, current.w + zoom);
        current.h = Math.max(h, current.h + zoom);

        if (settings.smoothZoom) return;
        lerp.w = current.w;
        lerp.h = current.h;
        window.dispatchEvent(new Event("resize"));
    })
}

export default zoomHandler;