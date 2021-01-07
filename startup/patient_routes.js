const patientsRouter = require("../routes/api/v1/patientsRouter");
module.exports = function(app) {
    app.use("/api/patients", patientsRouter);

};