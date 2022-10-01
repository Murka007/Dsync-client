import { TCTX, TObjectAny } from "../types";
import { drawMarkers } from "../utils/Rendering";

const drawItems = (target: TObjectAny, id: number, ctx: TCTX, step: number) => {
    drawMarkers(ctx, target, false);
}

export default drawItems;