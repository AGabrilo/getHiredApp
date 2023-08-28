const { UserService, ApplicationService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const { toUserObject } = require('../utils/parametersConversion');
const path = require('path');
// filesystem module
const fs = require("fs");
const { File } = require('buffer');

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
    const loggedUser = req.user
    const userObject = toUserObject(req);
    console.log('reqq', req.files)
    const result = await UserService.updateUser(userId, userObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not updated', 400))
})

module.exports.deleteUser = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const loggedUser = req.user
    const result = await UserService.deleteUser(userId, loggedUser);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User not deleted', 400))
})

module.exports.downloadResume = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await ApplicationService.getApplication(id);
    if (result) {
        let file = '../../public'+ result.resume
        try {
            res.download(path.join(__dirname, file), function (err) {
                        if (err) {
                            console.log("Error");
                            console.log(err);
                        } else {
                            console.log("Success");
                        } }) 
            
        } catch (err) {
            console.log("Error: " + err);
        } finally {
        } 
    }
    else return next(new AppError('Application not found', 404))

})