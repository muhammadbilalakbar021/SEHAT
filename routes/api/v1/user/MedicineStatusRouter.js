const express = require("express");
const router = express.Router();
// const MedicineStatusValidator = require("../../../../middlewares/validators/user/MedicineStatusValidator");
const UserMedicineStatusModel = require("../../../../models/user/MedicineStatusModel");

//Create a new one
router.post("/add", async (req, res) => {
  try {
    let information = new UserMedicineStatusModel();
    let user_info = await information.addUserMedicineStatus(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Error from adding User Medicine Status" });
  }
});

router.put("/update", async (req, res) => {
  try {
    let user_info = await UserMedicineStatusModel.updateMedicineStatus(
      req.body
    );
    return res.status(200).send(user_info);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Error from updating User Medicine Status" });
  }
});

router.put("/change", async (req, res) => {
  try {
    let user_info = await UserMedicineStatusModel.changeMedicineStatus(
      req.body
    );
    return res.status(200).send(user_info);
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error from deleting User Medicine Status" });
  }
});

module.exports = router;
