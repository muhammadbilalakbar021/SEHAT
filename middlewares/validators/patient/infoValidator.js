let { PatientSchema } = require("../../../models/PatientModel");
module.exports = async function(req, res, next) {
    const { error } = await PatientSchema.validateInfo(req.body);
    if (error)
        return res.status(400).send(
            error.details.map((d) => {
                return { variable: d.path[0], error: d.message };
            })
        );
    req.isValidated = true;
    next();
};