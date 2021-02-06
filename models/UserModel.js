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
userSchema.statics.getUserById = async function (userId) {
  // Validating if given user is in our List
  //const user = users.find(p => p.id === parseInt(userId));
  // If not existing, return 404

  user = await UserModel.findById(userId, function (err, user) {
    if (err) return "Error 404 No user with the given id in the record";
  });
  let p = { ...user };
  delete p._doc.password;

  return p._doc;
};

userSchema.statics.getUser = async function () {
  var result = [];
  const User = await UserModel.find();
  User.forEach(function (doc, err) {
    doc = { ...doc._doc };
    delete doc["password"];
    result.push(doc);
  });
  return result;
};

userSchema.statics.getPage = async function (page = 1, perPage = 10) {
  return this.find()
    .limit(perPage)
    .skip((page - 1) * perPage);
};

userSchema.statics.getUserByEmailPassword = async function (data) {
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

//can be called on instance like. let p = new user(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
<<<<<<< Updated upstream
<<<<<<< Updated upstream
userSchema.methods.adduser = async function(userName) {
    // Add user
    const user_Obj = new UserModel({
        fname: userName.fname,
        lname: userName.lname,
        title: userName.title,
        DOB: userName.DOB,
        gender: userName.gender,
        pic: userName.pic,
        Ph: userName.Ph,
        emailAddress: userName.emailAddress,
        password: userName.password,
    });

    const user = await user_Obj.save();
    return {
        id: user._id,
        name: user.title + " " + user.fname + " " + user.lname,
        role: user.role,
        pic: user.pic,
        gender: user.gender,
    };
};


//Validation Functions
userSchema.statics.validate = async function(RequestedBody) {
    //  Validating
    return validateuser(RequestedBody);
};

userSchema.statics.validateInfo = async function(RequestedBody) {
    //  Validating
    return UpdateInformation(RequestedBody);
};

function UpdateInformation(user) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        id: Joi.string().required(),
        blood: Joi.string().required(),
        height: Joi.number().required(),
        martial_status: Joi.string().min(2).required(),
        DOB: Joi.string().min(3).required(),
        pic: Joi.optional(),
        address: Joi.string().min(8).required(),
        emailAddress: Joi.string().email().min(6).required(),
        Ph: Joi.number().required(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}

userSchema.statics.validateMedRecord = async function(RequestedBody) {
    //  Validating
    return ValidateMedicalRecord(RequestedBody);
};

userSchema.statics.validateVitals = async function(RequestedBody) {
    //  Validating
    return validateVit(RequestedBody);
=======
userSchema.methods.addUser = async function (data) {
  // Add user
  const user_Obj = new UserModel({
    fname: data.fname,
    lname: data.lname,
    title: data.title,
    DOB: data.DOB,
    gender: data.gender,
    pic: data.pic,
    Ph: data.Ph,
    email: data.email,
    password: data.password,
    role: ["patient"],
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
>>>>>>> Stashed changes
};

//Validation Functions Sign up user info
userSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateUser(RequestedBody);
};

=======
userSchema.methods.addUser = async function (data) {
  // Add user
  const user_Obj = new UserModel({
    fname: data.fname,
    lname: data.lname,
    title: data.title,
    DOB: data.DOB,
    gender: data.gender,
    pic: data.pic,
    Ph: data.Ph,
    email: data.email,
    password: data.password,
    role: ["patient"],
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
userSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateUser(RequestedBody);
};

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// const userSchema = mongoose.model("user", userSchema);
module.exports = { userSchema, UserModel };
=======
=======
>>>>>>> Stashed changes
<<<<<<< HEAD
const UserModel = mongoose.model("userDb", userSchema);
module.exports = UserModel;
=======
const userSchema = mongoose.model("user", userSchema);
module.exports = { userSchema, UserModel };
>>>>>>> 2c9513a730d0e39c9e2bc7d00b7c7e8ab459cd0b
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
