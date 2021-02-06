const express = require("express");
const router = express.Router();
const UserInformationValidator = require("../../../middlewares/validators/user/UserInformationValidator");
const UserInformationModel = require("../../../models/InformationModel");

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
  "/add-user-information",
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

<<<<<<< HEAD
router.put(
  "/add-user-information",
  UserInformationValidator,
  async (req, res) => {
    try {
      console.log("dd");
      user_info = await UserInformationModel.updateUserInformation(req.body);
      return res.status(200).send(user_info);
    } catch (err) {
      return res.status(400).send("Error from updateUserInformation");
=======
router.post(
    "/addUserInformation", async(req, res) => {
        // try {

        // } catch (err) {
        //     res.status(400).json("Error from addUserInformation")
        // }
        infromation = new userInformationSchema()
        userInformation = infromation.addUserInfomration(req.body)
        res.send(userInformation);
<<<<<<< Updated upstream
=======
>>>>>>> 2c9513a730d0e39c9e2bc7d00b7c7e8ab459cd0b
>>>>>>> Stashed changes
    }
  }
);

module.exports = router;
