const express = require("express");
const UserInformationModel = require("../../../../models/user/InformationModel");
const router = express.Router();
const UserModel = require("../../../../models/user/UserModel");

// Get request for returning all User's list *checked*
router.get("/", async (req, res) => {
  try {
    const User = await UserModel.getAllUsers();
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send({ error: "Error getting User's list!" });
  }
});

// Get request for returning specific User *checked*
router.get("/:id", async (req, res) => {
  try {
    let User = await UserModel.getUserById(req.params.id);
    // If User exist, return User record
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send({ error: "Error from Getting User Record!" });
  }
});

router.get("/information/:id", async (req, res) => {
  try {
    user = await UserModel.getUserById(req.params.id);
    information = await UserInformationModel.getUserInformationById(
      req.params.id
    );

    return res.status(200).send({ ...user, information });
  } catch (err) {
    res.status(400).send({ error: "Error from UserInformation by Id!" });
  }
});
module.exports = router;
