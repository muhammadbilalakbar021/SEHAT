let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findById(req.body.id);
  if (!user) {
    return res.status(400).send("User not Found!");
  }
  req.isValidated = true;
  next();
};
