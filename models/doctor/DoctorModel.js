const mongoose = require("mongoose");
const Joi = require("joi");
const UserModel = require("../user/UserModel");

const doctorSchema = new mongoose.Schema({
  licenseNo: String,
  online_fee: String,
  office_fee: String,
  about: String,
  status: { type: Boolean, default: true },
  type: String,
  specialty: String,
  _id: { type: mongoose.Schema.Types.ObjectId },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userDb" },
  online_schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctorOnlineScheduleDb",
  },
  record: { type: mongoose.Schema.Types.ObjectId, ref: "doctorRecordDb" },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "doctorReviewDb" },
  clinic: { type: mongoose.Schema.Types.ObjectId, ref: "doctorClinicDb" },
});

doctorSchema.statics.getDoctor = async function () {
  let doctor = await DoctorModel.find().populate(
    "user",
    "fname lname pic gender title"
  );

  return doctor;
};

doctorSchema.statics.getDoctorById = async function (id) {
  let doctor = await DoctorModel.findById(id)
    .populate("user")
    .populate("online_schedule")
    .populate("record")
    .populate("review")
    .populate("clinic");
  // console.log(doctor);
  return doctor;
};
doctorSchema.statics.getOnlyDoctorById = async function (id) {
  let doctor = await DoctorModel.findById(id);
  // console.log(doctor);
  return doctor;
};
// Its a static Method which can be called as doctor.doStuff();
doctorSchema.statics.updateDoctor = async function ({ id, data }) {
  let doctor = await DoctorModel.findById(id);
  doctor.online_fee = data.online_fee;
  doctor.about = data.about;
  doctor.office_fee = data.office_fee;
  doctor = await doctor.save();
  //not added
  return doctor;
};

doctorSchema.statics.validateDoctor = async function (RequestedBody) {
  //  Validating
  return validate(RequestedBody);
};
//Function
function validate(user) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    userid: Joi.string().required(),
    licenseNo: Joi.string().required(),
    online_fee: Joi.string().required(),
    offline_fee: Joi.string().required(),
    about: Joi.string().required(),
    status: Joi.string().required(),
    type: Joi.string().required(),
    specialty: Joi.string().required(),
  });
  // Returniing the resuslt
  return schema.validate(user, { abortEarly: false });
}

doctorSchema.set("toJSON", { virtuals: true });
const DoctorModel = mongoose.model("doctorDb", doctorSchema);
module.exports = DoctorModel;
