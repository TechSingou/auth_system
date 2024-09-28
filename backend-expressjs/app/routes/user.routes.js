const controller = require("../controllers/user.controller");
const { authJwt } = require ("../middlewares")



// For authoriszation 

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    // Public resource
    app.get("/api/test/all", controller.allAccess);

    // User role resource
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard)

    // Manager role resource
    app.get("/api/test/manager",[authJwt.verifyToken, authJwt.isManager], controller.managerBoard);

    //Admin role ressource
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}