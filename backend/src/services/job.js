const { JobModel, CompanyModel } = require("../models")

module.exports.getAllJobs = async () => {
    console.log('Get all jobs')
    return await JobModel.find();
}

module.exports.getJob = async (jobId) => {
    console.log('Get job: ', jobId)
    const filter = {
        _id: jobId
    }
    return await JobModel.findOne(filter);
}

module.exports.createJob = async (jobObject) => {

    const newJob = await JobModel.create({ ...jobObject })
    const company = await CompanyModel.findOneAndUpdate({ _id: jobObject.companyId }, { $push: { 'jobsPosted': newJob._id } }, { new: true })

    return newJob;
}

module.exports.deleteJob = async (jobId) => {
    const filter = {
        _id: jobId
    }
    const company = await CompanyModel.findOneAndUpdate({ jobsPosted: { $in: [jobId] } }, { $pullAll: { jobsPosted: [jobId] } }, { new: true })

    return await JobModel.findOneAndDelete(filter);
}

module.exports.updateJob = async (jobId, jobObject) => {
    const filter = {
        _id: jobId
    }
    return await JobModel.findOneAndUpdate(filter, {...jobObject}, { new: true });
}