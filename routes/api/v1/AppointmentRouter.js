const express = require("express");
const router = express.Router();
const DoctorAppointmentValidator = require("../../../middlewares/validators/doctor/AppointmentValidator");
const UserAppointmentValidator = require("../../../middlewares/validators/user/AppointmentValidator");
const DoctorAppointmentModel = require("../../../models/doctor/AppointmentModel");
const DoctorOnlineScheduleModel = require("../../../models/doctor/OnlineScheduleModel");
const UserAppointmentModel = require("../../../models/user/AppointmentModel");

// Get request for returning specific patient
router.get("/user/:id", async (req, res) => {
  try {
    information = await UserAppointmentModel.getAppointmentById(req.params.id);
    // If Patient exist, return patient record
    return res.status(200).send(information);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Error from User Appointment by Id!" });
  }
});

router.get("/doctor/:id", async (req, res) => {
  try {
    information = await DoctorAppointmentModel.getAppointmentById(
      req.params.id
    );
    // If Patient exist, return patient record
    return res.status(200).send(information);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Error from Doctor Appointment by Id!" });
  }
});
//Create a new one
router.post("/", async (req, res) => {
  try {
    let user_information = new UserAppointmentModel();
    await user_information.addAppointment(req.body);
    let doctor_information = new DoctorAppointmentModel();
    await doctor_information.addAppointment(req.body);
    let seclude = await DoctorOnlineScheduleModel.bookOnlineSchedule(
      req.body.doctor._id,
      req.body.appointment
    );
    return res.status(200).send(seclude);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error from addAppointment" });
  }
});

router.delete("/", async (req, res) => {
  try {
    _info = await AppointmentModel.updateAppointment(req.body);
    return res.status(200).send(_info);
  } catch (err) {
    return res.status(400).send("Error from updateAppointment");
  }
});

module.exports = router;
