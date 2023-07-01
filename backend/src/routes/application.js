const express = require('express')
const router = express.Router();
const { ApplicationController } = require('../controllers')

function init() {

    // get all applications (all)
    // router.get("/",ApplicationController.getAllJobs)

    // delete specific job (company)
    // router.delete("/:jobId",ApplicationController.deleteJob)

    // update specific Job (admin/company)
    // router.put("/:jobId",ApplicationController.updateJob)

    // get specific Job (all)
    // router.get("/:jobId",ApplicationController.getJob)

     // create new Job (Company)
    // router.post("/:jobId",ApplicationController.createJob)

}

module.exports = {
    router,
    init
}