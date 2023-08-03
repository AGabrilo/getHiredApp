const { checkRequiredValue } = require('../utils/helpers')
const AppError = require('../utils/appError')

module.exports = (req, res, next) => {
    let { type, password, repeatedPassword, email } = req.body
    console.log('In middlewareeeeee')

    try {
        if (checkRequiredValue({ password }) && checkRequiredValue({ repeatedPassword }) && checkRequiredValue({ email }) && checkRequiredValue({ type })) {
            next()
        }
    }
    catch (e) {
        next(new AppError(...JSON.parse(e.message), 400))
    }
}