import { controller, Dsync, log } from "..";
import { formatAge } from "../utils/Common";

const playerStats = () => {
    const b = Dsync.saves.buffer;
    const age = formatAge(b[1] | b[2] << 8 | b[3] << 16 | b[4] << 24);
    const food = b[5] | b[6] << 8 | b[7] << 16 | b[8] << 24;
    const wood = b[9] | b[10] << 8 | b[11] << 16 | b[12] << 24;
    const stone = b[13] | b[14] << 8 | b[15] << 16 | b[16] << 24;
    const gold = b[17] | b[18] << 8 | b[19] << 16 | b[20] << 24;

    if (age !== 0) {
        controller.age = age;
    }
    
    controller.resources = {
        food,
        wood,
        stone,
        gold
    }
}

export default playerStats;