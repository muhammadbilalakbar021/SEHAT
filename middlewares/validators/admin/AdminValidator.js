let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  const { error } = await UserModel.validateAddDoctor(req.body);
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
