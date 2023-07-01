const express = require('express')
const router = express.Router();
const { CompanyController } = require('../controllers')

function init() {

    // get all companies (all)
    router.get("/",CompanyController.getAllCompanies)

    // delete specific company (admin)
    router.delete("/:companyId",CompanyController.deleteCompany)

    // update specific company (admin/company)
    router.put("/:companyId",CompanyController.updateCompany)

    // get specific Company (all)
    router.get("/:companyId",CompanyController.getCompany)

     // create new Company (admin/Company)
    router.post("/",CompanyController.createCompany)

}

module.exports = {
    router,
    init
}