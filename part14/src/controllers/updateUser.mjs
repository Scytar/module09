import fs from 'fs'
import { usersList, updateUserListInMemory } from "../routers/server.js"

export default function updateUser(req, filePath){
    console.log(`${req.connection.remoteAddress} requested data update on user ID ${req.params.id}.`)

    usersList.users.sort((a,b)=>{
        return a.id-b.id
    })

    const userToUpdate = usersList.users[req.params.id-1]

    console.log(`Updating user ${userToUpdate.name} (ID ${userToUpdate.id})...`)
    if (req.body.name) {
        userToUpdate.name = req.body.name
    }

    if (req.body.email) {
        userToUpdate.email = req.body.email
    }

    console.log("Writing changes...")
    fs.writeFile(filePath, JSON.stringify(usersList), (err)=>{
        if (err) console.log(err) 

        console.log(`${userToUpdate.name} (ID ${(userToUpdate.id)}) was updated at ${filePath}`)

        console.log("Updating user list in memory...")
        updateUserListInMemory();
    })

    return userToUpdate
}