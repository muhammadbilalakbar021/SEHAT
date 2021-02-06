let UserInformationModel = require("../../../models/InformationModel");
module.exports = async function (req, res, next) {
  const { error } = await UserInformationModel.ValidateUserInformation(
    req.body
  );
  if (error) return res.status(400).send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
