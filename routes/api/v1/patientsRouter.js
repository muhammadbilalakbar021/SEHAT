const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PatientSchema } = require("../../../models/PatientModel");
const patientValidator = require("../../../middlewares/validators/patientValidator");
const duplicateEmailValidator = require("../../../middlewares/validators/duplicateEmailValidator");
const loginValidator = require("../../../middlewares/validators/loginValidator");
const infoValidator = require("../../../middlewares/validators/infoValidator");
const idValidator = require("../../../middlewares/validators/idValidator");
const MedValidator = require("../../../middlewares/validators/MedValidator");
const VitalsValidator = require("../../../middlewares/validators/VitalsValidator");
const medicineValidator = require("../../../middlewares/validators/medicineValidator");


// Get request for returning all patient's list
router.get("/", async(req, res) => {
    const patientsRecord = await PatientSchema.getPatient();
    res.send(patientsRecord);
});

// Get request for returning patient by login
router.post("/login", loginValidator, async(req, res) => {
    const patientsRecord = await PatientSchema.getPatientByEmailPasscode(
        req.body
    );
    res.send(patientsRecord);
});

// Get request for returning specific patient
router.get("/patientById/:id", async(req, res) => {
    patient = await PatientSchema.getPatientById(req.params.id);
    // If Patient exist, return patient record
    res.send(patient);
});

// Post request for adding paatient
router.post(
    "/",
    patientValidator,
    duplicateEmailValidator,
    async(req, res) => {
        patients = new PatientSchema();
        p = await patients.addPatient(req.body);
        // Return Patient list
        res.send(p);
    }
);

router.put("/informationupdate", idValidator, infoValidator, async(req, res) => {
    patient = await PatientSchema.updateInfo(req.body)
    res.send(patient)

})

router.put("/medicalHistory", idValidator, MedValidator, async(req, res) => {
    patient = await PatientSchema.addRecord(req.body)
    res.send(patient)

})

router.put("/addVitals", idValidator, VitalsValidator, async(req, res) => {
    patient = await PatientSchema.addVitals(req.body)
    res.send(patient)

})

router.put("/medicine_status", idValidator, medicineValidator, async(req, res) => {
    patient = await PatientSchema.addMedicineStatus(req.body)
    res.send(patient)

})

router.delete("/medicine_status", idValidator, async(req, res) => {
    patient = await PatientSchema.removeMedicineStatus(req.body)
    res.send(patient)

})

router.get("/:page?/:perPage?", async(req, res) => {
    const page = req.params.page ? Number(req.params.page) : 1;
    const perPage = req.params.perPage ? Number(req.params.perPage) : 1;

    const patients = await PatientSchema.getPage(page, perPage);
    res.send(patients);
});

module.exports = router;