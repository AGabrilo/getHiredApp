const { CompanyService } = require('../services')
const { toCompanyObject } = require('../utils/parametersConversion')

module.exports.getAllCompanies = async (req, res, next) => {
    try{
        const result = await CompanyService.getAllCompanies();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getCompany = async (req, res, next) => {
    const {companyId} = req.params;
    try{
        const result = await CompanyService.getCompany(companyId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.createCompany = async (req, res, next) => {
    const companyObject = req.body
    console.log(req.body)
    try{
        const result = await CompanyService.createCompany(companyObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteCompany = async (req, res, next) => {
    const {companyId} = req.params;
    try{
        const result = await CompanyService.deleteCompany(companyId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.updateCompany = async (req, res, next) => {
    const {companyId} = req.params;
    const companyObject = toCompanyObject(req);
    try{
        const result = await CompanyService.updateCompany(companyId, companyObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}