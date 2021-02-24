let UserModel = require("../../../models/user/UserModel");
module.exports = async function (req, res, next) {
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(req.body);
  if (!user) {
    return res.status(400).send({ error: "Email not found" });
  } else {
    user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res.status(400).send("Your password is incorrect");
    }
  }
  req.isValidated = true;
  next();
};
