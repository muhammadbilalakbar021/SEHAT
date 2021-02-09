const auth = require("../../middlewares/validators/auth/auth");
const isUser = require("../../middlewares/validators/role/isUser");
const UserMedicineStatusRouter = require("../../routes/api/v1/user/MedicineStatusRouter");
module.exports = function (app) {
  app.use("/api/medicineStatus", auth, isUser, UserMedicineStatusRouter);
};
