const UserRouter = require("../routes/api/v1/UserRouter");
module.exports = function (app) {
  app.use("/api/user", UserRouter);
};
