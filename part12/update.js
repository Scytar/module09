import usersList from "./users.json" assert {type: "json"}
export function update(id, data){
    const userIndex = usersList.findIndex(e => e.id == id);
    const user = usersList[userIndex]
    
    usersList[userIndex] = {
        id: user.id,
        active: user.active,
        name: data.name ?? user.name,
        age: data.age ?? user.age,
        uf: data.uf ?? user.uf,
        email: data.email ?? user.email
    }

    return true
}