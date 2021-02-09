const express = require("express");
const router = express.Router();
const Joi = require("joi");
const AdminValidator = require("../../../../middlewares/validators/admin/AdminValidator");
const UserModel = require("../../../../models/user/UserModel");

// Post request for adding paatient
router.post("/", AdminValidator, async (req, res) => {
  try {
    p = await UserModel.addDoctor(req.body);
    // Return Patient list
    return res.status(200).send(p);
  } catch (err) {
    return res.status(400).send("Error Adding Doctor!");
  }
});

module.exports = router;
