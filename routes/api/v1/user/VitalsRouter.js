const express = require("express");
const router = express.Router();
const UserVitalsValidator = require("../../../../middlewares/validators/user/VitalsValidator");
const VitalsModel = require("../../../../models/user/VitalsModels");

// Get request for returning specific patient
router.get("/:id", async(req, res) => {
    try {
        information = await VitalsModel.getUserVitalsById(req.params.id);
        // If Patient exist, return patient record
        return res.status(200).send(information);
    } catch (err) {
        res.status(400).send({ error: "Error from UserVitals by Id!" });
    }
});
//Create a new one
router.post("/addUserVitals", UserVitalsValidator, async(req, res) => {
    try {
        information = new VitalsModel();
        user_info = await information.addUserVitals(req.body);
        return res.status(200).send(user_info);
    } catch (err) {
        return res.status(400).send({ error: "Error from addUserVitals" });
    }
});

router.post("/appendUserVitals", UserVitalsValidator, async(req, res) => {
    try {
        user_info = await VitalsModel.appendUserVitals(req.body.id, req.body);
        return res.status(200).send(user_info);
    } catch (err) {
        return res.status(400).send({ error: "Error from appendUserVitals" });
    }
});

router.put("/updateUserVitals", UserVitalsValidator, async(req, res) => {
    try {
        user_info = await VitalsModel.updateUserVitals(req.body.id, req.body);
        return res.status(200).send(user_info);
    } catch (err) {
        return res.status(400).send({ error: "Error from updateUserVitals" });
    }
});

module.exports = router;