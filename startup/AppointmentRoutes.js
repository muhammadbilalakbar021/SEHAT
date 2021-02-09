const auth = require("../middlewares/validators/auth/auth");
const AppointmentRouter = require("../routes/api/v1/AppointmentRouter");
module.exports = function (app) {
  app.use("/api/appointment", auth, AppointmentRouter);
};
