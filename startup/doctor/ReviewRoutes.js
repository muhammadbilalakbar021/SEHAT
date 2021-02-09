const auth = require("../../middlewares/validators/auth/auth");
const isDoctor = require("../../middlewares/validators/role/isDoctor");
const ReviewRouter = require("../../routes/api/v1/doctor/ReviewRouter");
module.exports = function (app) {
  app.use("/api/review", auth, isDoctor, ReviewRouter);
};
