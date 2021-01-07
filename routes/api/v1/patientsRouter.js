const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Patient = require("../../../models/PatientModel");
const patientValidator = require("../../../middlewares/validators/patientValidator");

// Get request for returning all patient's list
router.get("/", async(req, res) => {
    const patientsRecord = await Patient.getPatient();
    res.send(patientsRecord);
});

// Get request for returning patient by login
router.post("/login", async(req, res) => {
    const patientsRecord = await Patient.getPatientByEmailPasscode(req.body);
    res.send(patientsRecord);
});

// Get request for returning specific patient
router.get("/patientById/:id", async(req, res) => {
    patient = await Patient.getPatientById(req.params.id);
    // If Patient exist, return patient record
    res.send(patient);
});

// Post request for adding paatient
router.post("/", patientValidator, async(req, res) => {
    patients = new Patient();
    p = await patients.addPatient(req.body);
    // Return Patient list
    res.send(p);
});

router.get("/:page?/:perPage?", async(req, res) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const perPage = req.params.perPage ? Number(req.params.perPage) : 1;

    const patients = await Patient.getPage(page, perPage);
    res.send(patients);
});

module.exports = router;