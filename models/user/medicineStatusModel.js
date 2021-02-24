const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const MedicineStatusSchema = new mongoose.Schema({
  medicine_status: [
    {
      date: String,
      medicine: String,
      dosage: String,
      description: String,
      pic: Array,
      status: { type: Boolean, default: true },
    },
  ],
  userid: String,
});

MedicineStatusSchema.statics.getMedicineStatusById = async (userid) => {
  let info = await MedicineStatusModel.findOne({ userid });
  return info;
};

MedicineStatusSchema.methods.addUserMedicineStatus = async function (user) {
  let info = await MedicineStatusModel.findOne({ userid: user.id });
  if (!info) {
    info = new MedicineStatusModel({
      medicine_status: [{ ...user.data }],
      userid: user.id,
    });
  } else {
    info.medicine_status.push({ ...user.data });
  }
  info = await info.save();
  return info;
};

MedicineStatusSchema.statics.updateMedicineStatus = async function (user) {
  let info = await MedicineStatusModel.findOne({ userid: user.id });
  for (let key in info.medicine_status) {
    if (info.medicine_status[key]._id == user.data._id) {
      info.medicine_status[key] = { ...user.data };
      break;
    }
  }
  info.markModified("medicine_status");
  info = info.save();
  return info;
};

MedicineStatusSchema.statics.changeMedicineStatus = async function (user) {
  let info = await MedicineStatusModel.findOne({ userid: user.id });
  console.log(user);
  for (let key in info.medicine_status) {
    if (info.medicine_status[key]._id == user.medicine_id) {
      info.medicine_status[key].status = false;
      break;
    }
  }

  info.markModified("medicine_status");
  info = info.save();
  return info;
};

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
    data: Joi.object({
      date: Joi.string().required(),
      medicine: Joi.string().required(),
      dosage: Joi.string().required(),
      description: Joi.string().required(),
      pic: Joi.Array().optional(),
    }),
  });
  // Returniing the resuslt
  return schema.validate(MedicineStatus, { abortEarly: false });
}

MedicineStatusSchema.set("toJSON", { virtuals: true });
const MedicineStatusModel = mongoose.model(
  "MedicineStatusDbs",
  MedicineStatusSchema
);
module.exports = MedicineStatusModel;
