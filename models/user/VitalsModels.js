const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const VitalsSchema = new mongoose.Schema({
  vitals: [
    {
      date: String,
      blood_pressure: String,
      blood_glucose: String,
      heart_beat: String,
      weight: String,
    },
  ],
  userid: String,
});

VitalsSchema.statics.getVitalsById = async (userid) => {
  let info = await VitalsModel.findOne({ userid });
  return info;
};

VitalsSchema.methods.addUserVitals = async function (user) {
  let info = await VitalsModel.findOne({ userid: user.id });
  if (!info) {
    info = new VitalsModel({
      vitals: [
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
  } else {
    info.vitals.push(user);
  }
  info = await info.save();
  return info;
};

VitalsSchema.statics.updateUserVitals = async function (user) {
  console.log("hello");
  let info = await VitalsModel.findOne({ userid: user.id });
  for (let key in info.vitals) {
    if (info.vitals[key]._id == user.data._id) {
      info.vitals[key] = { ...user.data };
      break;
    }
  }
  info.markModified("vitals");
  info = await info.save();
  return info;
};

VitalsSchema.statics.ValidateUserVitals = async function (RequestedBody) {
  //  Validating
  return validate(RequestedBody.data);
};

function validate(vitals) {
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
  return schema.validate(vitals, { abortEarly: false });
}

VitalsSchema.set("toJSON", { virtuals: true });
const VitalsModel = mongoose.model("Vitalsdbs", VitalsSchema);
module.exports = VitalsModel;
