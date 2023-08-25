const mongoose = require('mongoose')
const skill = require('./enums/skill')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
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
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },
    gitHubProfile: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'Enter email'],
        validate: [validator.isEmail, 'Provide valid email']
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
        default: []
    },
    workExperience: {
        type: [ExperienceSchema],
        default: []
    },
    education: {
        type: [EducationSchema],
        default: []
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        require: [true, 'Enter password'],
        minlength: 8,
        select: false
    },
    repeatedPassword: {
        type: String,
        require: [true, 'Repeat password'],
        validate: {
            validator: function (el) {
                return el === this.password
            }
        }
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },

});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.repeatedPassword = undefined
    next()
})

UserSchema.methods.checkPassword = async function (inputPassw, userPassw) {
    return await bcrypt.compare(inputPassw, userPassw)
}

UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const UserModel = mongoose.model('user', UserSchema)
module.exports = UserModel;