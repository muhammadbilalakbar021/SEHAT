const auth = require("../middlewares/validators/auth/auth");
const PerceptionRouter = require("../routes/api/v1/PerceptionRouter");
module.exports = function (app) {
  app.use("/api/perception", auth, PerceptionRouter);
};
