import { Dsync, log } from "..";
import { TObjectAny } from "../types";

const attackAnimation = (
    type: number,
    id: number,
    weapon: number,
    isObject: number,
    entity: TObjectAny
) => {

    if (type === 0) {
        const reload = Dsync.itemData[weapon].reload;
        entity.weaponMaxReload = reload;
        entity.weaponReload = -Dsync.step;
    }
}

export default attackAnimation;