const { JobService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllJobs = catchAsync(async (req, res, next) => {
    const {skill, jobType, workLocation} = req.query
    const result = await JobService.getAllJobs(skill, jobType, workLocation);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Jobs not found', 404))
})

module.exports.getJob = catchAsync(async (req, res, next) => {
    const { jobId } = req.params;
    const result = await JobService.getJob(jobId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job not found', 404))
})

module.exports.createJob = catchAsync(async (req, res, next) => {
    const jobObject = req.body
    const result = await JobService.createJob(jobObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job not created', 400))
})

module.exports.deleteJob = catchAsync(async (req, res, next) => {
    const { jobId } = req.params;
    const result = await JobService.deleteJob(jobId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job not deleted', 400))
})

module.exports.updateJob = catchAsync(async (req, res, next) => {
    const { jobId } = req.params;
    const jobObject = req.body;
    const result = await JobService.updateJob(jobId, jobObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job not created', 400))
})