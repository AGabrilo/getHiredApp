const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String
    },
    jobTitle: {
        type: String,
        maxLength: 256
    },
    companyName: {
        type: String,
        maxLength: 256
    },
    location:{
        country: String,
        city: String
    }

});

const ExperienceModel = mongoose.model('experience', ExperienceSchema)
module.exports = { 
    ExperienceModel,
    ExperienceSchema
 };