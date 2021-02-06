const auth = require("../middlewares/validators/auth");
const UserInformationRouter = require("../routes/api/v1/UserInformationRouter");
module.exports = function (app) {
  app.use("/api/information", auth, UserInformationRouter);
};
