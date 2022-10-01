import { Dsync, log } from "..";

const resources = (
    food: number,
    wood: number,
    stone: number,
    gold: number
) => {
    Dsync.resources = {
        food,
        wood,
        stone,
        gold
    }
}

export default resources;