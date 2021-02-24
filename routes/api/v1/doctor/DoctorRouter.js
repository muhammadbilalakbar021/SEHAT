const express = require("express");
const router = express.Router();
const DoctorValidator = require("../../../../middlewares/validators/doctor/DoctorValidator");
const DoctorModel = require("../../../../models/doctor/DoctorModel");
const DoctorOnlineScheduleModel = require("../../../../models/doctor/OnlineScheduleModel");
const DoctorRecordModel = require("../../../../models/doctor/RecordModel");
const DoctorReviewModel = require("../../../../models/doctor/ReviewModel");

router.get("/", async (req, res) => {
  try {
    let doctor = await DoctorModel.getDoctor();
    // If Patient exist, return patient record
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error from Doctor!");
  }
});

// Get request for returning specific patient
router.get("/:id", async (req, res) => {
  try {
    let doctor = await DoctorModel.getDoctorById(req.params.id);
    // If Patient exist, return patient record
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error from Doctor by Id!");
  }
});

// Get request for returning specific patient
router.get("/single/:id", async (req, res) => {
  try {
    let doctor = await DoctorModel.getOnlyDoctorById(req.params.id);
    // If Patient exist, return patient record
    return res.status(200).send(doctor);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error from Doctor by Id!");
  }
});

// Get request for returning specific doctor
router.get("/record/:name/:id", async (req, res) => {
  try {
    let record = await DoctorRecordModel.getRecord(
      req.params.id,
      req.params.name
    );
    console.log(record);
    return res.status(200).send(record);
  } catch (err) {
    console.error(err);
    return res.status(404).send({ error: "Error getting doctor Record!" });
  }
});

// Get request for returning specific doctor
router.get("/onlineSchedule/:id", async (req, res) => {
  try {
    let record = await DoctorOnlineScheduleModel.getOnlineScheduleById(
      req.params.id
    );
    console.log(record);
    return res.status(200).send(record);
  } catch (err) {
    console.error(err);
    return res.status(404).send({ error: "Error getting doctor Record!" });
  }
});

router.get("/review/:id", async (req, res) => {
  try {
    let record = await DoctorReviewModel.getReviewById(req.params.id);
    console.log(record);
    return res.status(200).send(record);
  } catch (err) {
    console.error(err);
    return res.status(404).send({ error: "Error getting doctor Review!" });
  }
});

router.put("/", async (req, res) => {
  try {
    user_info = await DoctorModel.updateDoctor(req.body);
    return res.status(200).send(user_info);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error from updateDoctor" });
  }
});

module.exports = router;
