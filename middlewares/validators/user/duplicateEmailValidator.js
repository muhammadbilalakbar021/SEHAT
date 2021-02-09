let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Email has been already registered");
  }
  req.isValidated = true;
  next();
};
