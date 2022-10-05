import { TCTX, TObjectAny } from "../types";
import { RenderManager } from "../utils/Rendering";

const renderItems = (target: TObjectAny, id: number, ctx: TCTX, step: number) => {
    RenderManager.renderMarker(ctx, target);
}

export default renderItems;