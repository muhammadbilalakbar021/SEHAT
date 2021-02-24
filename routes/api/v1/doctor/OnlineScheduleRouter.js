const express = require("express");
const router = express.Router();
const OnlineScheduleModel = require("../../../../models/doctor/OnlineScheduleModel");

// Get request for returning all patient's list
router.get("/", async () => {
  // not add
});

// Services (Post)
// doctor serviceValidator,
router.post("/", async (req, res) => {
  try {
    let schedule = new OnlineScheduleModel();
    let doctor = await schedule.addOnlineSchedule(req.body.id, req.body.online);
    return res.status(200).send(doctor);
  } catch (err) {
    console.error(err);
    return res
      .status(404)
      .send({ error: "Error adding doctor  Online Schedule!" });
  }
});

router.put("/", async (req, res) => {
  try {
    schedule = await OnlineScheduleModel.updateOnlineSchedule(
      req.body.id,
      req.body.online_schedule
    );
    return res.status(200).send(schedule);
  } catch (err) {
    return res.status(404).send("Error appending doctor  Online Schedule!");
  }
});

router.put("/booking", async (req, res) => {
  try {
    schedule = await OnlineScheduleModel.updateOnlineSchedule(
      req.body.id,
      req.body.online_schedule
    );
    return res.status(200).send(schedule);
  } catch (err) {
    return res.status(404).send("Error appending doctor  Online Schedule!");
  }
});

module.exports = router;
