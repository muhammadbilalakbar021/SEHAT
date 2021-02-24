const auth = require("../../middlewares/validators/auth/auth");
const isDoctor = require("../../middlewares/validators/role/isDoctor");
const RecordRouter = require("../../routes/api/v1/doctor/RecordRouter");
module.exports = function (app) {
  app.use("/api/record", RecordRouter);
};
