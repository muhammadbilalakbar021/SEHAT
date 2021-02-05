const doctorsRouter = require("../routes/api/v1/doctorRouter");
module.exports = function (app) {
  app.use("/api/doctors", doctorsRouter);
  // app.use("/api/doctors",auth,isdoctor, doctorsRouter);
};
