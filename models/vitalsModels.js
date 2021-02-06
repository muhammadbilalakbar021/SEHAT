const mongoose = require("mongoose");
const Joi = require("joi");
const { func } = require("joi");
var sess_; // global session, NOT recommended

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    title: String,
    DOB: String,
    pic: String,
    Ph: Number,
    gender: String,
    emailAddress: String,
    password: String,
    role: []
})

const UserModel = mongoose.model("userDb", userSchema);