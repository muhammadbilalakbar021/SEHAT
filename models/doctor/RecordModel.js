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
  publications: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});

// Its a static Method which can be called as doctorRecord.doStuff();
doctorRecordSchema.statics.getDoctorRecordById = async function (userid) {
  let doctor = await DoctorRecordModel.findOne({ userid });
  return doctor;
};

doctorRecordSchema.statics.getRecord = async function (id, name) {
  let doctor = await DoctorRecordModel.findById(id);
  return doctor[name];
};
// This is correct
// RequestedBody is part of controller not model.
doctorRecordSchema.statics.addServices = async function (id, services) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.services = services;
  doctor = await doctor.save();
  return doctor.services;
};

doctorRecordSchema.statics.addQualification = async function (
  id,
  qualification
) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.qualification = qualification;
  doctor = await doctor.save();
  return doctor.qualification;
};

doctorRecordSchema.statics.addWorkExperience = async function (
  id,
  workExperience
) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.workExperience = workExperience;
  doctor = await doctor.save();
  return doctor.workExperience;
};

doctorRecordSchema.statics.addExpertise = async function (id, expertise) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.expertise = expertise;
  doctor = await doctor.save();
  return doctor.expertise;
};

doctorRecordSchema.statics.addAchievements = async function (id, achievements) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.achievements = achievements;
  doctor.save();
  return doctor.achievements;
};

doctorRecordSchema.statics.addPublications = async function (id, publications) {
  let doctor = await DoctorRecordModel.findById(id);
  doctor.publications = publications;
  doctor = await doctor.save();
  return doctor.publications;
};

doctorRecordSchema.set("toJSON", { virtuals: true });
const DoctorRecordModel = mongoose.model("doctorRecordDb", doctorRecordSchema);
module.exports = DoctorRecordModel;
