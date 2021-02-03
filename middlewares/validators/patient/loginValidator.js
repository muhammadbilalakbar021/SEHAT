let { PatientModel } = require("../../../models/PatientModel");
module.exports = async function(req, res, next) {
    await PatientModel.findOne({ emailAddress: req.body.emailAddress }).then(
        async function(user) {
            if (!user) {
                res.status(400).send("Email not found");
            } else {
                await PatientModel.findOne({ emailAddress: req.body.emailAddress, password: req.body.password }).then(
                    async function(user) {
                        if (!user) {
                            res.status(400).send("Your password is incorrect");
                        }
                    });
            }
        });
    req.isValidated = true;
    next();
};