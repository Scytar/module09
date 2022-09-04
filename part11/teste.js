import express from "express"
import { sum } from "./sum.js"
import { subt } from "./subt.js"
import { mult } from "./mult.js"
import { div } from "./div.js"

const app = express();
const port = 8080;

app.listen(port)
app.get("/calculador/:operation/:var1/:var2" , (req, res)=>{
    const var1 = parseInt(req.params.var1);
    const var2 = parseInt(req.params.var2);
    const operation = req.params.operation;

    let response = null
    switch (operation) {
        case "sum":
            response = sum(var1,var2);
            break;
        case "subt":
            response = subt(var1,var2);
            break;
        case "mult":
            response = mult(var1,var2);
            break;
        case "div":
            response = div(var1,var2);
            break;
    }

    console.log(var1, var2, operation, response);
    res.send({result:`${response}`});
})
