const mongoose = require("mongoose");

const DoctorAppointmentSchema = new mongoose.Schema({
  appointment: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});
DoctorAppointmentSchema.statics.getAppointmentById = async function (id) {
  let doctor = await DoctorAppointmentModel.findById(id);
  return doctor?.appointment;
};
DoctorAppointmentSchema.methods.addAppointment = async function (data) {
  let User = await DoctorAppointmentModel.findById(data.doctor._id);
  if (!User) {
    User = new DoctorAppointmentModel({
      _id: data.doctor._id,
      appointment: [
        {
          user_id: data.user._id,
          fname: data.user.fname,
          lname: data.user.lname,
          pic: data.user.pic,
          gender: data.user.gender,
          day: data.appointment.day,
          time: data.appointment.time,
          status: "pending",
          _id: new mongoose.Types.ObjectId(),
        },
      ],
    });
  } else {
    User.appointment.push({
      user_id: data.user._id,
      fname: data.user.fname,
      lname: data.user.lname,
      pic: data.user.pic,
      gender: data.user.gender,
      day: data.appointment.day,
      time: data.appointment.time,
      status: "pending",
      _id: new mongoose.Types.ObjectId(),
    });
  }

  User = await User.save();
  return User;
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
