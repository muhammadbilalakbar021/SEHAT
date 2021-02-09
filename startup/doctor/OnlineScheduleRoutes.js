const auth = require("../../middlewares/validators/auth/auth");
const isDoctor = require("../../middlewares/validators/role/isDoctor");
const OnlineScheduleRouter = require("../../routes/api/v1/doctor/OnlineScheduleRouter");
module.exports = function (app) {
  app.use("/api/OnlineSchedule", auth, isDoctor, OnlineScheduleRouter);
};
