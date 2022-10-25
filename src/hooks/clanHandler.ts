import { Dsync, log } from "..";

export let teammates: number[] = [];

const createClan = () => {
    const b = Dsync.saves.buffer;
    const len = Dsync.saves.byteLength();
    teammates = [...b.slice(3, len)];
}

const updateClan = () => {
    const b = Dsync.saves.buffer;
    const len = Dsync.saves.byteLength();
    teammates = [...b.slice(2, len)];
}

const deleteClan = () => {
    teammates = [];
}

export {
    createClan,
    updateClan,
    deleteClan
}