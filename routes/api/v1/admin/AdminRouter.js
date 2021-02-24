const express = require("express");
const router = express.Router();
const Joi = require("joi");
const AdminValidator = require("../../../../middlewares/validators/admin/AdminValidator");
const UserModel = require("../../../../models/user/UserModel");

// Post request for adding paatient
router.post("/", AdminValidator, async (req, res) => {
  try {
    let User = await UserModel.findById(req.body.id);
    User.role.push("doctor");
    await User.save();
    p = new UserModel();
    a = await p.addDoctor(req.body.id, req.body.licenseNo, req.body.specialty);
    // Return Patient list
    return res.status(200).send({
      _id: User.id,
      title: User.title,
      fname: User.fname,
      lname: User.lname,
      role: User.role,
      pic: User.pic,
      gender: User.gender,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error Adding Doctor!" });
  }
});

module.exports = router;
