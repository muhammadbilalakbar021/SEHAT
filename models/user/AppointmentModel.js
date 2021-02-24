const mongoose = require("mongoose");

const userAppointmentSchema = new mongoose.Schema({
  appointment: Array,
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "UserDb" },
});

userAppointmentSchema.statics.getAppointmentById = async function (id) {
  let doctor = await UserAppointmentModel.findById(id);
  return doctor?.appointment;
};

userAppointmentSchema.methods.addAppointment = async function (data) {
  let User = await UserAppointmentModel.findById(data.user._id);
  if (!User) {
    User = new UserAppointmentModel({
      _id: data.user._id,
      appointment: [
        {
          doctor_id: data.doctor._id,
          fname: data.doctor.fname,
          lname: data.doctor.lname,
          pic: data.doctor.pic,
          specialty: data.doctor.specialty,
          gender: data.doctor.gender,
          day: data.appointment.day,
          time: data.appointment.time,
          status: "pending",
          _id: new mongoose.Types.ObjectId(),
        },
      ],
    });
  } else {
    User.appointment.push({
      doctor_id: data.doctor._id,
      fname: data.doctor.fname,
      lname: data.doctor.lname,
      pic: data.doctor.pic,
      specialty: data.doctor.specialty,
      gender: data.doctor.gender,
      day: data.appointment.day,
      time: data.appointment.time,
      status: "pending",
      _id: new mongoose.Types.ObjectId(),
    });
  }

  User = await User.save();
  return User;
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
