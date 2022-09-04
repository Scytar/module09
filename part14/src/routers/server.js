import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";

import getUsers from "../controllers/readUsers.mjs";
import createUser from "../controllers/createUser.mjs";
import updateUser from "../controllers/updateUser.mjs";
import deleteUser from "../controllers/deleteUser.mjs";

const app = express();
const HOST = "127.0.0.1"
const PORT = 80;
const databasePath = "E:/Downloads/Alpha EdTech/Git Repository/module09/part14/src/data/"
const publicPath = "E:/Downloads/Alpha EdTech/Git Repository/module09/part14/src/public/"

//Store user list into memory at the start of the server
export let usersList = JSON.parse(fs.readFileSync(databasePath+"db.json", "utf8", (err)=>{
    if (err) console.log(err) 
}))

export function updateUserListInMemory(){
    fs.readFile(databasePath+"db.json", "utf8", (err, data)=>{
        if (err) console.log(err) 
        usersList = JSON.parse(data);
        console.log("User list in memory updated successfully!")
        console.log('')
    })
}

// Middlewares
app.use('/', express.static(publicPath))
app.use(bodyParser.json());
app.use(cors());
// app.use(helmet());
// app.use(morgan('combined'));

app.listen(PORT, ()=>{
    console.log(`=================== Server running at http://${HOST}:${PORT} ===================`)
    console.log('')
});

// Routes
app.get(["/users", "/users/:id"], (req, res)=>{
    res.status(200).json(getUsers(req, usersList.users))
})

app.get("/*", (req, res)=>{
    res.sendStatus(404)
})

app.post("/users", (req, res)=>{
    res.status(201).json(createUser(req, (databasePath+"db.json")))
})

app.put("/users/:id", (req, res)=>{
    res.status(200).json(updateUser(req, (databasePath+"db.json")))
})

app.delete("/users/:id", (req, res)=>{
    res.status(200).json(deleteUser(req, (databasePath+"db.json")))
})