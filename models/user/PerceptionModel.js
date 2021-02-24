const mongoose = require("mongoose");

const UserPerceptionSchema = new mongoose.Schema({
  perception: Array,
  userid: String,
});

UserPerceptionSchema.methods.addPerception = async function (
  userid,
  perception
) {
  let User = new UserPerceptionModel({
    userid,
    perception: [{ ...perception }],
  });
  User.save();
  return User;
};

UserPerceptionSchema.statics.getUserPerceptionById = async function (userid) {
  let User = await UserPerceptionModel.findOne({ userid });
  return User;
};

UserPerceptionSchema.statics.Perception = async function (userid, Perception) {
  let User = await UserRecordModel.findOne({ userid });
  User.Perception.push(Perception);
  User.save();
  return User.Perception;
};

UserPerceptionSchema.statics.ValidateUserPerception = async function (
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
    doctor_fname: Joi.string().required(),
    doctor_lname: Joi.string().required(),
    doctor_pic: Joi.string().required(),
    doctor_specialty: Joi.string().required(),
    perception: Joi.string().required(),
    illness: Joi.string().required(),
  });

  // Returniing the resuslt
  return schema.validate(Perception, { abortEarly: false });
}

UserPerceptionSchema.set("toJSON", { virtuals: true });
const UserPerceptionModel = mongoose.model(
  "UserPerceptionDb",
  UserPerceptionSchema
);
module.exports = UserPerceptionModel;
