const auth = require("../../middlewares/validators/auth/auth");
const isDoctor = require("../../middlewares/validators/role/isDoctor");
const DoctorRouter = require("../../routes/api/v1/doctor/DoctorRouter");
module.exports = function (app) {
  app.use("/api/doctor", auth, DoctorRouter);
};
