
const mongoose = require("mongoose")

const postsSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    userID : String
})

const PostsModel = mongoose.model("postsData", postsSchema)

module.exports = {PostsModel}