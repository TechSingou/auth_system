const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models/index");
const dbConfig = require("./app/config/db.config");

const app=express();
const Role = db.role;

var corsOptions = {
    credentials: true,
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-unlencoded
app.use(express.urlencoded({extended:true}));

app.use(
    cookieSession({
        name:"techsingou-session",
        keys:["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true
    })
);

// Open connexion to db
/*db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewParser: true,
    useUnifiedTopology: true
})*/
db.mongoose.connect(dbConfig.DB)
.then(()=>{
    console.log("Successfully connect to mongoDB.");
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
})

async function initial() {
    try{
        const count = await Role.estimatedDocumentCount();
        if(count ===0){
            try{
                const roles = [
                    { name: "user"},
                    { name: "manager"},
                    { name: "admin"}
                ];
    
                for(const roleData of roles){
                    const role = new Role(roleData);
                    await role.save();
                    console.log(`Added '${role.name}' to roles collection`);
                }
            }catch(err){
                console.error("Error adding roles:", err);
            }
        }
    }catch (err) {
        console.error(err);
    }
}



// Simple route
app.get("/", (req,res)=>{
    
    res.json({message: "Welcome to techsingou auth application. "})
})

// Api routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// Set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});