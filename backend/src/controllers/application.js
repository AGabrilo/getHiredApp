const { ApplicationService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { toApplicationObject } = require('../utils/parametersConversion');

module.exports.getAllUserApplications = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await ApplicationService.getAllUserApplications(userId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User applications not found', 404))
})

module.exports.getAllCompanyApplications = catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    console.log(companyId)
    const result = await ApplicationService.getAllCompanyApplications(companyId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('User applications not found', 404))
})

module.exports.getApplication = catchAsync(async (req, res, next) => {
    const { applicationId } = req.params;
    const result = await ApplicationService.getApplication(applicationId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Application not found', 404))
})

module.exports.createApplication = catchAsync(async (req, res, next) => {
    console.log('helooo',req.body)
    const applicationObject = toApplicationObject(req)
    const result = await ApplicationService.createApplication(applicationObject);
    if (result) {
        res.status(201).json(result);
    }
    else return next(new AppError('Application not created', 400))
})

module.exports.deleteUserApplication = catchAsync(async (req, res, next) => {
    const { applicationId } = req.params;
    const result = await ApplicationService.deleteUserApplication(applicationId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Application not updated', 400))
})

module.exports.updateApplicationStatus = catchAsync(async (req, res, next) => {
    const { applicationId } = req.params;
    const status = req.body;
    const result = await ApplicationService.updateApplicationStatus(applicationId, status);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Application status not updated', 400))
})