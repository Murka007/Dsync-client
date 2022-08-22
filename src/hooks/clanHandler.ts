export let teammates: number[] = [];

const UpdateClanList = (userList: number[]) => {
    teammates = userList;
}

const DeleteClan = () => {
    teammates = [];
}

export {
    UpdateClanList,
    DeleteClan
}