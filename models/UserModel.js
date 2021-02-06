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

// Its a static Method which can be called as user.doStuff();
userSchema.statics.getuserById = async function(userId) {
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

userSchema.statics.getuser = async function() {
    var result = [];
    const user_Obj_Result = await UserModel.find();
    user_Obj_Result.forEach(function(doc, err) {
        result.push(doc);
    });
    return result;
};

userSchema.statics.getPage = async function(page = 1, perPage = 10) {
    return this.find()
        .limit(perPage)
        .skip((page - 1) * perPage);
};

userSchema.statics.validateByGivenDoctorId = async function(RequestedBody) {
    user = await UserModel.findById(
        RequestedBody.id,
        function(err, user) {
            if (err) return "Error 404 No doctor with the given id in the record";
        }
    );
    if (user.role === "doctor") {
        next();
    } else {
        return "Error 203 The given id is user";
    }
};

userSchema.statics.addMedicineStatus = async function(RequestedBody) {
    let user = await UserModel.findById(RequestedBody.id);

    let updateDynamicSchema = {
        date: RequestedBody.date,
        pic: RequestedBody.pic,
        medicine: RequestedBody.medicine,
        dosage: RequestedBody.dosage,
        description: RequestedBody.description,
        status: true,
    };

    let update = [...user.medicine_status];
    update.push(updateDynamicSchema);
    user.medicine_status = update;
    user.save();
    return user;
};

userSchema.statics.removeMedicineStatus = async function(RequestedBody) {
    let user = await UserModel.findById(RequestedBody.id);
    let index = 0;
    for (let key in user.medicine_status) {
        if (user.medicine_status[key].medicine === RequestedBody.medicine) {
            index = key;
            break;
        }
    }
    user.medicine_status[index].status = false;
    user.markModified("medicine_status");
    user.save();
    return user;
};

userSchema.statics.updateInfo = async function(RequestedBody) {
    let user = await UserModel.findById(RequestedBody.id);

    let updateDynamicSchema = {};
    updateDynamicSchema["blood"] = RequestedBody.blood;
    updateDynamicSchema["height"] = RequestedBody.height;
    updateDynamicSchema["martial_status"] = RequestedBody.martial_status;
    updateDynamicSchema["address"] = RequestedBody.address;
    user.DOB = RequestedBody.DOB;
    user.pic = RequestedBody.pic;
    user.emailAddress = RequestedBody.emailAddress;
    user.Ph = RequestedBody.Ph;
    user.information = {...updateDynamicSchema };
    user.save();
    return user;
};

userSchema.statics.addRecord = async function(RequestedBody) {
    let user = await UserModel.findById(RequestedBody.id);

    let updateDynamicSchema = {};
    updateDynamicSchema["date"] = RequestedBody.date;
    updateDynamicSchema["disease"] = RequestedBody.disease;
    updateDynamicSchema["symptom"] = RequestedBody.symptom;
    updateDynamicSchema["category"] = RequestedBody.category;
    updateDynamicSchema["reaction"] = RequestedBody.reaction;
    updateDynamicSchema["treatment"] = RequestedBody.treatment;
    updateDynamicSchema["pic"] = RequestedBody.pic;

    let update = [...user.medical_History];
    update.push(updateDynamicSchema);
    user.medical_History = update;
    user.save();
    return user;
};

userSchema.statics.addVitals = async function(RequestedBody) {
    let user = await UserModel.findById(RequestedBody.id);

    let updateDynamicSchema = {};
    updateDynamicSchema["date"] = RequestedBody.date;
    updateDynamicSchema["blood_pressure"] = RequestedBody.blood_pressure;
    updateDynamicSchema["heart_beat"] = RequestedBody.heart_beat;
    updateDynamicSchema["blood_glucose"] = RequestedBody.blood_glucose;
    updateDynamicSchema["weight"] = RequestedBody.weight;

    let update = [...user.vitals];
    update.push(updateDynamicSchema);
    user.vitals = update;
    await user.save();
    return user;
};

userSchema.statics.getuserByEmailPasscode = async function(
    RequestedInformation
) {
    const userCredientials = await UserModel.findOne({
        emailAddress: RequestedInformation.emailAddress,
        password: RequestedInformation.password,
    });
    return {
        id: userCredientials._id,
        name: userCredientials.title +
            " " +
            userCredientials.fname +
            " " +
            userCredientials.lname,
        role: userCredientials.role,
        pic: userCredientials.pic,
        gender: userCredientials.gender,
    };
};

//can be called on instance like. let p = new user(); p.doStuffOnSIngleRecord();
//dont use arrow functions here
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



userSchema.statics.validateMedRecord = async function(RequestedBody) {
    //  Validating
    return ValidateMedicalRecord(RequestedBody);
};

userSchema.statics.validateVitals = async function(RequestedBody) {
    //  Validating
    return validateVit(RequestedBody);
};

userSchema.statics.validateMedicineStatus = async function(RequestedBody) {
    //  Validating
    return validateMS(RequestedBody);
};

userSchema.post("save", async(doc) => {
    //https://mongoosejs.com/docs/middleware.html
    //this method will be called when a save is successful on a single record
});

function validateuser(user) {
    // Designing JOI Validation schema
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().min(3).required(),
        title: Joi.string().min(2).required(),
        DOB: Joi.string().min(3).required(),
        pic: Joi.optional(),
        Ph: Joi.number().required(),
        emailAddress: Joi.string().email().min(6).required(),
        gender: Joi.string().required(),
        password: Joi.string().min(5).required(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}



function ValidateMedicalRecord(user) {
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
    return schema.validate(user, { abortEarly: false });
}

function validateMS(user) {
    const schema = Joi.object({
        id: Joi.string().required(),
        date: Joi.string().required(),
        medicine: Joi.string().required(),
        dosage: Joi.string().required(),
        description: Joi.string().required(),
        pic: Joi.array().optional(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}

function validateVit(user) {
    const schema = Joi.object({
        id: Joi.string().required(),
        date: Joi.string().required(),
        blood_pressure: Joi.string().required(),
        heart_beat: Joi.string().required(),
        blood_glucose: Joi.string().required(),
        weight: Joi.string().required(),
    });
    // Returniing the resuslt
    return schema.validate(user, { abortEarly: false });
}

userSchema.set("toJSON", { virtuals: true });
const userSchema = mongoose.model("user", userSchema);
module.exports = { userSchema, UserModel };