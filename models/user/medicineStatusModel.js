const mongoose = require("mongoose");
const Joi = require("joi");
const { func, array } = require("joi");
var sess_; // global session, NOT recommended

const MedicineStatusSchema = new mongoose.Schema({
    medicine_status: [{
        date: String,
        drug: String,
        dosage: String,
        description: String,
        pic: Array,
    }, ],
    userid: String,
});

MedicineStatusSchema.statics.getMedicineStatusById = async(userid) => {
    let info = await MedicineStatusModel.findOne({ userid });
    return info;
};

MedicineStatusSchema.methods.addUserMedicineStatus = async function(user) {
    let info = await MedicineStatusModel.findOne({ "userid": user.id });

    if (info === null) {
        info = new MedicineStatusModel({
            medicine_status: [{...user.medicine_status }],
            userid: user.id,
        });
    } else {
        info.medicine_status.push(user.medicine_status);
    }
    info = await info.save();
    return info;

};

MedicineStatusSchema.statics.appendUserMedicineStatus = async(userid, user) => {
    let info = await MedicineStatusModel.findOne({ userid });
    info.MedicineStatus.push(user);
    info = await info.save();
    return info;
};

MedicineStatusSchema.statics.updateMedicineStatus = async function(user) {};

MedicineStatusSchema.statics.ValidateUserMedicineStatus = async function(RequestedBody) {
    //  Validating
    return validate(RequestedBody.medicine_status);
};

function validate(MedicineStatus) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        id: Joi.string().required(),
        date: Joi.string().required(),
        blood_pressure: Joi.string(),
        blood_glucose: Joi.string(),
        heart_beat: Joi.string(),
        weight: Joi.string(),
    });
    // Returniing the resuslt
    return schema.validate(MedicineStatus, { abortEarly: false });
}

MedicineStatusSchema.set("toJSON", { virtuals: true });
const MedicineStatusModel = mongoose.model(
    "MedicineStatusdbs",
    MedicineStatusSchema
);
module.exports = MedicineStatusModel;