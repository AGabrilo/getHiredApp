const { AuthService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const sendEmail = require('../utils/emailUtil')
const { toUserObject } = require('../utils/parametersConversion')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

module.exports.createUser = catchAsync(async (req, res, next) => {
    const userObject = toUserObject(req)
    const { type } = req.body
    const newUser = await AuthService.createUser(userObject, type)

    if (newUser) {
        const token = signToken(newUser._id)

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    }
    else return next(new AppError('User not created', 400))
})

module.exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password, type } = req.body

    console.log('login userr', req.body)

    if (!email || !password) {
        return next(new AppError('You need to provide email and password!', 400))
    }

    if (!type) {
        return next(new AppError('You need to provide type!', 400))
    }

    const user = await AuthService.loginUser(email, type)

    console.log('user', user)

    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password!', 401))
    }

    const token = signToken(user._id)

    res.status(201).json({
        status: 'success',
        token,
        data: { user }
    })
})

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body

    const user = await AuthService.getUserByEmail(email)
    if (!user) {
        return next(new AppError('User not found', 404))
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL},\n`

    try {
        await sendEmail({
            email: 'anteaaa5555@gmail.com',
            subject: 'Your password reset token (valid for 10 min)',
            message
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
    } catch (e) {
        user.passwordResetExpires = undefined
        user.passwordResetToken = undefined
        await user.save({ validateBeforeSave: false })

        return next(new AppError('There was an error sending the email. Try again later!', 500))
    }
})

module.exports.resetPassword = catchAsync(async (req, res, next) => {

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await AuthService.getUserByToken(hashedToken)

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetExpires = undefined
    user.passwordResetToken = undefined
    await user.save()

})
