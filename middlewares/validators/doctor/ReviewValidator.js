let DoctorReviewModel = require("../../../models/doctor/ReviewModel");
module.exports = async function (req, res, next) {
  console.log(req.body);
  const { error } = await DoctorReviewModel.ValidateDoctorReview(req.body);
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
