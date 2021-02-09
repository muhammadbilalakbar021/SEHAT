const auth = require("../../middlewares/validators/auth/auth");
const isDoctor = require("../../middlewares/validators/role/isDoctor");
const ClinicRouter = require("../../routes/api/v1/doctor/ClinicRouter");
module.exports = function (app) {
  app.use("/api/clinic", auth, isDoctor, ClinicRouter);
};
