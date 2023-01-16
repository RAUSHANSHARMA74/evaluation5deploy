
const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String
})

const UserModel = mongoose.model("usersData", usersSchema)

module.exports = {UserModel}