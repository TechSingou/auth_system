/** Controller for Registration, Login, Logout
 * We have three functions : 
 * signup
 * signin
 * signout
 */



const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req,res) => {
    const user = new User({
        name: req.body.name,
        telNumber: req.body.telNumber,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8),
    });

    try{
       const userSaved =  await user.save();
       if(req.body.roles){
            const roles = await Role.find(
                { name: { $in: req.body.roles }}
            );
            userSaved.roles= roles.map((role)=> role._id)
            await userSaved.save();
            res.send({message: "User was registered successfully!"});
       }else{
            const defaultRole = await Role.findOne({name: "user"});
            userSaved.roles = [defaultRole._id];
            await userSaved.save();
            res.send({message: "User was registered successfully!"});
       }

    }catch(err){
        res.status(500).send({message:err});
    }
};

exports.signin = async (req,res) =>{
    try {
        const user = await User.findOne({ email: req.body.email }).populate("roles","-__v");


        if(!user){
            return res.status(404).send({message:"User Not found."});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid){
            return res.status(401).send({message: "Invalid Password!"});
        }

        const jwtToken = jwt.sign(
            { id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 300 // 5 minutes
            }
        );

        let authorities = [];
        for(let i = 0; i< user.roles.length; i++){
            authorities.push("ROLE_"+ user.roles[i].name.toUpperCase());
        }

        req.session.token = jwtToken;
        
        res.status(200).send({
            id:user._id,
            name: user.name,
            telNumber: user.telNumber,
            email: user.email,
            roles: authorities
        });
    } catch (error) {
        res.status(500).send({message:err});
        return;
    }
};

exports.signout = async (req,res) => {
    try{
        req.session=null;
        return res.status(200).send({message: "You've been signed out!"});
    } catch(err) {
        this.next(err);
    }
};