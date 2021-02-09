const UserRouter = require("../../routes/api/v1/user/UserRouter");
module.exports = function (app) {
  app.use("/api/user", UserRouter);
};
