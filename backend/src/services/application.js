const { ApplicationModel } = require("../models")

module.exports.getAllUserApplications = async (userId) => {
    console.log('Get all applications for user')
    const filter = {
        userId: userId
    }
    return await ApplicationModel.find(filter);
}

module.exports.getAllCompanyApplications = async (companyId) => {
    console.log('Get all applications for company')
    const filter = {
        companyId: companyId
    }

    return await ApplicationModel.find(filter);
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
    return await ApplicationModel.findOneAndUpdate(filter, {... status}, { new: true });
}

module.exports.deleteUserApplication = async (applicationId) => {
    const filter = {
        _id: applicationId
    }
    return await ApplicationModel.findOneAndDelete(filter);
}

module.exports.createApplication = async ( applicationObject) => {

    return await ApplicationModel.create({... applicationObject});
}