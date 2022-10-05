import { Dsync, log } from "..";
import { Items } from "../constants/Items";
import { ELayer } from "../constants/LayerData";
import settings from "../modules/Settings";
import { TObjectAny } from "../types";

const attackAnimation = (
    type: number,
    id: number,
    weapon: number,
    isObject: number,
    entity: TObjectAny
) => {
    if (type === ELayer.PLAYER && settings.weaponReloadBar) {
        const reload = Items[weapon].reload || 0;
        entity.weaponMaxReload = reload;
        entity.weaponReload = -Dsync.step;
    }
}

export default attackAnimation;