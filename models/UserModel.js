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
    email: String,
    password: String,
    role: Array,
});

// Its a static Method which can be called as user.doStuff();
userSchema.statics.getUserById = async function(userId) {
    // Validating if given user is in our List
    //const user = users.find(p => p.id === parseInt(userId));
    // If not existing, return 404

    user = await UserModel.findById(userId, function(err, user) {
        if (err) return "Error 404 No user with the given id in the record";
    });
    let p = {...user };
    delete p._doc.password;

    return p._doc;
};

userSchema.statics.getAllUsers = async function() {
    var result = [];
    const User = await UserModel.find();
    User.forEach(function(doc, err) {
        doc = {...doc._doc };
        delete doc["password"];
        result.push(doc);
    });
    return result;
};

userSchema.statics.getUserByEmailPassword = async function(data) {
    const User = await UserModel.findOne({
        email: data.email,
        password: data.password,
    });
    return {
        _id: User._id,
        name: User.title + " " + User.fname + " " + User.lname,
        role: User.role,
        pic: User.pic,
        gender: User.gender,
        role: User.role,
    };
};

userSchema.methods.addUser = async function(data) {
    // Add user
    const user_Obj = new UserModel({
        fname: data.fname,
        lname: data.lname,
        title: data.title,
        dob: data.dob,
        gender: data.gender,
        pic: data.pic,
        ph: data.ph,
        email: data.email,
        password: data.password,
        role: ["patient"]
    });

    const user = await user_Obj.save();
    return {
        _id: user._id,
        name: user.title + " " + user.fname + " " + user.lname,
        role: user.role,
        pic: user.pic,
        gender: user.gender,
        role: user.role,
    };
};

//Validation Functions Sign up user info
userSchema.statics.validate = async function(RequestedBody) {
    //  Validating
    return validateUser(RequestedBody);
};

//Function
function validateUser(user) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().min(3).required(),
        title: Joi.string().min(2).required(),
        dob: Joi.string().min(3).required(),
        pic: Joi.optional(),
        ph: Joi.number().required(),
        email: Joi.string().email().min(6).required(),
        gender: Joi.string().required(),
        password: Joi.string().min(5).required(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}

userSchema.set("toJSON", { virtuals: true });
const UserModel = mongoose.model("userDb", userSchema);
module.exports = UserModel;