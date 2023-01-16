const express = require("express")
const users = express.Router()
const {UserModel} = require("../modelFile/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//GET USERS DATA
users.get("/", async (req, res)=>{
    try {
        let data = await UserModel.find()
        res.send(data)
    } catch (error) {
        console.log("something went wrong in get users data")
    }
})



//REGISTER USERS DATA
users.post("/register", async (req, res)=>{
    try {
        let {name, email, gender, password} = req.body
        let alreadyData = await UserModel.find({email})
         if(alreadyData.length>0){
             res.send({msg:"email is already register"})
             return
         }
         bcrypt.hash(password, 5, async (err, hashPassword)=>{
             if(err){
                 res.send({msg:"error"})
             }else{
                 let register = new UserModel({name, email, gender, password:hashPassword})
                 await register.save()
                 res.send({msg:"singup successfull"})
             }
         });

    } catch (error) {
        console.log("something went wrong in post users data")
    }
})



//LOGIN USER DATA
users.post("/login", async (req, res)=>{
    try {
        const {email, password} = req.body
        const matchData = await UserModel.find({email})
        if(matchData.length>0){
            bcrypt.compare(password, matchData[0].password, function(err, result) {
                if(result){
                    var token = jwt.sign({userID:matchData[0]._id}, 'masai');
                    res.send({msg:"login successful", name:matchData[0].name, token})
                }
            });
        }else{
            res.send({msg: "plz singup first"})
        }
    } catch (error) {
        console.log("something went wrong in get users data")
    }
})



module.exports = {users}