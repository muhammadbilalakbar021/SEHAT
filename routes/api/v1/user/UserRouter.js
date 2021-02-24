const express = require("express");
const UserInformationModel = require("../../../../models/user/InformationModel");
const MedicalHistoryModel = require("../../../../models/user/MedicalHistoryModel");
const MedicineStatusModel = require("../../../../models/user/MedicineStatusModel");
const UserModel = require("../../../../models/user/UserModel");
const VitalsModel = require("../../../../models/user/VitalsModels");
const router = express.Router();
// Get request for returning all User's list *checked*
router.get("/", async (req, res) => {
  try {
    const User = await UserModel.getAllUsers();
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send({ error: "Error getting User's list!" });
  }
});

// Get request for returning specific User *checked*
router.get("/:id", async (req, res) => {
  try {
    let User = await UserModel.getUserById(req.params.id);
    // If User exist, return User record
    return res.status(200).send(User);
  } catch (err) {
    return res.status(400).send({ error: "Error from Getting User Record!" });
  }
});

router.get("/information/:id", async (req, res) => {
  try {
    user = await UserModel.getUserById(req.params.id);
    information = await UserInformationModel.getUserInformationById(
      req.params.id
    );

    return res.status(200).send({ ...user, information });
  } catch (err) {
    res.status(400).send({ error: "Error from User Information by Id!" });
  }
});

router.get("/medicalHistory/:id", async (req, res) => {
  try {
    let information = await MedicalHistoryModel.getMedicalHistoryById(
      req.params.id
    );

    return res.status(200).send(information);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Error from MedicalHistory by Id!" });
  }
});

// Get request for returning specific patient
router.get("/vitals/:id", async (req, res) => {
  try {
    let information = await VitalsModel.getVitalsById(req.params.id);
    return res.status(200).send(information);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Error from MedicalHistory by Id!" });
  }
});

// Get request for returning specific patient
router.get("/medicineStatus/:id", async (req, res) => {
  try {
    let information = await MedicineStatusModel.getMedicineStatusById(
      req.params.id
    );
    // If Patient exist, return patient record
    return res.status(200).send(information);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Error from User Medicine Status by Id!" });
  }
});
module.exports = router;
