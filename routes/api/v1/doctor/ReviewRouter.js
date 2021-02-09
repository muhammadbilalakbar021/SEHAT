const express = require("express");
const DoctorReviewModel = require("../../../../models/doctor/ReviewModel");
const router = express.Router();

// Get request for returning all patient's list
router.get("/", async () => {
  // const patientsRecord = await Patient.getPatient();
});

// Get request for returning specific doctor
router.get("/:id", async (req, res) => {
  try {
    Review = awaitDoctorReviewModel.getDoctorReviewById(req.params.id);
    return res.status(200).send(Review);
  } catch (err) {
    return res.status(404).send("Error getting doctor Review!");
  }
});

// Services (Post)
// doctor serviceValidator,
router.post("/", async (req, res) => {
  try {
    Review = new DoctorReviewModel();
    doctor = await Review.addReview(req.body.id, req.body.review);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error adding doctor Review!");
  }
});

router.post("/:id", async (req, res) => {
  try {
    doctor = await DoctorReviewModel.appendReview(req.params.id, req.body);
    return res.status(200).send(doctor);
  } catch (err) {
    return res.status(404).send("Error appending doctor Review!");
  }
});

module.exports = router;
