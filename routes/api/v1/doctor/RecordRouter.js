const express = require("express");
const router = express.Router();
const DoctorModel = require("../../../../models/doctor/DoctorModel");

// Get request for returning all patient's list
router.get("/", async () => {
  // const patientsRecord = await Patient.getPatient();
});

// Get request for returning specific doctor
router.get("/:id", async (req, res) => {
  try {
    record = await DoctorModel.getDoctorModelById(req.params.id);
    return res.status(200).send(record);
  } catch (err) {
    return res.status(404).send("Error getting doctor Record!");
  }
});

// Services (Post)
// doctor serviceValidator,
router.post("/AddServices", async (req, res) => {
  try {
    doctor = await DoctorModel.addServices(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding sevres's Record!");
  }
});

router.post("/AddQualification", async (req, res) => {
  try {
    doctor = await DoctorModel.addQualification(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding Qualification Record!");
  }
});

router.post("/AddWorkExperience", async (req, res) => {
  try {
    doctor = await DoctorModel.addWorkExperience(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding WorkExperience Record!");
  }
});

router.post("/AddExpertise", async (req, res) => {
  try {
    doctor = await DoctorModel.addExpertise(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding Expertise Record!");
  }
});

router.post("/AddAchievements", async (req, res) => {
  try {
    doctor = await DoctorModel.addAchievements(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding Achievements Record!");
  }
});

router.post("/AddPublications", async (req, res) => {
  try {
    doctor = await DoctorModel.addPublications(req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(400).send("Error adding Publications Record!");
  }
});

module.exports = router;
