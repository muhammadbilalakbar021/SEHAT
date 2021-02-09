const express = require("express");
const router = express.Router();
const UserPerceptionValidator = require("../../../middlewares/validators/user/PerceptionValidator");
const DoctorPerceptionValidator = require("../../../middlewares/validators/doctor/PerceptionValidator");
const UserPerceptionModel = require("../../../models/user/PerceptionModel");
const DoctorPerceptionModel = require("../../../models/doctor/PerceptionModel");

// Get request for returning specific patient
router.get("/:id", async (req, res) => {
  try {
    information = await UserPerceptionModel.getUserPerceptionById(
      req.params.id
    );
    // If Patient exist, return patient record
    return res.status(200).send(information);
  } catch (err) {
    res.status(400).send("Error from UserPerception by Id!");
  }
});

//Create a new one
router.post(
  "/addPerception",
  DoctorPerceptionValidator,
  UserPerceptionValidator,
  async (req, res) => {
    try {
      let information = new UserPerceptionModel();
      user_info = await information.addPerception(req.body.user);
      information = new DoctorPerceptionModel();
      doctor_info = await information.addPerception(req.body.doctor);
      return res.status(200).send({ user: user_info, doctor: doctor_info });
    } catch (err) {
      return res.status(400).send("Error from addUserPerception");
    }
  }
);

router.post(
  "/appendPerception/:id",
  DoctorPerceptionValidator,
  UserPerceptionValidator,
  async (req, res) => {
    try {
      user_info = await UserPerceptionModel.appendUserPerception(
        req.params.id,
        req.body.user
      );
      doctor_info = await DoctorPerceptionModel.appendDoctorPerception(
        req.params.id,
        req.body.doctor
      );
      return res.status(200).send(user_info);
    } catch (err) {
      return res.status(400).send("Error from appendUserPerception");
    }
  }
);

router.put(
  "/updatePerception",
  DoctorPerceptionValidator,
  UserPerceptionValidator,
  async (req, res) => {
    try {
      user_info = await UserPerceptionModel.updateUserPerception(req.body.user);
      user_info = await DoctorPerceptionModel.updateDoctorPerception(
        req.body.doctor
      );
      return res.status(200).send(user_info);
    } catch (err) {
      return res.status(400).send("Error from updateUserPerception");
    }
  }
);

module.exports = router;
