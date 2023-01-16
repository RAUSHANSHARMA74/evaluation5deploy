
const jwt = require("jsonwebtoken")

const authorization = (req, res, next) =>{
    let token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token, "masai")
        if(decoded){
            req.body.userID = decoded.userID
            next()
        }else{
            res.send({msg:"plz login first"})
        }
    }else{
        res.send({msg:"plz login first"})
    }
}

module.exports = {authorization}