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
  information: Object,
  medical_History: Array,
  vitals: Array,
  medicine_status: Array,
  isDoctor: Object,
});
const PatientModel = mongoose.model("PatientDb", patientSchema);

// Its a static Method which can be called as Patient.doStuff();
patientSchema.statics.getPatientById = async function (PatientId) {
  // Validating if given user is in our List
  //const patient = patients.find(p => p.id === parseInt(PatientId));
  // If not existing, return 404

  patient = await PatientModel.findById(PatientId, function (err, patient) {
    if (err) return "Error 404 No patient with the given id in the record";
  });
  let p = { ...patient };
  delete p._doc.password;

  return p._doc;
};

patientSchema.statics.getPatient = async function () {
  var result = [];
  const patient_Obj_Result = await PatientModel.find();
  patient_Obj_Result.forEach(function (doc, err) {
    result.push(doc);
  });
  return result;
};

patientSchema.statics.getPage = async function (page = 1, perPage = 10) {
  return this.find()
    .limit(perPage)
    .skip((page - 1) * perPage);
};

patientSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validatePatient(RequestedBody);
};

patientSchema.statics.validateInfo = async function (RequestedBody) {
  //  Validating
  return UpdateInformation(RequestedBody);
};

patientSchema.statics.validateMedRecord = async function (RequestedBody) {
  //  Validating
  return ValidateMedicalRecord(RequestedBody);
};

patientSchema.statics.validateVitals = async function (RequestedBody) {
  //  Validating
  return validateVit(RequestedBody);
};

patientSchema.statics.validateMedicineStatus = async function (RequestedBody) {
  //  Validating
  return validateMS(RequestedBody);
};

patientSchema.statics.validateByGivenDoctorId = async function (RequestedBody) {
  patient = await PatientModel.findById(
    RequestedBody.id,
    function (err, patient) {
      if (err) return "Error 404 No doctor with the given id in the record";
    }
  );
  if (patient.role === "doctor") {
    next();
  } else {
    return "Error 203 The given id is Patient";
  }
};

patientSchema.statics.addMedicineStatus = async function (RequestedBody) {
  let patient = await PatientModel.findById(RequestedBody.id);

  let updateDynamicSchema = {
    date: RequestedBody.date,
    pic: RequestedBody.pic,
    medicine: RequestedBody.medicine,
    dosage: RequestedBody.dosage,
    description: RequestedBody.description,
    status: true,
  };

  let update = [...patient.medicine_status];
  update.push(updateDynamicSchema);
  patient.medicine_status = update;
  patient.save();
  return patient;
};

patientSchema.statics.removeMedicineStatus = async function (RequestedBody) {
  let patient = await PatientModel.findById(RequestedBody.id);
  let index = 0;
  for (let key in patient.medicine_status) {
    if (patient.medicine_status[key].medicine === RequestedBody.medicine) {
      index = key;
      break;
    }
  }
  patient.medicine_status[index].status = false;
  patient.markModified("medicine_status");
  patient.save();
  return patient;
};

patientSchema.statics.updateInfo = async function (RequestedBody) {
  let patient = await PatientModel.findById(RequestedBody.id);

  let updateDynamicSchema = {};
  updateDynamicSchema["blood"] = RequestedBody.blood;
  updateDynamicSchema["height"] = RequestedBody.height;
  updateDynamicSchema["martial_status"] = RequestedBody.martial_status;
  updateDynamicSchema["address"] = RequestedBody.address;
  patient.DOB = RequestedBody.DOB;
  patient.pic = RequestedBody.pic;
  patient.emailAddress = RequestedBody.emailAddress;
  patient.Ph = RequestedBody.Ph;
  patient.information = { ...updateDynamicSchema };
  patient.save();
  return patient;
};

patientSchema.statics.addRecord = async function (RequestedBody) {
  let patient = await PatientModel.findById(RequestedBody.id);

  let updateDynamicSchema = {};
  updateDynamicSchema["date"] = RequestedBody.date;
  updateDynamicSchema["disease"] = RequestedBody.disease;
  updateDynamicSchema["symptom"] = RequestedBody.symptom;
  updateDynamicSchema["category"] = RequestedBody.category;
  updateDynamicSchema["reaction"] = RequestedBody.reaction;
  updateDynamicSchema["treatment"] = RequestedBody.treatment;
  updateDynamicSchema["pic"] = RequestedBody.pic;

  let update = [...patient.medical_History];
  update.push(updateDynamicSchema);
  patient.medical_History = update;
  patient.save();
  return patient;
};

patientSchema.statics.addVitals = async function (RequestedBody) {
  let patient = await PatientModel.findById(RequestedBody.id);

  let updateDynamicSchema = {};
  updateDynamicSchema["date"] = RequestedBody.date;
  updateDynamicSchema["blood_pressure"] = RequestedBody.blood_pressure;
  updateDynamicSchema["heart_beat"] = RequestedBody.heart_beat;
  updateDynamicSchema["blood_glucose"] = RequestedBody.blood_glucose;
  updateDynamicSchema["weight"] = RequestedBody.weight;

  let update = [...patient.vitals];
  update.push(updateDynamicSchema);
  patient.vitals = update;
  patient.save();
  return patient;
};

patientSchema.statics.getPatientByEmailPasscode = async function (
  RequestedInformation
) {
  const patientCredientials = await PatientModel.findOne({
    emailAddress: RequestedInformation.emailAddress,
    password: RequestedInformation.password,
  });
  return {
    id: patientCredientials._id,
    name:
      patientCredientials.title +
      " " +
      patientCredientials.fname +
      " " +
      patientCredientials.lname,
    role: patientCredientials.role,
    pic: patientCredientials.pic,
    gender: patientCredientials.gender,
  };
};

//can be called on instance like. let p = new Patient(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
patientSchema.methods.addPatient = async function (PatientName) {
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
    gender: patient.gender,
  };
};

// patientSchema.virtual("annualSalary").get(function () {
//   return this.salary * 12;
// });

patientSchema.post("save", async (doc) => {
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
    pic: Joi.optional(),
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
    pic: Joi.optional(),
    address: Joi.string().min(8).required(),
    emailAddress: Joi.string().email().min(6).required(),
    Ph: Joi.number().required(),
  });
  // Returniing the resuslt
  return schema.validate(patient, { abortEarly: false });
}

function ValidateMedicalRecord(patient) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    id: Joi.string().required(),
    date: Joi.string().required(),
    disease: Joi.string().required(),
    symptom: Joi.array().required(),
    category: Joi.string().min(2).required(),
    reaction: Joi.string().min(3).required(),
    treatment: Joi.string().min(3).required(),
    pic: Joi.array().optional(),
  });
  // Returniing the resuslt
  return schema.validate(patient, { abortEarly: false });
}

function validateMS(patient) {
  const schema = Joi.object({
    id: Joi.string().required(),
    date: Joi.string().required(),
    medicine: Joi.string().required(),
    dosage: Joi.string().required(),
    description: Joi.string().required(),
    pic: Joi.array().optional(),
  });
  // Returniing the resuslt
  return schema.validate(patient, { abortEarly: false });
}

patientSchema.set("toJSON", { virtuals: true });
const PatientSchema = mongoose.model("Patient", patientSchema);
module.exports = { PatientSchema, PatientModel };
