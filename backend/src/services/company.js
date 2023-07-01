const { CompanyModel } = require("../models")

module.exports.getAllCompanies = async () => {
    return await CompanyModel.find();
}

module.exports.getCompany = async (companyId) => {
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

module.exports.deleteCompany = async (companyId) => {
    const filter = {
        _id: companyId
    }
    return await CompanyModel.findOneAndDelete(filter);
}

module.exports.createCompany = async ( companyObject) => {


    let newCompany = {
        ...companyObject
    }

    console.log(newCompany)
    return await CompanyModel.create(newCompany);
}