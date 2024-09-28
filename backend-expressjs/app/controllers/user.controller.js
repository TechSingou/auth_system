/**
 * Public and Private resources
 * @param {Rquest parameter} req 
 * @param {*Response parameter} res 
 */

exports.allAccess = (req,res) => {
    res.status(200).send("Public content");
}

exports.userBoard = (req,res) => {
    res.status(200).send("User  Content.");
};

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin Content");
};

exports.managerBoard = (req,res) => {
    res.status(200).send("Manager Content");
};
