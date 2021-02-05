const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PatientSchema } = require("../../../models/PatientModel");
const patientValidator = require("../../../middlewares/validators/patient/patientValidator");
const duplicateEmailValidator = require("../../../middlewares/validators/patient/duplicateEmailValidator");
const loginValidator = require("../../../middlewares/validators/patient/loginValidator");
const infoValidator = require("../../../middlewares/validators/patient/infoValidator");
const idValidator = require("../../../middlewares/validators/idValidator");
const MedValidator = require("../../../middlewares/validators/patient/MedValidator");
const VitalsValidator = require("../../../middlewares/validators/patient/VitalsValidator");
const medicineValidator = require("../../../middlewares/validators/patient/medicineValidator");

module.exports = router;
