let DoctorClinicModel = require("../../../models/doctor/ClinicModel");
module.exports = async function (req, res, next) {
  console.log(req.body);
  const { error } = await DoctorClinicModel.ValidateDoctorClinic(req.body);
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
