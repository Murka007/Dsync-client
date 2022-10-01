import { Dsync } from "..";
import settings from "../modules/Settings";
import { TCTX, TObjectAny } from "../types";
import { itemBar } from "../utils/Control";
import { renderText } from "../utils/Rendering";

const drawItemBar = (ctx: TCTX, imageData: TObjectAny, index: number) => {
    if (!settings.itemCounter) return;

    const itemId = itemBar(index);
    const itemType = Dsync.itemData[itemId][Dsync.props.itemType];
    const currentCount = Dsync.defaultData[Dsync.props.currentCount][itemType];
    const maxCount = Dsync.maxCount[itemType];
    if (maxCount === 0) return;

    const x = imageData[Dsync.props.x] - 10;
    const y = imageData[Dsync.props.y] + 10;
    const w = imageData.width;

    renderText(ctx, `${currentCount}/${maxCount}`, (width) => {
        return [
            x + w - width,
            y
        ]
    }, {
        font: "bold 16px Montserrat"
    })
}

export default drawItemBar;