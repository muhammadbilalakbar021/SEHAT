const auth = require("../../middlewares/validators/auth/auth");
const isAdmin = require("../../middlewares/validators/role/isAdmin");
const adminRouter = require("../../routes/api/v1/admin/AdminRouter");
module.exports = function (app) {
  app.use("/api/admin", auth, isAdmin, adminRouter);
};
