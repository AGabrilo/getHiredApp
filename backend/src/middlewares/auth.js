const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const { AuthService } = require('../services')

module.exports.Authorization = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const userNow = await AuthService.getUserById(decoded.id)

  if (!userNow) {
    return next(new AppError('The user that this token belongs to does no longer exist ', 401))
  }

  req.userId = decoded.id
  req.user = userNow
  next()
})

exports.restrictTo = ([...roles], paramName) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role) || (req.user.role !== 'admin' && req.params[paramName] && req.params[paramName] !== req.user._id.toHexString())) {
      console.log('roles',roles,req.user.role)
      return next(new AppError('You do not have permission to perform this action', 403))
    }
    next();
  }
}
