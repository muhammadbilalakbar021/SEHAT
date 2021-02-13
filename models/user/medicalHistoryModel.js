const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const MedicalHistorySchema = new mongoose.Schema({
    history: [{
        date: String,
        disease: String,
        symptom: Array,
        category: String,
        reaction: String,
        treatment: String,
        pic: Array,

    }],
    userid: String,
    isCreated: {
        type: Boolean,
        default: true,
    },
});

MedicalHistorySchema.statics.getMedicalHistoryById = async(userid) => {
    let info = await MedicalHistoryModel.findOne({ userid });
    return info;
};

MedicalHistorySchema.methods.addUserMedicalHistory = async function(user) {
    console.log("hello")
    const MedicalHistory_Obj = new MedicalHistoryModel({
        history: [{
            date: user.date,
            disease: user.disease,
            symptom: user.symptom,
            category: user.category,
            reaction: user.reaction,
            treatment: user.treatment,
            pic: user.pic,
        }],
        userid: user.id,
    });

    console.log("hello")

    let info = await MedicalHistory_Obj.save();
    return info;
};

MedicalHistorySchema.statics.appendUserMedicalHistory = async(userid, user) => {
    let info = await MedicalHistoryModel.findOne({ userid });
    info.history.push(user)
    info = await info.save()
    return info
}

MedicalHistorySchema.statics.updateMedicalHistory = async function(userid, user) {
    // let u = await MedicalHistoryModel.find({ 'userid': userid }, { history: { $elemMatch: { _id: user.historyId } } })
    // console.log(u[0].history)
    // u[0].history[0] = {...user.data}
    let info = await MedicalHistoryModel.findOne({ userid });
    for (let key in info.history) {
        if (info.history[key]._id == user.historyId) {
            info.history[key] = {...user.data }
            console.log(info.history[key])
            break
        }
    }
    info.markModified("info")
        // console.log(info)
    return await info.save()



};

MedicalHistorySchema.statics.ValidateUserMedicalHistory = async function(RequestedBody) {
    //  Validating
    return validate(RequestedBody.data);
};

function validate(patient) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        id: Joi.string().required(),
        date: Joi.string().required(),
        disease: Joi.string().required(),
        symptom: Joi.array().required(),
        category: Joi.string().min(2).required(),
        reaction: Joi.string().min(3).required(),
        treatment: Joi.string().min(3).required(),
        pic: Joi.array().optional(),
    });
    // Returniing the resuslt
    return schema.validate(patient, { abortEarly: false });
}

MedicalHistorySchema.set("toJSON", { virtuals: true });
const MedicalHistoryModel = mongoose.model(
    "medicalhistorydbs",
    MedicalHistorySchema
);
module.exports = MedicalHistoryModel;