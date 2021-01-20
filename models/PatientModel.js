const mongoose = require("mongoose");
const Joi = require("joi");
const { func } = require("joi");
var sess_; // global session, NOT recommended

const patientSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    title: String,
    DOB: String,
    pic: String,
    Ph: Number,
    gender: String,
    emailAddress: String,
    password: String,
    role: {
        type: String,
        default: "patient",
    },
});
const PatientModel = mongoose.model("PatientDb", patientSchema);

// Its a static Method which can be called as Patient.doStuff();
patientSchema.statics.getPatientById = async function(PatientId) {
    // Validating if given user is in our List
    //const patient = patients.find(p => p.id === parseInt(PatientId));
    // If not existing, return 404
    patient = await PatientModel.findById(
        PatientId,
        function(err, patient) {
            if (err) return "Error 404 No patient with the given id in the record";
        }
    );
    return {
        id: patient._id,
        title: patient.title,
        fname: patient.fname,
        lname: patient.lname,
        email: patient.emailAddress,
        gender: patient.gender,
        dob: patient.DOB,
        Ph: patient.Ph,
        role: patient.role,
        pic: patient.pic,
    }
};

patientSchema.statics.getPatient = async function() {
    var result = [];
    const patient_Obj_Result = await PatientModel.find();
    patient_Obj_Result.forEach(function(doc, err) {
        result.push(doc);
    });
    console.log(result);
    return result;
};

patientSchema.statics.getPage = async function(page = 1, perPage = 10) {
    return this.find()
        .limit(perPage)
        .skip((page - 1) * perPage);
};

patientSchema.statics.validate = async function(RequestedBody) {
    //  Validating
    return validatePatient(RequestedBody);
};

patientSchema.statics.validateInfo = async function(RequestedBody) {
    //  Validating
    return UpdateInformation(RequestedBody);
};

patientSchema.statics.updateInfo = async function(RequestedBody) {
    let patient = await PatientModel.findById(RequestedBody.id);

    let updateDynamicSchema = {...patient }
    updateDynamicSchema._doc["blood"] = RequestedBody.blood
    updateDynamicSchema._doc["height"] = RequestedBody.height
    updateDynamicSchema._doc["martial_status"] = RequestedBody.martial_status
    updateDynamicSchema._doc["DOB"] = RequestedBody.DOB

    patient = updateDynamicSchema
    patient_ = await patient.save();


    console.log(patient_)

}

patientSchema.statics.getPatientByEmailPasscode = async function(
    RequestedInformation
) {
    const patientCredientials = await PatientModel.findOne({
        emailAddress: RequestedInformation.emailAddress,
        password: RequestedInformation.password,
    });
    console.log(patientCredientials);
    return {
        id: patientCredientials._id,
        name: patientCredientials.title +
            " " +
            patientCredientials.fname +
            " " +
            patientCredientials.lname,
        role: patientCredientials.role,
        pic: patientCredientials.pic,
    };
};

//can be called on instance like. let p = new Patient(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
patientSchema.methods.addPatient = async function(PatientName) {
    // Add patient
    const Patient_Obj = new PatientModel({
        fname: PatientName.fname,
        lname: PatientName.lname,
        title: PatientName.title,
        DOB: PatientName.DOB,
        gender: PatientName.gender,
        pic: PatientName.pic,
        Ph: PatientName.Ph,
        emailAddress: PatientName.emailAddress,
        password: PatientName.password,
    });

    const patient = await Patient_Obj.save();
    return {
        id: patient._id,
        name: patient.title + " " + patient.fname + " " + patient.lname,
        role: patient.role,
        pic: patient.pic,
    };
};

// patientSchema.virtual("annualSalary").get(function () {
//   return this.salary * 12;
// });

patientSchema.post("save", async(doc) => {
    //https://mongoosejs.com/docs/middleware.html
    //this method will be called when a save is successful on a single record
});

function validatePatient(patient) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().min(3).required(),
        title: Joi.string().min(2).required(),
        DOB: Joi.string().min(3).required(),
        pic: Joi.string().required(),
        Ph: Joi.number().required(),
        emailAddress: Joi.string().email().min(6).required(),
        gender: Joi.string().required(),
        password: Joi.string().min(5).required(),
    });
    // Returniing the resuslt
    return schema.validate(patient, { abortEarly: false });
}

function UpdateInformation(patient) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        id: Joi.string().required(),
        blood: Joi.string().required(),
        height: Joi.number().required(),
        martial_status: Joi.string().min(2).required(),
        DOB: Joi.string().min(3).required(),
    });
    // Returniing the resuslt
    return schema.validate(patient, { abortEarly: false });
}

patientSchema.set("toJSON", { virtuals: true });
const PatientSchema = mongoose.model("Patient", patientSchema);
module.exports = { PatientSchema, PatientModel };