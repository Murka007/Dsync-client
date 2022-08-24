import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { ELayer, TCTX, TObjectAny } from "../types";
import { formatObject } from "../utils/Common";
import { drawBar, getMarkerColor, marker, windmillRotation } from "../utils/Rendering";

const drawItems = (target: TObjectAny, id: number, ctx: TCTX, step: number) => {
    const object = formatObject(target);
    if (object.ownerID === 0) return;

    if (settings.turretReloadBar && object.type === ELayer.TURRET && target.turretReload !== undefined) {
        drawBar(ctx, { ...object, x: 0, y: 0 }, target.turretReload, 3000, settings.turretReloadBarColor);
    }

    const color = getMarkerColor(target, object.ownerID) || "red";
    if (color === null) return;
    marker(ctx, color);

    windmillRotation(target);
}

export default drawItems;