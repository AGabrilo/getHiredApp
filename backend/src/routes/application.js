const express = require('express')
const router = express.Router();
const { ApplicationController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')
const multer = require('../middlewares/multer')

function init() {

    // get all applications for user (user)
    router.get("/user/:userId",
        Authorization,
        restrictTo(['user','company']),
        ApplicationController.getAllUserApplications)

    // get all applications for company (company)
    router.get("/:companyId",
        // Authorization,
        // restrictTo(['company']),
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
    multer.fields([ {name:'resume'}]),
        ApplicationController.createApplication)
}

module.exports = {
    router,
    init
}