const express = require("express");
const router = express.Router();
const UserMedicalHistoryValidator = require("../../../../middlewares/validators/user/MedicalHistoryValidator");
const UserMedicalHistoryModel = require("../../../../models/user/MedicalHistoryModel");

//Create a new one
router.post("/add", UserMedicalHistoryValidator, async (req, res) => {
  try {
    information = new UserMedicalHistoryModel();
    user_info = await information.addUserMedicalHistory(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    return res.status(400).send("Error from addUserMedicalHistory");
  }
});

router.put("/update/", async (req, res) => {
  try {
    let user_info = await UserMedicalHistoryModel.updateMedicalHistory(
      req.body
    );
    return res.status(200).send(user_info);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Error from updateUserMedicalHistory" });
  }
});

module.exports = router;
