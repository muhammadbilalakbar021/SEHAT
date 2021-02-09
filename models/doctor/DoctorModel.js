const mongoose = require("mongoose");
const Joi = require("joi");

const doctorSchema = new mongoose.Schema({
  userid: String,
  licenseNo: String,
  online_fee: String,
  office_fee: String,
  about: String,
  status: String,
  type: String,
  specialty: String,
});

doctorSchema.statics.getDoctorById = async function (userid) {
  let doctor = await DoctorModel.findOne({ userid });
  return doctor;
};

// Its a static Method which can be called as doctor.doStuff();
doctorSchema.statics.updateDoctor = async function (userid) {
  let doctor = await DoctorModel.findOne({ userid });
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
