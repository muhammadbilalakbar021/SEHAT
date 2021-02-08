const auth = require("../middlewares/validators/auth");
const UserVitalsRouter = require("../routes/api/v1/UserVitalsRouter");
module.exports = function(app) {
    app.use("/api/vitals", auth, UserVitalsRouter);
};