const AuthRouter = require("../../routes/api/v1/auth/AuthRouter");
module.exports = function(app) {
    app.use("/api/auth", AuthRouter);
};