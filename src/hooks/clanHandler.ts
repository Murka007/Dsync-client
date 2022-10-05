import { log } from "..";

export let teammates: number[] = [];

const createClan = (userList: number[]) => {
    teammates = userList;
}

const updateClan = (userList: number[]) => {
    teammates = userList;
}

const deleteClan = () => {
    teammates = [];
}

export {
    createClan,
    updateClan,
    deleteClan
}