let { PatientModel } = require("../../models/PatientModel");
module.exports = async function (req, res, next) {
  await PatientModel.findById(req.body.id).then(async function (user) {
    if (!user) {
      res.status(400).send("User not authorized");
    }
  });
  req.isValidated = true;
  next();
};
