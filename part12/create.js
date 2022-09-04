import usersList from "./users.json" assert {type: "json"}
export function create(data){

    const newUser = {
        id: usersList.length+1,
        active: true,
        name: data.name,
        age: data.age,
        uf: data.uf
    }
    usersList.push(newUser)
    return true
}