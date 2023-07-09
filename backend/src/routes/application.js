const express = require('express')
const router = express.Router();
const { ApplicationController } = require('../controllers')

function init() {

    // get all applications (user)
    router.get("/:userId",ApplicationController.getAllUserApplications)

     // get all applications (company)
     router.get("/:companyId",ApplicationController.getAllCompanyApplications)

    // delete specific application (user)
    router.delete("/:applicationId",ApplicationController.deleteUserApplication)

    // update specific application (company)
    router.put("/:applicationId",ApplicationController.updateApplicationStatus)

    // get specific application (all)
    router.get("/:applicationId",ApplicationController.getApplication)

     // create new application (user)
    router.post("/",ApplicationController.createApplication)

}

module.exports = {
    router,
    init
}