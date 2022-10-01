import { Dsync, log } from "..";
import settings from "../modules/Settings";
import { TObjectAny } from "../types";

const attackAnimation = (
    type: number,
    id: number,
    weapon: number,
    isObject: number,
    entity: TObjectAny
) => {
    if (type === 0 && settings.weaponReloadBar) {
        const reload = Dsync.itemData[weapon].reload;
        entity.weaponMaxReload = reload;
        entity.weaponReload = -Dsync.step;
    }
}

export default attackAnimation;