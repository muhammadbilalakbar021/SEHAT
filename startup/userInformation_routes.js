const auth = require("../middlewares/validators/auth");
const userInformationRouter = require("../routes/api/v1/userInformationRouter");
module.exports = function(app) {
    app.use("/api/information", auth, userInformationRouter);

};