const express = require('express')
const router = express.Router();
const { CompanyController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')

function init() {

    // get all companies (all)
    router.get("/",
        Authorization,
        restrictTo(['user', 'company']),
        CompanyController.getAllCompanies)

    // delete specific company (admin)
    router.delete("/:companyId",
        Authorization,
        restrictTo(['admin', 'company'], 'companyId'),
        CompanyController.deleteCompany)

    // update specific company (admin/company)
    router.put("/:companyId",
        Authorization,
        restrictTo(['admin', 'company'], 'companyId'),
        CompanyController.updateCompany)

    // get specific Company (all)
    router.get("/:companyId",
        Authorization,
        restrictTo(['user', 'company', 'admin']),
        CompanyController.getCompany)

    // create new Company (admin/Company)
    router.post("/",
        Authorization,
        restrictTo(['company']),
        CompanyController.createCompany)

}

module.exports = {
    router,
    init
}