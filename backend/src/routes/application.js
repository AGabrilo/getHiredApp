const express = require('express')
const router = express.Router();
const { ApplicationController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')

function init() {

    // get all applications for user (user)
    router.get("/:userId",
        Authorization,
        restrictTo(['user'], 'userId'),
        ApplicationController.getAllUserApplications)

    // get all applications for company (company)
    router.get("/:companyId",
        Authorization,
        restrictTo(['company'], 'companyId'),
        ApplicationController.getAllCompanyApplications)

    // delete specific application (user)
    router.delete("/:applicationId",
        Authorization,
        restrictTo(['user']),
        ApplicationController.deleteUserApplication)

    // update specific application (company)
    router.put("/:applicationId",
        Authorization,
        restrictTo(['user', 'company']),
        ApplicationController.updateApplicationStatus)

    // get specific application (all)
    router.get("/:applicationId",
        Authorization,
        restrictTo(['user', 'company']),
        ApplicationController.getApplication)

    // create new application (user)
    router.post("/",
        Authorization,
        restrictTo(['user']),
        ApplicationController.createApplication)
}

module.exports = {
    router,
    init
}