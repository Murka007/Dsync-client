import { Dsync } from "..";
import { inGame, isInput, lerp } from "../utils/Common";
import settings from "./Settings";

const zoomHandler = () => {
    let wheels = 0;
    const scaleFactor = 150;

    window.addEventListener("wheel", event => {
        if (
            !(event.target instanceof HTMLCanvasElement) ||
            event.ctrlKey || event.shiftKey || event.altKey ||
            isInput() || !inGame()
        ) return;

        const scale = Dsync.scale
        const { w, h, w2, h2 } = scale;
        if (
            w2 === 1824 && h2 === 1026 &&
            (wheels = (wheels + 1) % 5) !== 0
        ) return;

        const zoom = !settings.reverseZoom && event.deltaY > 0 || settings.reverseZoom && event.deltaY < 0 ? -scaleFactor : scaleFactor;
        scale.w2 = Math.max(924, w2 + zoom);
        scale.h2 = Math.max(126, h2 + zoom);

        if (settings.smoothZoom) return;
        w[0] = scale.w2;
        h[0] = scale.h2;
        window.dispatchEvent(new Event("resize"));
    })
}

export default zoomHandler;