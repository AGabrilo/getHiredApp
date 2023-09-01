const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const Schema = mongoose.Schema;

const CompanySchema = new Schema({

    name: {
        type: String,
        required: true,
        maxLength: 256,
        unique: true
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
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'Enter email'],
        validate: [validator.isEmail, 'Provide valid email']
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
    role: {
        type: String,
        default: 'company'
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },

});

CompanySchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.repeatedPassword = undefined
    next()
})

CompanySchema.methods.checkPassword = async function (inputPassw, userPassw) {
    console.log('hereee')
    return await bcrypt.compare(inputPassw, userPassw)
}

CompanySchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const CompanyModel = mongoose.model('company', CompanySchema)
module.exports = CompanyModel;