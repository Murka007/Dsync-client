import { controller, Dsync, log } from "..";
import { Items } from "../constants/Items";
import settings from "../modules/Settings";
import { TCTX, TObjectAny } from "../types";
import { RenderManager } from "../utils/Rendering";

const drawItemBar = (ctx: TCTX, imageData: TObjectAny, index: number) => {
    if (!settings.itemCounter) return;

    const id = Dsync.saves.defaultData[Dsync.props.itemBar][index];
    const type = Items[id].itemType;
    const currentCount = Dsync.saves.defaultData[Dsync.props.currentCount][type];
    const maxCount = controller.maxCount[type];
    if (maxCount === 0) return;

    const x = imageData[Dsync.props.x] - 10;
    const y = imageData[Dsync.props.y] + 10;
    const w = imageData.width;

    RenderManager.renderText(ctx, `${currentCount}/${maxCount}`, (width) => {
        return [
            x + w - width,
            y
        ]
    }, {
        font: "bold 16px Montserrat"
    })
}

export default drawItemBar;