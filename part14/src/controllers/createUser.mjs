import fs from "fs";
import { usersList } from "../routers/server.js"

export default function createUser(req, filePath){
    console.log(`${req.connection.remoteAddress} requested creation of new user.`);

    
    console.log(`Creating user ${newUser.name}...`)
    console.log(newUser)
    const newUser = {
        id: usersList.users.length+1,
        name: req.body.name,
        email: req.body.email,
        active: true
    }

    console.log("Updating user list in memory...")
    usersList.users.push(newUser)
    console.log("User list in memory updated successfully!")

    console.log(`Writing user ${newUser.name} on database...`)
    fs.writeFile(filePath, JSON.stringify(usersList), (err)=>{
        if (err) console.log(err) 

        console.log(`New user ${newUser.name} (ID ${(newUser.id)}) was written at ${filePath}`)
        console.log('')
    })

    return newUser
}