const express = require("express");
const router = express.Router();
const Joi = require("joi");
const AdminValidator = require("../../../../middlewares/validators/admin/AdminValidator");
const UserModel = require("../../../../models/user/UserModel");

// Post request for adding paatient
router.post("/", AdminValidator, async(req, res) => {
    try {
        user = await UserModel.findById(req.body.id);
        user.role.push("doctor");
        await user.save();
        p = new UserModel()
        a = await p.addDoctor(req.body.id, req.body.licenseNo);
        // Return Patient list
        return res.status(200).send("a");
    } catch (err) {
        console.log(err)
        return res.status(400).send("Error Adding Doctor!");
    }
});

module.exports = router;