const express = require("express");
const ClinicValidator = require("../../../../middlewares/validators/doctor/ClinicValidator");
const DoctorClinicModel = require("../../../../models/doctor/ClinicModel");
const router = express.Router();

// Get request for returning all patient's list
router.get("/", async () => {
  // const patientsRecord = await Patient.getPatient();
});

// Get request for returning specific doctor
router.get("/:id", async (req, res) => {
  try {
    clinic = awaitDoctorClinicModel.getDoctorClinicById(req.params.id);
    return res.status(200).send(clinic);
  } catch (err) {
    return res.status(404).send("Error getting doctor Clinic!");
  }
});

// Services (Post)
// doctor serviceValidator,
router.post("/", ClinicValidator, async (req, res) => {
  try {
    clinic = new DoctorClinicModel();
    doctor = await clinic.addClinic(req.body.id, req.body.clinic);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding doctor Clinic!");
  }
});

router.post("/:id", ClinicValidator, async (req, res) => {
  try {
    doctor = await DoctorClinicModel.appendClinic(req.params.id, req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error appending doctor Clinic!");
  }
});

module.exports = router;
