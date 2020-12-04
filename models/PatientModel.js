const mongoose = require("mongoose");
const Joi = require("joi");

const patientSchema = new mongoose.Schema({
  patientName: String,
  patientDescription: String,
});

const PatientModel = mongoose.model("PatientDb", patientSchema);

// Its a static Method which can be called as Patient.doStuff();
patientSchema.statics.getPatientById = async function (PatientId) {
  // Validating if given user is in our List
  //const patient = patients.find(p => p.id === parseInt(PatientId));
  // If not existing, return 404
  return (patient = await PatientModel.findById(
    PatientId,
    function (err, patient) {
      if (err) return "Error 404 No patient with the given id in the record";
      else return patient;
    }
  ));
};

patientSchema.statics.getPatient = async function () {
  var result = [];
  const patient_Obj_Result = await PatientModel.find();
  patient_Obj_Result.forEach(function (doc, err) {
    result.push(doc);
  });
  console.log(result);
  return result;
};

patientSchema.statics.getPage = async function (page = 1, perPage = 10) {
  return this.find()
    .limit(perPage)
    .skip((page - 1) * perPage);
};

patientSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return ({ error } = validatePatient(RequestedBody));
};

//can be called on instance like. let p = new Patient(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
patientSchema.methods.addPatient = async function (PatientName) {
  // Add patient
  const Patient_Obj = new PatientModel({
    patientName: PatientName.name,
    patientDescription: PatientName.description,
  });

  await Patient_Obj.save();
  var result = [];
  const product_Obj_Result = await PatientModel.find();
  product_Obj_Result.forEach(function (doc, err) {
    result.push(doc);
  });
  return result;
};
patientSchema.virtual("annualSalary").get(function () {
  return this.salary * 12;
});

patientSchema.post("save", async (doc) => {
  //https://mongoosejs.com/docs/middleware.html
  //this method will be called when a save is successful on a single record
});

function validatePatient(patient) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  // Returniing the resuslt
  return schema.validate(patient);
}

patientSchema.set("toJSON", { virtuals: true });
const Model = mongoose.model("Patient", patientSchema);
module.exports = Model;
