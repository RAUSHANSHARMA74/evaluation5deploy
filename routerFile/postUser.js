const { query } = require("express")
const express = require("express")
const posts = express.Router()
const {PostsModel} = require("../modelFile/postsModel")


posts.get("/", async (req, res)=>{
    try {
        let id = req.body.userID
        let data = await PostsModel.find()
        let filterData = data.filter((item)=>{
            return id == item.userID
        })
        let device1 = req.query.device1
        let device2 = req.query.device2
        if(device1 || device2){
            let data = await PostsModel.find({$or:[{device:device1},{device:device2}]})
            res.send(data)
        }else{

            res.send(filterData)
        }
    } catch (error) {
        console.log("something went wrong in get  data")
    }
})




posts.post("/create",async (req, res)=>{
    try {
        let createData = req.body
        const create = new PostsModel(createData)
        await create.save()
        res.send({msg:"your post is created"})
    } catch (error) {
        
    }
})

//PATCH USER DATA
posts.patch("/update/:id", async (req, res)=>{
    try {
        const {title, body, device, userID} = req.body
        let id = req.params.id
        const matchid = req.body.userID
        if(matchid==userID){
            const update = {title, body, device}
            await PostsModel.findByIdAndUpdate({_id:id}, update)
            res.send({msg:"your post is updated"})
        }else{
            res.send({msg:"plz updata your own created posts"})
        }
       
    } catch (error) {
        console.log("something went wrong in update users data")
    }
})


//DELETE USER DATA
posts.delete("/delete/:id", async (req, res)=>{
    try {
        let id = req.params.id
        let data = await PostsModel.find({_id:id})
        const matchid = req.body.userID
        if(matchid==data[0].userID){
            await PostsModel.findByIdAndUpdate({_id:id})
            res.send({msg:"your post is deleted"})
        }else{
            res.send({msg:"plz deleted your own created posts"})
        }
    } catch (error) {
        console.log("something went wrong in delete users data")
    }
})

module.exports = {posts}