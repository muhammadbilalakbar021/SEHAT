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
    res.status(400).send("Error from User Appointment by Id!");
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
    res.status(400).send("Error from Doctor Appointment by Id!");
  }
});
//Create a new one
router.post(
  "/addAppointment",
  UserAppointmentValidator,
  DoctorAppointmentValidator,
  async (req, res) => {
    try {
      doctor_information = new UserAppointmentModel();
      doc_info = await information.addAppointment(req.body.user);
      user_information = new DoctorAppointmentModel();
      user_info = await information.addAppointment(req.body.doctor);
      _info = await DoctorOnlineScheduleModel.OnlineSchedule(req.body.seclude);
      return res.status(200).send(_info);
    } catch (err) {
      return res.status(400).send("Error from addAppointment");
    }
  }
);

router.post(
  "/appendAppointment/:id",
  UserAppointmentValidator,
  DoctorAppointmentValidator,
  async (req, res) => {
    try {
      _info = await AppointmentModel.appendAppointment(req.params.id, req.body);
      return res.status(200).send(_info);
    } catch (err) {
      return res.status(400).send("Error from appendAppointment");
    }
  }
);

router.put(
  "/addAppointment",
  UserAppointmentValidator,
  DoctorAppointmentValidator,
  async (req, res) => {
    try {
      _info = await AppointmentModel.updateAppointment(req.body);
      return res.status(200).send(_info);
    } catch (err) {
      return res.status(400).send("Error from updateAppointment");
    }
  }
);

module.exports = router;
