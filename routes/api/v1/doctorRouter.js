const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Patient = require("../../../models/UserModel");
const Doctor = require("../../../models/DoctorModel");
const auth = require("../../../middlewares/validators/auth");

// Get request for returning all patient's list
router.get("/", async(req, res) => {
    // const patientsRecord = await Patient.getPatient();
});

// Get request for returning specific doctor
router.get("/doctorById/:id", async(req, res) => {
    patient = await Patient.getPatientById(req.params.id);
    // If Patient exist, return doctor record
    console.log("hello");
    res.send(patient);
});

// Services (Post)
// doctorauth, serviceValidator,
router.post("/AddServices", auth, async(req, res) => {
    doctor = await Doctor.addServices(req.body);
    res.send(doctor);
});

router.post("/AddReview", auth, async(req, res) => {
    doctor = await Doctor.review(req.body);
    res.status(200).send(doctor);
});

router.post("/AddQualification", auth, async(req, res) => {
    doctor = await Doctor.qualification(req.body);
    res.send(doctor);
});

router.post("/AddWorkExperience", auth, async(req, res) => {
    doctor = await Doctor.workexperence(req.body);
    res.send(doctor);
});

router.post("/AddExpertise", auth, async(req, res) => {
    doctor = await Doctor.experties(req.body);
    res.send(doctor);
});

router.post("/AddAchievements", auth, async(req, res) => {
    doctor = await Doctor.achievments(req.body);
    res.send(doctor);
});

router.post("/AddPublications", auth, async(req, res) => {
    try {
        doctor = await Doctor.publications(req.body);
        res.send(doctor);
    } catch (err) {
        return res.status(400).send("Error Message");
    }
});

module.exports = router;