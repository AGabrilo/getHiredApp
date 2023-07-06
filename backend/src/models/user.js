const mongoose = require('mongoose')
const skill = require('./enums/skill')
const { ExperienceSchema } = require('./experience');
const { EducationSchema } = require('./education');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    location: {
        city: String,
        country: String
    },
    gitHubProfile: {
        type: String
    },
    email: {
        type: String
    },
    summary: {
        type: String
    },
    resume: {
        type: String
    },
    picture: {
        type: String
    },
    openToWork: {
        type: Boolean,
        default: false
    },
    skills: {
        type: [String],
        enum: Object.values(skill),
        default:[]
    },
    workExperience: {
        type: [ExperienceSchema],
        default: []
    },
    education: {
        type: [EducationSchema],
        default: []
    },
    favourites: {
        type: [Schema.ObjectId],
        ref: 'job',
        default: []
    }

});

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;