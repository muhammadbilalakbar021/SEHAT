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
const doctorRecordModel = mongoose.model("doctorRecordDb", doctorRecordSchema);

// Its a static Method which can be called as doctorRecord.doStuff();
doctorRecordSchema.statics.getdoctorRecordById = async function(doctorRecordId) {
    // Validating if given user is in our List
    //const doctorRecord = doctorRecords.find(p => p.id === parseInt(doctorRecordId));
    // If not existing, return 404
    return (doctorRecord = await doctorRecordModel.findById(doctorRecordId, function(err, doctorRecord) {
        if (err) return "Error 404 No doctorRecord with the given id in the record";
        else return doctorRecord;
    }));
};

// This is correct
// RequestedBody is part of controller not model.
doctorRecordSchema.statics.addServices = async function(userid, services) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.services = services;
    await doctorRecord.save();
    return doctorRecord.services;
};


doctorRecordSchema.statics.qualification = async function(userid, qualification) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.qualification = qualification;
    doctorRecord.save();
    return doctorRecord.qualification;
};

doctorRecordSchema.statics.workExperience = async function(userid, workExperience) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.workExperience = workExperience;
    doctorRecord.save();
    return doctorRecord;
};

doctorRecordSchema.statics.expertise = async function(userid, expertise) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.expertise = expertise;
    doctorRecord.save();
    return doctorRecord.expertise;
};

doctorRecordSchema.statics.achievements = async function(userid, achievements) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.achievements = achievements;
    doctorRecord.save();
    return doctorRecord.achievements;
};

doctorRecordSchema.statics.publications = async function(userid, publications) {
    let doctorRecord = await doctorRecordModel.findOne({ userid });
    doctorRecord.publications = publications;
    doctorRecord.save();
    return doctorRecord.publications;
};


doctorRecordSchema.set("toJSON", { virtuals: true });
const Model = mongoose.model("doctorRecord", doctorRecordSchema);
module.exports = Model;