const express = require("express");
const router = express.Router();
const DoctorValidator = require("../../../../middlewares/validators/doctor/DoctorValidator");
const DoctorModel = require("../../../../models/doctor/DoctorModel");

// Get request for returning specific patient
router.get("/:id", async (req, res) => {
  try {
    doctor = await DoctorModel.getDoctorById(req.params.id);
    // If Patient exist, return patient record
    return res.status(200).send(doctor);
  } catch (err) {
    res.status(400).send("Error from Doctor by Id!");
  }
});

router.put("/updateDoctor", DoctorValidator, async (req, res) => {
  try {
    user_info = await DoctorModel.updateDoctor(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    return res.status(400).send("Error from updateDoctor");
  }
});

module.exports = router;
