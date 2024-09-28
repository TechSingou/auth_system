const db = require("../models")
const ROLES = db.ROLES;
const User = db.user;

// Middleware to check duplication 
checkDuplicateUserEmailOrTelNumber = async (req, res,next)=>{
    // Tel Number 
    try{
        const userByNumber = await User.findOne({ telNumber: req.body.telNumber});
        const userByEmail = await User.findOne({ email: req.body.email });
        if(userByNumber){
            res.status(400).send({message: "Failed! Telephone number is already in use!"});
            return;
        }

        if(userByEmail){
            res.status(400).send({message: "Failed! Email is already in use!"});
            return;
        }

        next();
       
    }catch(err){
        res.status(500).send({message:err});
        return;
    }
};

checkRolesExisted = (req,res, next) => {
    if(req.body.roles) {
        for(let i=0; i<req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist`
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUserEmailOrTelNumber,
    checkRolesExisted
};

module.exports = verifySignUp;