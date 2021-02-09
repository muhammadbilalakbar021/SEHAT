const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const MedicineStatusSchema = new mongoose.Schema({
  medicine_status: [
    {
      date: String,
      blood_pressure: String,
      blood_glucose: String,
      heart_beat: String,
      weight: String,
    },
  ],
  userid: String,
  isCreated: {
    type: Boolean,
    default: true,
  },
});

MedicineStatusSchema.statics.getMedicineStatusById = async (userid) => {
  let info = await MedicineStatusModel.findOne({ userid });
  return info;
};

MedicineStatusSchema.methods.addUserMedicineStatus = async function (user) {
  console.log("hello", user);
  const MedicineStatus_Obj = new MedicineStatusModel({
    medicine_status: [
      {
        date: user.date,
        blood_pressure: user.blood_pressure,
        blood_glucose: user.blood_glucose,
        heart_beat: user.heart_beat,
        weight: user.weight,
      },
    ],
    userid: user.id,
  });
  let info = await MedicineStatus_Obj.save();
  return info;
};

MedicineStatusSchema.statics.appendUserMedicineStatus = async (
  userid,
  user
) => {
  let info = await MedicineStatusModel.findOne({ userid });
  info.MedicineStatus.push(user);
  info = await info.save();
  return info;
};

MedicineStatusSchema.statics.updateMedicineStatus = async function (user) {};

MedicineStatusSchema.statics.ValidateUserMedicineStatus = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(MedicineStatus) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    id: Joi.string().required(),
    date: Joi.string().required(),
    blood_pressure: Joi.string(),
    blood_glucose: Joi.string(),
    heart_beat: Joi.string(),
    weight: Joi.string(),
  });
  // Returniing the resuslt
  return schema.validate(MedicineStatus, { abortEarly: false });
}

MedicineStatusSchema.set("toJSON", { virtuals: true });
const MedicineStatusModel = mongoose.model(
  "MedicineStatusdbs",
  MedicineStatusSchema
);
module.exports = MedicineStatusModel;
