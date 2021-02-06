const express = require("express");
const router = express.Router();
const UserMedicalHistoryValidator = require("../../../middlewares/validators/user/UserMedicalHistoryValidator");
const UserMedicalHistoryModel = require("../../../models/medicalHistoryModel");

// Get request for returning specific patient
router.get("/:id", async(req, res) => {
    try {
        information = await UserMedicalHistoryModel.getUserMedicalHistoryById(
            req.params.id
        );
        // If Patient exist, return patient record
        return res.status(200).send(information);
    } catch (err) {
        res.status(400).send("Error from UserMedicalHistory by Id!");
    }
});
//Create a new one
router.post(
    "/addUserMedicalHistory",
    UserMedicalHistoryValidator,
    async(req, res) => {
        try {
            information = new UserMedicalHistoryModel();
            user_info = await information.addUserMedicalHistory(req.body);
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from addUserMedicalHistory");
        }
    }
);

router.post(
    "/addUserMedicalHistory/:id",
    UserMedicalHistoryValidator,
    async(req, res) => {
        try {
            user_info = await UserMedicalHistoryModel.appendUserMedicalHistory(req.params.id, req.body);
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from addUserMedicalHistory");
        }
    }
);

router.put(
    "/addUserMedicalHistory",
    UserMedicalHistoryValidator,
    async(req, res) => {
        try {
            user_info = await UserMedicalHistoryModel.updateUserMedicalHistory(
                req.body
            );
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from updateUserMedicalHistory");
        }
    }
);

module.exports = router;