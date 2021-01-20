const { func } = require("joi");
let { PatientModel } = require("../../models/PatientModel");
module.exports = async function(req, res, next) {
    PatientModel.findOne({ emailAddress: req.body.emailAddress }).then(
        function(user) {
            if (user) {
                res.status(400).send("Email has been already registered");
            }
        });
    req.isValidated = true;
    next();
};