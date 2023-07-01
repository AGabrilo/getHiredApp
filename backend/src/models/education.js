const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: Date.now,
    },
    degreeType: {
        type: String,
        maxLength: 60
    },
    degreeName: {
        type: String,
        maxLength: 256
    },
    schoolName: {
        type: String,
        maxLength: 256
    }

});

const EducationModel = mongoose.model('education', EducationSchema)
module.exports = { 
    EducationModel,
    EducationSchema
 };