const { func } = require("joi");
let Patient = require("../../models/PatientModel");
module.exports = async function(req, res, next) {
    console.log(await Patient.findOne({ emailAddress: req.body.emailAddress }))
    Patient.findOne({ emailAddress: req.body.emailAddress }).then(
        function(user) {
            console.log(user)
            if (user) {
                console.log(user)
                res.status(400).send("Email has been already registered")
            }
        })
    req.isValidated = true;
    next();
};