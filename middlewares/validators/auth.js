let { UserModel } = require("../../models/UserModel");
module.exports = async function(req, res, next) {
    await UserModel.findById(req.body.id).then(async function(user) {
        if (!user) {
            res.status(400).send("User not Found");
        }
    });
    req.isValidated = true;
    next();
};