import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { read } from "./read.mjs";
import { create } from "./create.js";
import { update } from "./update.js";
import { remove } from "./remove.js";
import usersList from "./users.json" assert {type: "json"}

const app = express();
const HOST = "127.0.0.1"
const PORT = 8080;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.listen(PORT, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}`)
});

app.get("/users" , (req , res)=>{
    res.send(read())
})
app.post("/users" , (req , res)=>{
    if (create(req.body)) {
        res.sendStatus(201)
    }

})
app.put("/users/:id" , (req , res)=>{
    const id = req.params.id
    update(id, req.body)
    res.sendStatus(200)
})
app.delete("/users/:id" , (req , res)=>{
    const id = req.params.id
    remove(id);
    res.sendStatus(200)
})