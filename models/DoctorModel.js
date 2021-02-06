const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");
const { UserModel } = require("./UserModel");
var sess_; // global session, NOT recommended

const doctorSchema = new mongoose.Schema({
    rating: Number,
    mainofficeaddress: String,
    review: Array,
    qualification: Array,
    services: Array,
    workexperence: Array,
    experties: Array,
    speciality: Array,
});
const doctorModel = mongoose.model("doctorDb", doctorSchema);

// Its a static Method which can be called as doctor.doStuff();
doctorSchema.statics.getdoctorById = async function(doctorId) {
    // Validating if given user is in our List
    //const doctor = doctors.find(p => p.id === parseInt(doctorId));
    // If not existing, return 404
    return (doctor = await doctorModel.findById(doctorId, function(err, doctor) {
        if (err) return "Error 404 No doctor with the given id in the record";
        else return doctor;
    }));
};

// This is correct
// RequestedBody is part of controller not model.
doctorSchema.statics.addServices = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.services = RequestedBody.services;
    doctor.markModified("isDoctor");
    await doctor.save();
    return doctor;
};

doctorSchema.statics.review = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    let updateDynamicSchema = {
        date: RequestedBody.date,
        pic: RequestedBody.pic,
        userName: RequestedBody.userName,
        patientId: RequestedBody.patientId,
        Star: RequestedBody.Star,
        comment: RequestedBody.comment,
    };

    doctor.isDoctor.review = doctor.isDoctor.review ?
        [...doctor.isDoctor.review] :
        [];
    doctor.isDoctor.review.push(updateDynamicSchema);
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

doctorSchema.statics.qualification = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.qualification = RequestedBody.qualification;
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

doctorSchema.statics.workexperence = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.workexperence = RequestedBody.workexperence;
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

doctorSchema.statics.experties = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.experties = RequestedBody.experties;
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

doctorSchema.statics.achievments = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.speciality = RequestedBody.speciality;
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

doctorSchema.statics.publications = async function(RequestedBody) {
    let doctor = await PatientModel.findById(RequestedBody.id);
    doctor.isDoctor.publications = RequestedBody.publications;
    doctor.markModified("isDoctor");
    doctor.save();
    return doctor;
};

function validatedoctor(doctor) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().min(3).required(),
        title: Joi.string().min(2).required(),
        DOB: Joi.string().min(3).required(),
        pic: Joi.string().required(),
        Ph: Joi.number().required(),
        emailAddress: Joi.string().email().min(6).required(),
        password: Joi.string().min(5).required(),
    });
    // Returniing the resuslt
    return schema.validate(doctor, { abortEarly: false });
}

doctorSchema.set("toJSON", { virtuals: true });
const Model = mongoose.model("doctor", doctorSchema);
module.exports = Model;