const express = require("express");
const router = express.Router();
const Joi = require("joi");
const UserModel = require("../../../models/UserModel");
const patientValidator = require("../../../middlewares/validators/user/patientValidator");
const duplicateEmailValidator = require("../../../middlewares/validators/user/duplicateEmailValidator");
const loginValidator = require("../../../middlewares/validators/user/loginValidator");
const infoValidator = require("../../../middlewares/validators/user/UserInformationValidator");
const idValidator = require("../../../middlewares/validators/auth");
const MedValidator = require("../../../middlewares/validators/user/MedValidator");
const VitalsValidator = require("../../../middlewares/validators/user/VitalsValidator");
const medicineValidator = require("../../../middlewares/validators/user/medicineValidator");

// Get request for returning all patient's list *checked*
router.get("/", async (req, res) => {
  const patientsRecord = await UserModel.getUser();
  res.send(patientsRecord);
});

// Get request for returning patient by login
router.post("/login", loginValidator, async (req, res) => {
  const patientsRecord = await userSchema.getPatientByEmailPasscode(req.body);
  res.send(patientsRecord);
});

// Get request for returning specific patient
router.get("/patientById/:id", async (req, res) => {
  patient = await userSchema.getPatientById(req.params.id);
  // If Patient exist, return patient record
  res.send(patient);
});

// Post request for adding patient *checked*
router.post(
  "/",
  patientValidator,
  duplicateEmailValidator,
  async (req, res) => {
    patients = new UserModel();
    p = await patients.addUser(req.body);
    // Return Patient list
    res.send(p);
  }
);

router.post(
  "/informationupdate",
  idValidator,
  infoValidator,
  async (req, res) => {
    patient = await userSchema.updateInfo(req.body);
    res.send(patient);
  }
);

router.post("/medicalHistory", idValidator, MedValidator, async (req, res) => {
  patient = await userSchema.addRecord(req.body);
  res.send(patient);
});

router.post("/addVitals", idValidator, VitalsValidator, async (req, res) => {
  patient = await userSchema.addVitals(req.body);
  res.send(patient);
});

router.post(
  "/medicine_status",
  idValidator,
  medicineValidator,
  async (req, res) => {
    patient = await userSchema.addMedicineStatus(req.body);
    res.send(patient);
  }
);

router.put("/medicine_status", idValidator, async (req, res) => {
  patient = await userSchema.removeMedicineStatus(req.body);
  res.send(patient);
});

router.get("/:page?/:perPage?", async (req, res) => {
  const page = req.params.page ? Number(req.params.page) : 1;
  const perPage = req.params.perPage ? Number(req.params.perPage) : 1;

  const patients = await userSchema.getPage(page, perPage);
  res.send(patients);
});

module.exports = router;
