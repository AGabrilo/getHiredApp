const AppError = require('./appError')

module.exports.checkRequiredValue = (value) => {
    if(!!Object.values(value).at(0)) return true
    else throw new AppError('Required value is not defined', 400)
}