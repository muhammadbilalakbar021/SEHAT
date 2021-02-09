let UserAppointmentModel = require("../../../models/user/AppointmentModel");
module.exports = async function (req, res, next) {
  console.log(req.body);
  const { error } = await UserAppointmentModel.ValidateUserAppointment(
    req.body.user
  );
  if (error) return res.send({ error: error.details[0].message });
  req.isValidated = true;
  next();
};
