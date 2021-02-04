const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Patient = require("../../../models/PatientModel");
const Doctor = require("../../../models/DoctorModel");
const idValidator = require("../../../middlewares/validators/idValidator");

// Get request for returning all patient's list
router.get("/", async (req, res) => {
  // const patientsRecord = await Patient.getPatient();
});

// Get request for returning specific doctor
router.get("/doctorById/:id", async (req, res) => {
  patient = await Patient.getPatientById(req.params.id);
  // If Patient exist, return doctor record
  console.log("hello");
  res.send(patient);
});

// Services (Post)
// doctorIdValidator, serviceValidator,
router.post("/AddServices", idValidator, async (req, res) => {
  doctor = await Doctor.addServices(req.body);
  res.send(doctor);
});

router.post("/AddReview", idValidator, async (req, res) => {
  doctor = await Doctor.review(req.body);
  res.status(200).send(doctor);
});

router.post("/AddQualification", idValidator, async (req, res) => {
  doctor = await Doctor.qualification(req.body);
  res.send(doctor);
});

router.post("/AddWorkExperience", idValidator, async (req, res) => {
  doctor = await Doctor.workexperence(req.body);
  res.send(doctor);
});

router.post("/AddExpertise", idValidator, async (req, res) => {
  doctor = await Doctor.experties(req.body);
  res.send(doctor);
});

router.post("/AddAchievements", idValidator, async (req, res) => {
  doctor = await Doctor.achievments(req.body);
  res.send(doctor);
});

router.post("/AddPublications", idValidator, async (req, res) => {
  doctor = await Doctor.publications(req.body);
  res.send(doctor);
});

module.exports = router;
