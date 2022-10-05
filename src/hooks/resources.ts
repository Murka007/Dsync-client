import { controller, Dsync, log } from "..";

const resources = (
    food: number,
    wood: number,
    stone: number,
    gold: number
) => {
    controller.resources = {
        food,
        wood,
        stone,
        gold
    }
}

export default resources;