const auth = require("../middlewares/validators/auth");
const UserMedicalHistoryRouter = require("../routes/api/v1/UserMedicalHistoryRouter");
module.exports = function(app) {
    app.use("/api/medicalHistory", auth, UserMedicalHistoryRouter);
};