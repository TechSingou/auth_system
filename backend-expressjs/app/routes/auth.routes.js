// Routes that handle requests to redirect to appropriate controllers

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


// For auhentification
module.exports = function(app){
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUserEmailOrTelNumber,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/signout", controller.signout);
};
