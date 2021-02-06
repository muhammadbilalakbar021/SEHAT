const mongoose = require("mongoose");
const Joi = require("joi");
const { func } = require("joi");
const { UserModel } = require("./UserModel");

const userInformationSchema = new mongoose.Schema({
    blood: String,
    height: String,
    martial_status: String,
    address: String,
    cnic: String,
    userId: Number
})

const UserInformationModel = mongoose.model("userInformationDb", userInformationSchema);

userInformationSchema.statics.getuserInformationtById = async(userId) => {
    return user = await UserInformationModel.findOne({ userId }, function(err, user) {
        if (err) return "Error 404 No user with the given id in the record";
    });
}

userInformationSchema.method.addUserInfomration = async(user) => {
    const userInformation_Obj = new UserInformationModel({
        blood: user.blood,
        height: user.height,
        martial_status: user.martial_status,
        address: user.address,
        cnic: user.cnic,
        userId: user._id
    });

    await userInformation_Obj.save();
    return {
        blood: user.blood,
        height: user.height,
        martial_status: user.martial_status,
        address: user.address,
        cnic: user.cnic
    };

}

userInformationSchema.statics.ValidateUserInformation = async function(RequestedBody) {
    //  Validating
    return validate(RequestedBody);
};


function validate(user) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        userid: Joi.string().required(),
        blood: Joi.string().required(),
        height: Joi.number().required(),
        martial_status: Joi.string().min(2).required(),
        address: Joi.string().min(8).required(),
        cnic: Joi.number().required(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}


userInformationSchema.set("toJSON", { virtuals: true });

module.exports = UserInformationModel;