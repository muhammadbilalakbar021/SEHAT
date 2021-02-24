const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");
var sess_; // global session, NOT recommended

const doctorReviewSchema = new mongoose.Schema({
  review: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});

doctorReviewSchema.methods.addReview = async function (_id, review) {
  let doctor = await DoctorOnlineScheduleModel.findById(_id);
  if (!doctor) {
    doctor = new DoctorReviewModel({
      _id,
      review: [{ ...review }],
    });
  } else {
    doctor.review.push({ ...review });
  }

  doctor = await doctor.save();
  return doctor.review;
};
doctorReviewSchema.statics.getReviewById = async function (id) {
  let doctor = await DoctorReviewModel.findById(id);
  return doctor?.review;
};

doctorReviewSchema.statics.appendReview = async function (userid, review) {
  let doctor = await DoctorReviewModel.findOne({ userid });
  doctor.review.push(review);
  doctor.save();
  return doctor.review;
};

doctorReviewSchema.statics.ValidateDoctorReview = async function (
  RequestedBody
) {
  //  Validating
  return validate(RequestedBody);
};

function validate(Review) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    date: Joi.string().required(),
    pic: Joi.string().required(),
    user_name: Joi.string().required(),
    userid: Joi.string().required(),
    star: Joi.string().required(),
    comment: Joi.string().required(),
  });

  // Returniing the resuslt
  return schema.validate(Review, { abortEarly: false });
}

doctorReviewSchema.set("toJSON", { virtuals: true });
const DoctorReviewModel = mongoose.model("doctorReviewDb", doctorReviewSchema);
module.exports = DoctorReviewModel;
