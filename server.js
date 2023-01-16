
const express = require("express")
const {connection} = require("./configFile/connection")
const {users} = require("./routerFile/userRouter")
const {posts} = require("./routerFile/postUser")
const  {authorization} = require("./middlewareFile/authorization")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors())
app.use("/users", users)
app.use(authorization)
app.use("/posts", posts)

app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("connected to Database")
    } catch (error) {
        console.log("something error in port")
    }
    console.log(`server is running on port ${process.env.port}`)
})