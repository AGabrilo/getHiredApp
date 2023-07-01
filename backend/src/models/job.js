const mongoose = require('mongoose')
const jobType = require('./enums/jobType')
const skill = require('./enums/skill')
const workLocation = require('./enums/workLocation')

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    datePosted: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        default: Date.now,
    },
    jobTitle: {
        type: String
    },
    description: {
        type: String
    },
    hiringNum: {
        type: Number
    },
    location: {
        city: String,
        country: String
    },
    companyId: {
        type: Schema.ObjectId,
        ref: 'company'
    },
    jobType: {
        type: String,
        enum: Object.values(jobType),
    },
    workLocation: {
        type: String,
        enum: Object.values(workLocation),
    },
    skills: {
        type: [String],
        enum: Object.values(skill),
    },

});

const JobModel = mongoose.model('job', JobSchema)
module.exports = JobModel;