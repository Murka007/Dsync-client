import { Dsync } from "..";

let start = Date.now();
const moveUpdate = () => {
    const now = Date.now();
    Dsync.step = now - start;
    start = now;
}

export default moveUpdate;