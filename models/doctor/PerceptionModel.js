const mongoose = require("mongoose");

const DoctorPerceptionSchema = new mongoose.Schema({
  perception: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});

DoctorPerceptionSchema.methods.addPerception = async function (
  userid,
  perception
) {
  let User = new DoctorPerceptionModel({
    userid,
    perception: [{ ...perception }],
  });
  User.save();
  return User;
};

DoctorPerceptionSchema.statics.getDoctorPerceptionById = async function (
  userid
) {
  let Doctor = await DoctorPerceptionModel.findOne({ userid });
  return Doctor;
};

DoctorPerceptionSchema.statics.addPerception = async function (
  userid,
  Perception
) {
  let Doctor = await DoctorRecordModel.findOne({ userid });
  Doctor.Perception.push(Perception);
  Doctor.save();
  return Doctor.Perception;
};

DoctorPerceptionSchema.statics.ValidateDoctorPerception = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(Perception) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    date: Joi.string().required(),
    userid: Joi.string().required(),
    user_fname: Joi.string().required(),
    user_lname: Joi.string().required(),
    user_pic: Joi.string().required(),
    perception: Joi.string().required(),
    illness: Joi.string().required(),
  });

  // Returniing the resuslt
  return schema.validate(Perception, { abortEarly: false });
}

DoctorPerceptionSchema.set("toJSON", { virtuals: true });
const DoctorPerceptionModel = mongoose.model(
  "DoctorPerceptionDb",
  DoctorPerceptionSchema
);
module.exports = DoctorPerceptionModel;
