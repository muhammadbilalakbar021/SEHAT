const express = require("express");
const router = express.Router();
const UserModel = require("../../../models/UserModel");
const UserValidator = require("../../../middlewares/validators/user/UserValidator");
const duplicateEmailValidator = require("../../../middlewares/validators/user/duplicateEmailValidator");
const loginValidator = require("../../../middlewares/validators/user/loginValidator");

// Get request for returning all User's list *checked*
router.get("/", async (req, res) => {
  try {
    const User = await UserModel.getUser();
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send("Error getting User's list!");
  }
});

// Get request for returning User by login
router.post("/login", loginValidator, async (req, res) => {
  try {
    const User = await UserModel.getUserByEmailPassword(req.body);
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send("Error from User login!");
  }
});

// Get request for returning specific User *checked*
router.get("/:id", async (req, res) => {
  try {
    let User = await UserModel.getUserById(req.params.id);
    // If User exist, return User record
    return res.status(400).send(User);
  } catch (err) {
    return res.status(400).send("Error from Getting User Record!");
  }
});

// Post request for adding User *checked*
router.post("/", UserValidator, duplicateEmailValidator, async (req, res) => {
  try {
    User = new UserModel();
    p = await User.addUser(req.body);
    // Return User list
    return res.status(200).send(p);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/:page?/:perPage?", async (req, res) => {
  try {
    const page = req.params.page ? Number(req.params.page) : 1;
    const perPage = req.params.perPage ? Number(req.params.perPage) : 1;
    const Users = await userSchema.getPage(page, perPage);
    return res.send(Users);
  } catch (err) {
    return res.status(400).send("Error loading page list!");
  }
});

module.exports = router;
