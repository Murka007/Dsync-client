import { controller, Dsync } from "..";
import { Scale } from "../modules/zoomHandler";
import { lerp } from "../utils/Common";

const renderLoop = () => {
    if (!controller.inGame) return;
    Scale.lerp.w = lerp(Scale.lerp.w, Scale.current.w, 0.180);
    Scale.lerp.h = lerp(Scale.lerp.h, Scale.current.h, 0.180);
    window.dispatchEvent(new Event("resize"));
}

export default renderLoop;