const mongoose = require("mongoose");

const doctorClinicSchema = new mongoose.Schema({
  clinic: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});

doctorClinicSchema.methods.addClinic = async function (_id, clinic) {
  let doctor = new DoctorClinicModel({
    _id,
    clinic: [{ ...clinic }],
  });
  doctor.save();
  return doctor;
};

doctorClinicSchema.statics.getDoctorClinicById = async function (userid) {
  let doctor = await DoctorClinicModel.findOne({ userid });
  return doctor;
};

doctorClinicSchema.statics.appendClinic = async function (userid, Clinic) {
  let doctor = await doctorRecordModel.findOne({ userid });
  doctor.Clinic.push(Clinic);
  doctor.save();
  return doctor.Clinic;
};

doctorClinicSchema.statics.ValidateDoctorClinic = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(Clinic) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    ph: Joi.string().required(),
    time: Joi.array.required(),
    address: Joi.string().required(),
    location: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }).required(),
  });

  // Returniing the resuslt
  return schema.validate(Clinic, { abortEarly: false });
}

doctorClinicSchema.set("toJSON", { virtuals: true });
const DoctorClinicModel = mongoose.model("doctorClinicDb", doctorClinicSchema);
module.exports = DoctorClinicModel;
