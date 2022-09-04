import usersList from "./users.json" assert {type: "json"}
export function read(){
    const filteredUsers = usersList.filter((e)=>{return e.active})

    return JSON.stringify(filteredUsers)
}