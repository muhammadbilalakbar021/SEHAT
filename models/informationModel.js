const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

const userInformationSchema = new mongoose.Schema({
    blood: String,
    height: String,
    martial_status: String,
    address: String,
    cnic: String,
    userid: String,
    isCreated: {
        type: Boolean,
        default: true,
    },
});

userInformationSchema.statics.getUserInformationById = async(userid) => {
    let info = await UserInformationModel.findOne({ userid });
    return info;
};

userInformationSchema.methods.addUserInformation = async function(user) {
    const userInformation_Obj = new UserInformationModel({
        blood: user.blood,
        height: user.height,
        martial_status: user.martial_status,
        address: user.address,
        cnic: user.cnic,
        userid: user.id,
    });

    let info = await userInformation_Obj.save();
    return info;
};

userInformationSchema.statics.updateUserInformation = async function(user) {
    let info = await UserInformationModel.findOne({ userid: user.id });
    info.blood = user.blood;
    info.height = user.height;
    info.martial_status = user.martial_status;
    info.address = user.address;
    info.cnic = user.cnic;
    info.userid = user.id;
    info = await info.save();
    return info;
};

userInformationSchema.statics.ValidateUserInformation = async function(
    RequestedBody
) {
    //  Validating
    return validate(RequestedBody);
};

function validate(user) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        id: Joi.string().required(),
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
const UserInformationModel = mongoose.model(
    "informationdbs",
    userInformationSchema
);
module.exports = UserInformationModel;