const { checkRequiredValue } = require('../utils/helpers')
const AppError = require('../utils/appError')

module.exports = (req, res, next) => {
    let { name } = req.body

    try {
        if (checkRequiredValue({ name })) {
            next()
        }
    }
    catch (e) {
        next(new AppError(...JSON.parse(e.message), 400))
    }
}