const auth = require("../../middlewares/validators/auth/auth");
const isUser = require("../../middlewares/validators/role/isUser");
const UserVitalsRouter = require("../../routes/api/v1/user/VitalsRouter");
module.exports = function(app) {
    app.use("/api/vitals", auth, isUser, UserVitalsRouter);
};