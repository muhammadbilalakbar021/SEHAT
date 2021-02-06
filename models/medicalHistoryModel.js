const mongoose = require("mongoose");
const Joi = require("joi");
const { func } = require("joi");
var sess_; // global session, NOT recommended

const MedicalHistorySchema = new mongoose.Schema({
  fname: String,
  lname: String,
  title: String,
  DOB: String,
  pic: String,
  Ph: Number,
  gender: String,
  emailAddress: String,
  password: String,
  role: [],
});

MedicalHistorySchema.statics.getMedicalHistoryById = async (userid) => {
  let info = await MedicalHistoryModel.findOne({ userid });
  return info;
};

MedicalHistorySchema.methods.addMedicalHistory = async function (user) {
  const MedicalHistory_Obj = new MedicalHistoryModel({});

  let info = await MedicalHistory_Obj.save();
  return info;
};

MedicalHistorySchema.statics.updateMedicalHistory = async function (user) {};

MedicalHistorySchema.statics.ValidateMedicalHistory = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(user) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    id: Joi.string().required(),
    blood: Joi.string().required(),
    height: Joi.number().required(),
    martial_status: Joi.string().min(2).required(),
    address: Joi.string().min(8).required(),
    cnic: Joi.number().required(),
  });
  // Returniing the resuslt
  return schema.validate(user, { abortEarly: false });
}

MedicalHistorySchema.set("toJSON", { virtuals: true });
const MedicalHistoryModel = mongoose.model(
  "medicalhistorydbs",
  MedicalHistorySchema
);
module.exports = MedicalHistoryModel;
