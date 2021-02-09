const mongoose = require("mongoose");

const DoctorAppointmentSchema = new mongoose.Schema({
  appointment: Array,
  Doctorid: String,
});

DoctorAppointmentSchema.methods.addAppointment = async function (
  userid,
  appointment
) {
  let doctor = new DoctorAppointmentModel({
    userid,
    appointment: [{ ...appointment }],
  });
  doctor.save();
  return doctor;
};

DoctorAppointmentSchema.statics.appendAppointment = async function (
  userid,
  Appointment
) {
  let DoctorAppointment = await DoctorRecordModel.findOne({ userid });
  DoctorAppointment.Appointment.push(Appointment);
  DoctorAppointment.save();
  return DoctorAppointment.Appointment;
};

DoctorAppointmentSchema.statics.ValidateDoctorAppointment = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(Appointment) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    date: Joi.string().required(),
    userid: Joi.string().required(),
    user_fname: Joi.string().required(),
    user_lname: Joi.string().required(),
    user_pic: Joi.string().required(),
  });

  // Returniing the resuslt
  return schema.validate(Appointment, { abortEarly: false });
}

DoctorAppointmentSchema.set("toJSON", { virtuals: true });
const DoctorAppointmentModel = mongoose.model(
  "DoctorAppointmentDb",
  DoctorAppointmentSchema
);
module.exports = DoctorAppointmentModel;
