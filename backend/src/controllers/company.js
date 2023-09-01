const { CompanyService } = require('../services')
const { toCompanyObject } = require('../utils/parametersConversion')
const { removeFile } = require('../utils/helpers')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllCompanies = catchAsync(async (req, res, next) => {
    const result = await CompanyService.getAllCompanies();
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Companies not found', 404))
})

module.exports.getCompany = catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const result = await CompanyService.getCompany(companyId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Company not found', 404))
})

module.exports.createCompany = catchAsync(async (req, res, next) => {
    const companyObject = req.body
    const result = await CompanyService.createCompany(companyObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Company not created', 400))
})

module.exports.deleteCompany = catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const loggedUser = req.user
    console.log('deleting company')
    const result = await CompanyService.deleteCompany(loggedUser,companyId);
    if (result) {
        if(result.picture) removeFile({ path: 'public/img/company/'.concat(result.picture) })
        res.status(200).json(result);
    }
    else {
        return next(new AppError('Company not deleted', 400))
    }


})

module.exports.updateCompany = catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const companyObject = toCompanyObject(req)
    console.log(companyObject)
    const result = await CompanyService.updateCompany(companyId, companyObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Company not updated', 400))
})