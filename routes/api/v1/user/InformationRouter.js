const express = require("express");
const router = express.Router();
const UserInformationValidator = require("../../../../middlewares/validators/user/InformationValidator");
const UserInformationModel = require("../../../../models/user/InformationModel");

// Get request for returning specific patient
router.get("/:id", async (req, res) => {
  try {
    information = await UserInformationModel.getUserInformationById(
      req.params.id
    );
    // If Patient exist, return patient record
    return res.status(200).send(information);
  } catch (err) {
    res.status(400).send("Error from UserInformation by Id!");
  }
});
//Create a new one
router.post(
  "/addUserInformation",
  UserInformationValidator,
  async (req, res) => {
    try {
      information = new UserInformationModel();
      user_info = await information.addUserInformation(req.body);
      return res.status(200).send(user_info);
    } catch (err) {
      return res.status(400).send("Error from addUserInformation");
    }
  }
);

router.put(
  "/addUserInformation",
  UserInformationValidator,
  async (req, res) => {
    try {
      user_info = await UserInformationModel.updateUserInformation(req.body);
      return res.status(200).send(user_info);
    } catch (err) {
      return res.status(400).send("Error from updateUserInformation");
    }
  }
);

module.exports = router;
