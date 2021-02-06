let userInformationSchema = require("../../../models/informationModel");
module.exports = async function(req, res, next) {
    const { error } = await userInformationSchema.ValidateUserInformation(req.body);
    if (error)
        return res.status(400).send({ error: error.details[0].message });
    req.isValidated = true;
    next();
};