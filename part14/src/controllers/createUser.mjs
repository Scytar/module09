import fs from "fs";
import { usersList, updateUserListInMemory } from "../routers/server.js"

export default function createUser(req, filePath){
    console.log(`${req.connection.remoteAddress} requested creation of new user.`);

    const newUser = {
        id: usersList.users.length+1,
        name: req.body.name,
        email: req.body.email,
        active: true
    }
    usersList.users.push(newUser)

    console.log(`Creating user ${newUser.name}...`)
    fs.writeFile(filePath, JSON.stringify(usersList), (err)=>{
        if (err) console.log(err) 

        console.log(`New user ${newUser.name} (ID ${(newUser.id)}) was created at ${filePath}`)

        console.log("Updating user list in memory...")
        updateUserListInMemory();
    })
    console.log(newUser)
    return newUser
}