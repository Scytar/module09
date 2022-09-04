import usersList from "./users.json" assert {type: "json"}
export function remove(id){
    const userIndex = usersList.findIndex(e => e.id == id);
    usersList[userIndex].active = false;

    return true
}