import { Dsync } from "..";
import { TCTX } from "../types";
import { drawMarkers } from "../utils/Rendering";

const renderLayers = (ctx: TCTX, now: number) => {
    const entities = Dsync.entityList();

    for (let i=0;i<Dsync.itemList.length;i++) {
        const id = Dsync.itemList[i];

        for (let j=0;j<entities[id].length;j++) {
            const target = entities[id][j];
            drawMarkers(ctx, target, true);
        }
    }
}

export default renderLayers;