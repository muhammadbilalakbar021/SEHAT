const express = require("express");
const router = express.Router();
const UserVitalsValidator = require("../../../../middlewares/validators/user/VitalsValidator");
const VitalsModel = require("../../../../models/user/VitalsModels");

//Create a new one
router.post("/add", UserVitalsValidator, async (req, res) => {
  try {
    information = new VitalsModel();
    user_info = await information.addUserVitals(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    return res.status(400).send({ error: "Error from addUserVitals" });
  }
});

router.put("/update", async (req, res) => {
  try {
    user_info = await VitalsModel.updateUserVitals(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    return res.status(400).send({ error: "Error from updateUserVitals" });
  }
});

module.exports = router;
