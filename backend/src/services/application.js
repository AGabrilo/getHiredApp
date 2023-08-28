const mongoose = require('mongoose')
const { ApplicationModel } = require("../models")

module.exports.getAllUserApplications = async (userId) => {
    console.log('Get all applications for user', userId)
    const filter = {
        userId: userId
    }
    return await ApplicationModel.find(filter);
}

module.exports.getAllCompanyApplications = async (companyId) => {
    console.log('Get all applications for company')

    const test = await ApplicationModel.aggregate([
        {
            $lookup: {
                from: "jobs",
                localField: "jobId",
                foreignField: "_id",
                as: 'jobInfo'
            }
        },
        { $unwind: "$jobInfo" },
        { $match: { "jobInfo.companyId": new mongoose.Types.ObjectId(companyId) } },
        { $unset: "jobInfo" }
    ]);
    return test
}

module.exports.getApplication = async (applicationId) => {
    console.log('Get application: ', applicationId)
    const filter = {
        _id: applicationId
    }
    return await ApplicationModel.findOne(filter);
}

module.exports.updateApplicationStatus = async (applicationId, status) => {
    const filter = {
        _id: applicationId
    }
    return await ApplicationModel.findOneAndUpdate(filter, { ...status }, { new: true });
}

module.exports.deleteUserApplication = async (applicationId) => {
    const filter = {
        _id: applicationId
    }
    return await ApplicationModel.findOneAndDelete(filter);
}

module.exports.createApplication = async (applicationObject) => {

    return await ApplicationModel.create({ ...applicationObject });
}