let UserModel = require("../../../models/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findOne({ emailAddress: req.body.emailAddress });
  if (user) {
    return res.status(400).send("Email has been already registered");
  }
  req.isValidated = true;
  next();
};
