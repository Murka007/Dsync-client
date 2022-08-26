import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { ELayer, TCTX } from "../types";
import { formatObject } from "../utils/Common";
import { drawBar, getMarkerColor, marker, windmillRotation } from "../utils/Rendering";

const renderLayers = (ctx: TCTX, now: number) => {
    const entities = Dsync.entityList();

    for (let i=0;i<Dsync.itemList.length;i++) {
        const id = Dsync.itemList[i];

        for (let j=0;j<entities[id].length;j++) {
            const target = entities[id][j];
            const object = formatObject(target);
            if (object.ownerID === 0) continue;

            if (settings.turretReloadBar && target.type === ELayer.TURRET && target.turretReload !== undefined) {
                drawBar(ctx, object, target.turretReload, 3000, settings.turretReloadBarColor);
            }

            windmillRotation(target);

            const color = getMarkerColor(target, object.ownerID);
            if (color === null) continue;

            ctx.save();
            ctx.translate(object.x + target.dirX, object.y + target.dirY);
            marker(ctx, color);
            ctx.restore();
        }
    }
}

export default renderLayers;