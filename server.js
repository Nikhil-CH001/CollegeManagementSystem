const {db} = require("./config/database")
const express = require("express")
const app = express()

const pageRoutes = require("./routes/pageRoutes")
const authRoutes = require("./routes/authRoutes")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))



// routes
app.use("/", pageRoutes)
app.use("/", authRoutes)

app.listen(4444, ()=>{
    console.log("Server is running on http://localhost:4444")
})