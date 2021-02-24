const mongoose = require("mongoose");

const doctorOnlineScheduleSchema = new mongoose.Schema({
  online_schedule: Array,
  _id: { type: mongoose.Schema.Types.ObjectId },
});

doctorOnlineScheduleSchema.statics.getOnlineScheduleById = async function (id) {
  let doctor = await DoctorOnlineScheduleModel.findById(id);
  return doctor?.online_schedule;
};

doctorOnlineScheduleSchema.methods.addOnlineSchedule = async function (
  _id,
  online_schedule
) {
  let OS = await DoctorOnlineScheduleModel.findById(_id);
  if (!OS) {
    OS = new DoctorOnlineScheduleModel({
      _id,
      online_schedule,
    });
  } else {
    OS.online_schedule = online_schedule;
  }

  OS = await OS.save();
  return OS.online_schedule;
};

doctorOnlineScheduleSchema.statics.bookOnlineSchedule = async function (
  id,
  book
) {
  let OS = await DoctorOnlineScheduleModel.findById(id);
  for (let x in OS.online_schedule) {
    if (OS.online_schedule[x].day === book.day) {
      OS.online_schedule[x].time[book.index].status = true;
      break;
    }
  }
  OS.markModified("online_schedule");
  OS = await OS.save();
  return OS.online_schedule;
};

doctorOnlineScheduleSchema.set("toJSON", { virtuals: true });
const DoctorOnlineScheduleModel = mongoose.model(
  "doctorOnlineScheduleDb",
  doctorOnlineScheduleSchema
);
module.exports = DoctorOnlineScheduleModel;
