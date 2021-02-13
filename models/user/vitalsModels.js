const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const VitalsSchema = new mongoose.Schema({
    vitals: [{
        date: String,
        blood_pressure: String,
        blood_glucose: String,
        heart_beat: String,
        weight: String,
    }],
    userid: String,
});

VitalsSchema.statics.getVitalsById = async(userid) => {
    let info = await VitalsModel.findOne({ userid });
    return info;
};

VitalsSchema.methods.addUserVitals = async function(user) {
    const Vitals_Obj = new VitalsModel({
        vitals: [{
            date: user.date,
            blood_pressure: user.blood_pressure,
            blood_glucose: user.blood_glucose,
            heart_beat: user.heart_beat,
            weight: user.weight,
        }],
        userid: user.id,
    });
    let info = await Vitals_Obj.save();
    return info;
};

VitalsSchema.statics.appendUserVitals = async(userid, user) => {
    let info = await VitalsModel.findOne({ userid });
    info.vitals.push(user)
    info = await info.save()
    return info
}

VitalsSchema.statics.updateUserVitals = async function(userid, userVital) {
    console.log("hello")
    let info = await VitalsModel.findOne({ userid });
    for (let key in info.vitals) {
        if (info.vitals[key]._id == userVital.vitalId) {
            info.vitals[key] = {...userVital.data }
                // console.log(info.vitals[key])
            break
        }
    }
    info.markModified("vitals")
    console.log("info")
    return await info.save()
};

VitalsSchema.statics.ValidateUserVitals = async function(RequestedBody) {
    //  Validating
    return validate(RequestedBody.data);
};

function validate(vitals) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        // id: Joi.string().required(),
        date: Joi.string().required(),
        blood_pressure: Joi.string(),
        blood_glucose: Joi.string(),
        heart_beat: Joi.string(),
        weight: Joi.string(),

    });
    // Returniing the resuslt
    return schema.validate(vitals, { abortEarly: false });
}

VitalsSchema.set("toJSON", { virtuals: true });
const VitalsModel = mongoose.model(
    "Vitalsdbs",
    VitalsSchema
);
module.exports = VitalsModel;