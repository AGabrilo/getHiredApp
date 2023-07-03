const { JobService } = require('../services')

module.exports.getAllJobs = async (req, res, next) => {
    try{
        const result = await JobService.getAllJobs();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getJob = async (req, res, next) => {
    const {jobId} = req.params;
    console.log('Get job controller: ', jobId)
    try{
        const result = await JobService.getJob(jobId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.createJob = async (req, res, next) => {
    const jobObject = req.body
    console.log(req.body)
    try{
        const result = await JobService.createJob(jobObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteJob = async (req, res, next) => {
    const {jobId} = req.params;
    try{
        const result = await JobService.deleteJob(jobId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.updateJob = async (req, res, next) => {
    const {jobId} = req.params;
    const jobObject = req.body;
    try{
        const result = await JobService.updateJob(jobId, jobObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}