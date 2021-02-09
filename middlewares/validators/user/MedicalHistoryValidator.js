let UserMedicalHistoryModel = require("../../../models/user/MedicalHistoryModel");
module.exports = async function (req, res, next) {
  const { error } = await UserMedicalHistoryModel.ValidateUserMedicalHistory(
    req.body
  );
  if (error) return res.status(400).send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
