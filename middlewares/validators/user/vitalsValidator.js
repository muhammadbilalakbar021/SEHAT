let VitalsModel = require("../../../models/vitalsModels");
module.exports = async function(req, res, next) {
    console.log(req.body)
    const { error } = await VitalsModel.ValidateUserVitals(req.body);
    if (error) return res.send({ error: error.details[0].message });
    req.isValidated = true;
    next();
};