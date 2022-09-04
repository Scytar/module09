import fs from 'fs'
import { usersList, updateUserListInMemory } from "../routers/server.js"

export default function deleteUser(req, filePath){
    console.log(`${req.connection.remoteAddress} requested soft deletion of user ID ${req.params.id}`)

    usersList.users.sort((a,b)=>{
        return a.id-b.id
    })

    const userToDelete = usersList.users[req.params.id-1]

    console.log(`Soft deleting user ${userToDelete.name} (ID ${userToDelete.id})...`)

    userToDelete.active = false;

    console.log("Writing changes...")
    fs.writeFile(filePath, JSON.stringify(usersList), (err)=>{
        if (err) console.log(err) 

        console.log(`${userToDelete.name} (ID ${(userToDelete.id)}) was soft deleted from ${filePath}`)

        console.log("Updating user list in memory...")
        updateUserListInMemory();
    })

    return userToDelete
}