const auth = require("../../middlewares/validators/auth/auth");
const isUser = require("../../middlewares/validators/role/isUser");
const UserInformationRouter = require("../../routes/api/v1/user/InformationRouter");
module.exports = function (app) {
  app.use("/api/information", auth, isUser, UserInformationRouter);
};
