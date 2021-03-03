let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findById(req.body.id);
  if (!user.role.includes("admin")) {
    return res
      .status(400)
      .send("Your are Not Authorized for Access! Login as Admin");
  }

  req.isValidated = true;
  next();
};
