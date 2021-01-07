const mongoose = require("mongoose");
const Joi = require("joi");
var sess_; // global session, NOT recommended

const doctorSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    title: String,
    DOB: String,
    pic: String,
    Ph: Number,
    emailAddress: String,
    password: String,
    isDoctor: Boolean,
    isAdmin: Boolean,
    rating: Number,
    mainofficeaddress: String,
    review: [{
        doctorid: String,
        uuid: String
    }],
    qualification: [{
        type: String,
        startyear: Number,
        endyear: Number,
        institutes: [{
            Named: String
        }]
    }],
    services: String,
    workexperence: String,
    experties: String,
    speciality: String

});
const doctorModel = mongoose.model("doctorDb", doctorSchema);

// Its a static Method which can be called as doctor.doStuff();
doctorSchema.statics.getdoctorById = async function(doctorId) {
    // Validating if given user is in our List
    //const doctor = doctors.find(p => p.id === parseInt(doctorId));
    // If not existing, return 404
    return (doctor = await doctorModel.findById(
        doctorId,
        function(err, doctor) {
            if (err) return "Error 404 No doctor with the given id in the record";
            else return doctor;
        }
    ));
};

doctorSchema.statics.getdoctor = async function() {
    var result = [];
    const doctor_Obj_Result = await doctorModel.find();
    doctor_Obj_Result.forEach(function(doc, err) {
        result.push(doc);
    });
    console.log(result);
    return result;
};

doctorSchema.statics.getPage = async function(page = 1, perPage = 10) {
    return this.find()
        .limit(perPage)
        .skip((page - 1) * perPage);
};

doctorSchema.statics.validate = async function(RequestedBody) {
    //  Validating
    return validatedoctor(RequestedBody);
};

doctorSchema.statics.getdoctorByEmailPasscode = async function(RequestedInformation) {
    const doctorCredientials = await doctorModel.findOne({
        emailAddress: RequestedInformation.emailAddress,
        password: RequestedInformation.password
    });
    console.log(doctorCredientials);
    sess_Id_ = doctorCredientials._id;
    return doctorCredientials;
};

//can be called on instance like. let p = new doctor(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
doctorSchema.methods.adddoctor = async function(doctorName) {
    // Add doctor
    const doctor_Obj = new doctorModel({
        fname: doctorName.fname,
        lname: doctorName.lname,
        title: doctorName.title,
        DOB: doctorName.DOB,
        pic: doctorName.pic,
        Ph: doctorName.Ph,
        emailAddress: doctorName.emailAddress,
        password: doctorName.password
    });

    await doctor_Obj.save();
    var result = [];
    const product_Obj_Result = await doctorModel.find().sort({ _id: -1 }).limit(1);;
    // product_Obj_Result.forEach(function (doc, err) {
    //   result.push(doc);
    // });
    return product_Obj_Result;
};

// doctorSchema.virtual("annualSalary").get(function () {
//   return this.salary * 12;
// });

doctorSchema.post("save", async(doc) => {
    //https://mongoosejs.com/docs/middleware.html
    //this method will be called when a save is successful on a single record

});

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