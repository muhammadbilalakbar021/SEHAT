const mongoose = require("mongoose");

const doctorOnlineScheduleSchema = new mongoose.Schema({
  online_schedule: Array,
  userid: String,
});

doctorOnlineScheduleSchema.statics.getDoctorOnlineScheduleById = async function (
  userid
) {
  let doctor = await DoctorOnlineScheduleModel.findOne({ userid });
  return doctor;
};

doctorOnlineScheduleSchema.methods.addOnlineSchedule = async function (
  userid,
  online_schedule
) {
  let doctor = new DoctorOnlineScheduleModel({
    userid,
    online_schedule,
  });
  doctor.save();
  return doctor.OnlineSchedule;
};

doctorOnlineScheduleSchema.statics.updateOnlineSchedule = async function (
  userid,
  OnlineSchedule
) {
  let doctor = await DoctorOnlineScheduleModel.findOne({
    userid,
  });
  doctor.OnlineSchedule = OnlineSchedule;
  doctor.save();
  return doctor.OnlineSchedule;
};

doctorOnlineScheduleSchema.statics.bookOnlineSchedule = async function (
  userid,
  OnlineSchedule
) {
  let doctor = await DoctorOnlineScheduleModel.findOne({
    userid,
  });
  // not added
  doctor.save();
  return doctor.OnlineSchedule;
};

doctorOnlineScheduleSchema.set("toJSON", { virtuals: true });
const DoctorOnlineScheduleModel = mongoose.model(
  "doctorOnlineScheduleDb",
  doctorOnlineScheduleSchema
);
module.exports = DoctorOnlineScheduleModel;
