const express = require("express");
const router = express.Router();
const UserMedicineStatusValidator = require("../../../../middlewares/validators/user/MedicineStatusValidator");
const UserMedicineStatusModel = require("../../../../models/user/MedicineStatusModel");

// Get request for returning specific patient
router.get("/:id", async(req, res) => {
    try {
        information = await UserMedicineStatusModel.getUserMedicineStatusById(
            req.params.id
        );
        // If Patient exist, return patient record
        return res.status(200).send(information);
    } catch (err) {

        res.status(400).send("Error from UserMedicineStatus by Id!");
    }
});
//Create a new one
router.post(
    "/addUserMedicineStatus",
    UserMedicineStatusValidator,
    async(req, res) => {
        try {
            information = new UserMedicineStatusModel();
            user_info = await information.addUserMedicineStatus(req.body);
            return res.status(200).send(user_info);
        } catch (err) {
            console.log(err)
            return res.status(400).send("Error from addUserMedicineStatus");
        }
    }
);

router.post(
    "/appendUserMedicineStatus/:id",
    UserMedicineStatusValidator,
    async(req, res) => {
        try {
            user_info = await UserMedicineStatusModel.appendUserMedicineStatus(
                req.params.id,
                req.body
            );
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from appendUserMedicineStatus");
        }
    }
);

router.put(
    "/updateUserMedicineStatus",
    UserMedicineStatusValidator,
    async(req, res) => {
        try {
            user_info = await UserMedicineStatusModel.updateUserMedicineStatus(
                req.body
            );
            return res.status(200).send(user_info);
        } catch (err) {
            return res.status(400).send("Error from updateUserMedicineStatus");
        }
    }
);

module.exports = router;