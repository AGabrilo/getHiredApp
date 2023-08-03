const { UserService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllUsers = catchAsync(async (req, res, next) => {

    const result = await UserService.getAllUsers();
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Users not found', 404))
})

module.exports.getUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await UserService.getUser(userId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not found', 404))
})


module.exports.createUser = catchAsync(async (req, res, next) => {
    const userObject = req.body
    const result = await UserService.createUser(userObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not created', 400))
})

module.exports.updateUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const userObject = req.body;
    const result = await UserService.updateUser(userId, userObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not updated', 400))
})

module.exports.deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await UserService.deleteUser(userId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not deleted', 400))
})