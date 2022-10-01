import { Dsync } from "..";
import { lerp } from "../utils/Common";

const renderLoop = () => {
    const { w, h, w2, h2 } = Dsync.scale;
    w[0] = lerp(w[0], w2, 0.180);
    h[0] = lerp(h[0], h2, 0.180);
    window.dispatchEvent(new Event("resize"));
}

export default renderLoop;