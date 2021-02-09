let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findById(req.body.id);
  if (!user.role.includes("patient")) {
    return res
      .status(400)
      .send("Your Not Authorized for Access! Login as User");
  }

  req.isValidated = true;
  next();
};
