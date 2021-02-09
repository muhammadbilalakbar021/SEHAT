const auth = require("../../middlewares/validators/auth/auth");
const isUser = require("../../middlewares/validators/role/isUser");
const UserMedicalHistoryRouter = require("../../routes/api/v1/user/MedicalHistoryRouter");
module.exports = function (app) {
  app.use("/api/medicalHistory", auth, isUser, UserMedicalHistoryRouter);
};
