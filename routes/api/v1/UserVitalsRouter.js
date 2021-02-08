const express = require("express");
const router = express.Router();
const UserVitalsValidator = require("../../../middlewares/validators/user/vitalsValidator");
const VitalsModel = require("../../../models/vitalsModels");

// Get request for returning specific patient
router.get("/:id", async(req, res) => {
    try {
        information = await VitalsModel.getUserVitalsById(
            req.params.id
        );
        // If Patient exist, return patient record
        return res.status(200).send(information);
    } catch (err) {
        res.status(400).send("Error from UserVitals by Id!");
    }
});
//Create a new one
router.post(
    "/addUserVitals",
    UserVitalsValidator,
    async(req, res) => {
        try {
            information = new VitalsModel();
            user_info = await information.addUserVitals(req.body);
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from addUserVitals");
        }
    }
);

router.post(
    "/addUserVitals/:id",
    UserVitalsValidator,
    async(req, res) => {
        try {
            user_info = await VitalsModel.appendUserVitals(
                req.params.id,
                req.body
            );
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from appendUserVitals");
        }
    }
);

router.put(
    "/addUserVitals",
    UserVitalsValidator,
    async(req, res) => {
        try {
            user_info = await VitalsModel.updateUserVitals(
                req.body
            );
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from updateUserVitals");
        }
    }
);

module.exports = router;