const express = require("express");
const router = express.Router();
const { userSchema } = require("../../../models/UserModel");
const UserInformationValidator = require("../../../middlewares/validators/user/UserInformationValidator");
const userInformationSchema = require("../../../models/informationModel");

// Get request for returning specific patient
router.get("/getUserInformation/:id", async(req, res) => {
    try {
        patient = await PatientSchema.getuserInformationtById(userId = req.params.id);
        // If Patient exist, return patient record
        res.send(patient);
    } catch (err) {
        res.status(400).send("Error from UserInformationbyId")
    }
});


router.post(
    "/addUserInformation", UserInformationValidator, async(req, res) => {
        try {
            infromation = new userInformationSchema()
            userInformation = infromation.addUserInfomration(req.body)
            res.send(userInformation);
        } catch (err) {
            res.status(400).send("Error from addUserInformation")
        }
    }
);



module.exports = router;