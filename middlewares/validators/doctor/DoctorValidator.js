let DoctorModel = require("../../../models/doctor/DoctorModel");
module.exports = async function (req, res, next) {
  console.log(req.body);
  const { error } = await DoctorModel.ValidateDoctor(req.body);
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
