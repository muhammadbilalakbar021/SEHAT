const express = require("express");
const duplicateEmailValidator = require("../../../../middlewares/validators/user/duplicateEmailValidator");
const loginValidator = require("../../../../middlewares/validators/user/loginValidator");
const UserValidator = require("../../../../middlewares/validators/user/UserValidator");
const UserModel = require("../../../../models/user/UserModel");
const router = express.Router();

// Get request for returning User by login
router.post("/login", loginValidator, async (req, res) => {
  try {
    const User = await UserModel.getUserByEmailPassword(req.body);
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send("Error from User login!");
  }
});

// Post request for adding User *checked*
router.post(
  "/signup",
  UserValidator,
  duplicateEmailValidator,
  async (req, res) => {
    try {
      User = new UserModel();
      p = await User.addUser(req.body);
      // Return User list
      return res.status(200).send(p);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
);

module.exports = router;
