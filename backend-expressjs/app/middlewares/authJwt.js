const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

const User = db.user;
const Role = db.role;

verifyToken = (req,res,next) =>{
    let token = req.session.token;
    console.log(token);
    
    if(!token) {
        return res.status(403).send({message: "No token provided"});
    }

    jwt.verify(token,config.secret, (err,decoded) => {
        if(err){
            res.status(401).send({ message: "Unauthorized!" });
            return;
        }
        req.userId = decoded.id
        next();
    })
};

isAdmin = async (req,res,next) => {
    try{
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles }});
        for(let i = 0; i< roles.length; i++){
            if(roles[i].name === "admin"){
                next();
                return;
            }
        }
        res.status(403).send({message: "Require Admin Role!"});
    }catch(err){
        res.status(500).send({message:err});
        return;
    }
};


isManager = async (req,res,next) => {
    try{
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles }});
        for(let i = 0; i< roles.length; i++){
            if(roles[i].name === "manager"){
                next();
                return;
            }
        }
        res.status(403).send({message: "Require manager Role!"});
        return;
    }catch(err){
        res.status(500).send({message: err});
        return;
    }
};


const authJwt = {
    verifyToken,
    isAdmin,
    isManager
};

module.exports = authJwt;



