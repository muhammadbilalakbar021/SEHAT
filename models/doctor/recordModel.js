const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");
var sess_; // global session, NOT recommended

const doctorRecordSchema = new mongoose.Schema({
  qualification: Array,
  services: Array,
  workExperience: Array,
  expertise: Array,
  achievements: Array,
});

// Its a static Method which can be called as doctorRecord.doStuff();
doctorRecordSchema.statics.getDoctorRecordById = async function (userid) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  return doctor;
};

// This is correct
// RequestedBody is part of controller not model.
doctorRecordSchema.statics.addServices = async function (userid, services) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.services = services;
  await doctor.save();
  return doctor.services;
};

doctorRecordSchema.statics.qualification = async function (
  userid,
  qualification
) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.qualification = qualification;
  doctor.save();
  return doctor.qualification;
};

doctorRecordSchema.statics.workExperience = async function (
  userid,
  workExperience
) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.workExperience = workExperience;
  doctor.save();
  return doctor;
};

doctorRecordSchema.statics.expertise = async function (userid, expertise) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.expertise = expertise;
  doctor.save();
  return doctor.expertise;
};

doctorRecordSchema.statics.achievements = async function (
  userid,
  achievements
) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.achievements = achievements;
  doctor.save();
  return doctor.achievements;
};

doctorRecordSchema.statics.publications = async function (
  userid,
  publications
) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  doctor.publications = publications;
  doctor.save();
  return doctor.publications;
};

doctorRecordSchema.set("toJSON", { virtuals: true });
const DoctorRecordModel = mongoose.model("doctorRecordDb", doctorRecordSchema);
module.exports = DoctorRecordModel;
