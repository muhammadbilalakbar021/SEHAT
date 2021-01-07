const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Patient = require("../../../models/PatientModel");
const patientValidator = require("../../../middlewares/validators/patientValidator");

// Get request for returning all patient's list
router.get("/", async(req, res) => {
    // const patientsRecord = await Patient.getPatient();
});

// Get request for returning doctor by login
router.post("/login", async(req, res) => {
    const patientsRecord = await Patient.getPatientByEmailPasscode(req.body);
    res.send(patientsRecord);
});

// Get request for returning specific doctor
router.get("/doctorById/:id", async(req, res) => {
    patient = await Patient.getPatientById(req.params.id);
    // If Patient exist, return doctor record
    console.log("hello")
    res.send(patient);
});

// Post request for adding paatient
router.post("/", patientValidator, async(req, res) => {
    patients = new Patient();
    p = await patients.addPatient(req.body);
    // Return Patient list
    res.send(p);
});

module.exports = router;