const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Patient = require("../../../models/PatientModel");
const patientValidator = require("../../../middlewares/validators/patientValidator");


// Post request for adding paatient
router.post("/", patientValidator, async(req, res) => {
    patients = new Patient();
    p = await patients.addPatient(req.body);
    // Return Patient list
    res.send(p);
});

module.exports = router;