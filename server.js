const {db} = require("./config/database")
const express = require("express")
const app = express()

app.get("/", (req,res)=>{
    res.send("This is home page")
})


app.listen(4444, ()=>{
    console.log("Server is running on http://localhost:4444")
})