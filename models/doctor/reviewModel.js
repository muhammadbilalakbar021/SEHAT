doctorRecordSchema.statics.review = async function(RequestedBody) {
    let doctorRecord = await PatientModel.findById(RequestedBody.id);
    let updateDynamicSchema = {
        date: RequestedBody.date,
        pic: RequestedBody.pic,
        userName: RequestedBody.userName,
        patientId: RequestedBody.patientId,
        Star: RequestedBody.Star,
        comment: RequestedBody.comment,
    };

    doctorRecord.isdoctorRecord.review = doctorRecord.isdoctorRecord.review ? [...doctorRecord.isdoctorRecord.review] : [];
    doctorRecord.isdoctorRecord.review.push(updateDynamicSchema);
    doctorRecord.markModified("isdoctorRecord");
    doctorRecord.save();
    return doctorRecord;
};