const mongoose = require('mongoose')
const applicationStatus = require('./enums/applicationStatus')

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    resume: {
        type: String
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    jobId: {
        type: Schema.ObjectId,
        ref: 'job'
    },
    companyId: {
        type: Schema.ObjectId,
        ref: 'company'
    },
    status: {
        type: String,
        enum: Object.values(applicationStatus),
        default: 'Pending'
    },

});

const ApplicationModel = mongoose.model('application', ApplicationSchema)
module.exports = ApplicationModel;