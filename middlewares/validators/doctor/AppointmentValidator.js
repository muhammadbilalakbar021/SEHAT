let AppointmentModel = require("../../../models/doctor/AppointmentModel");
module.exports = async function (req, res, next) {
  console.log(req.body);
  const { error } = await AppointmentModel.ValidateAppointment(req.body.doctor);
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
