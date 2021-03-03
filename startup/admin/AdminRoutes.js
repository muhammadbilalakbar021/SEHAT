const auth = require("../../middlewares/validators/auth/auth");
const adminRouter = require("../../routes/api/v1/admin/AdminRouter");
module.exports = function (app) {
  app.use("/api/admin", auth, adminRouter);
};
