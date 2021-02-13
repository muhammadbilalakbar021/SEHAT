const express = require("express");
const router = express.Router();
const UserInformationValidator = require("../../../../middlewares/validators/user/InformationValidator");
const UserInformationModel = require("../../../../models/user/InformationModel");
const UserModel = require("../../../../models/user/UserModel");

//Create a new one
router.post("/add", UserInformationValidator, async (req, res) => {
  try {
    let user = await UserModel.updateUser({
      ...req.body.user,
      id: req.body.id,
    });
    information = new UserInformationModel();
    user_info = await information.addUserInformation(
      req.body.id,
      req.body.information
    );
    return res.status(200).send({ ...user, information: user_info });
  } catch (err) {
    return res.status(400).send({ error: "Error from addUserInformation" });
  }
});

router.put("/update", UserInformationValidator, async (req, res) => {
  try {
    let user = await UserModel.updateUser({
      ...req.body.user,
      id: req.body.id,
    });
    let information = await UserInformationModel.updateUserInformation(
      req.body.id,
      req.body.information
    );
    return res.status(200).send({ ...user, information });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error from updateUserInformation" });
  }
});

module.exports = router;
