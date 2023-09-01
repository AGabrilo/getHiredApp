const { CompanyModel, JobModel } = require("../models")

module.exports.getAllCompanies = async () => {
    console.log('Get all companies')
    return await CompanyModel.find();
}

module.exports.getCompany = async (companyId) => {
    console.log('Get company: ', companyId)
    const filter = {
        _id: companyId
    }
    return await CompanyModel.findOne(filter);
}

module.exports.updateCompany = async (companyId, companyObject) => {
    const filter = {
        _id: companyId
    }

    let updatedCompany = {
        ...companyObject
    }
    return await CompanyModel.findOneAndUpdate(filter, updatedCompany, { new: true });
}

module.exports.deleteCompany = async (loggedUser, companyId) => {
    const filter = {
        _id: companyId
    }
    if (loggedUser.role === 'admin' || loggedUser._id.toString() === companyId) {
        let jobs = await JobModel.deleteMany({ companyId })
        return await CompanyModel.findOneAndDelete(filter);
    }
    else return null
}

module.exports.createCompany = async (companyObject) => {
    let newCompany = {
        ...companyObject
    }

    console.log(newCompany)
    return await CompanyModel.create(newCompany);
}