const express = require("express");
const auth = require("../../../../middlewares/validators/auth/auth");
const isDoctor = require("../../../../middlewares/validators/role/isDoctor");
const router = express.Router();
const DoctorRecordModel = require("../../../../models/doctor/RecordModel");

// Get request for returning all patient's list
router.get("/", async () => {
  // const patientsRecord = await Patient.getPatient();
});

// Services (Post)
// doctor serviceValidator,
router.post("/AddServices", async (req, res) => {
  try {
    let doctor = await DoctorRecordModel.addServices(
      req.body.id,
      req.body.services
    );
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send({ error: "Error adding sevres's Record!" });
  }
});

router.post("/AddQualification", async (req, res) => {
  try {
    let doctor = await DoctorRecordModel.addQualification(
      req.body.id,
      req.body.qualification
    );
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error adding Qualification Record!");
  }
});

router.post("/AddWorkExperience", async (req, res) => {
  try {
    doctor = await DoctorRecordModel.addWorkExperience(
      req.body.id,
      req.body.workExperience
    );
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    return res.status(404).send("Error adding WorkExperience Record!");
  }
});

router.post("/AddExpertise", async (req, res) => {
  try {
    doctor = await DoctorRecordModel.addExpertise(
      req.body.id,
      req.body.expertise
    );
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    return res.status(404).send({ error: "Error adding Expertise Record!" });
  }
});

router.post("/AddAchievements", async (req, res) => {
  try {
    doctor = await DoctorRecordModel.addAchievements(
      req.body.id,
      req.body.achievements
    );
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding Achievements Record!");
  }
});

router.post("/AddPublications", async (req, res) => {
  try {
    let doctor = await DoctorRecordModel.addPublications(
      req.body.id,
      req.body.publication
    );
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error adding Publications Record!");
  }
});

module.exports = router;
