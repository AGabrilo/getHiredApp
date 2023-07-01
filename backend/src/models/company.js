const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({

    name: {
        type: String,
        required: true,
        maxLength: 256
    },
    picture: {
        type: String
    },

    employersNum: {
        type: Number
    },
    location: {
        city: String,
        country: String
    },

    description: {
        type: String
    },

    jobsPosted: {
        type: [Schema.ObjectId],
        ref: 'job',
        default: []
    }

});

const CompanyModel = mongoose.model('company',CompanySchema)
module.exports = CompanyModel;