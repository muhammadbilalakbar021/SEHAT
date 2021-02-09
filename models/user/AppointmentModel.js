const mongoose = require("mongoose");

const userAppointmentSchema = new mongoose.Schema({
  appointment: Array,
  userid: String,
});
userAppointmentSchema.methods.addAppointment = async function (
  userid,
  appointment
) {
  let User = new UserAppointmentModel({
    userid,
    appointment: [{ ...appointment }],
  });
  User.save();
  return User;
};
userAppointmentSchema.statics.appendAppointment = async function (
  userid,
  Appointment
) {
  let userAppointment = await userRecordModel.findOne({ userid });
  userAppointment.Appointment.push(Appointment);
  userAppointment.save();
  return userAppointment.Appointment;
};

userAppointmentSchema.statics.ValidateUserAppointment = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(Appointment) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    date: Joi.string().required(),
    doctor_id: Joi.string().required(),
    doctor_fname: Joi.string().required(),
    doctor_lname: Joi.string().required(),
    doctor_pic: Joi.string().required(),
    doctor_specialty: Joi.string().required(),
  });

  // Returniing the resuslt
  return schema.validate(Appointment, { abortEarly: false });
}

userAppointmentSchema.set("toJSON", { virtuals: true });
const UserAppointmentModel = mongoose.model(
  "userAppointmentDb",
  userAppointmentSchema
);
module.exports = UserAppointmentModel;
