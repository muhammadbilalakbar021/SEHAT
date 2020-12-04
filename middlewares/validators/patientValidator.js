let Patient = require("../../models/PatientModel");
module.exports = async function(req, res, next) {
    const validate = await Patient.validate(req.body);
    if (!validate) res.status(400).send("Invalid Data");
    req.isValidated = true;
    next();
}