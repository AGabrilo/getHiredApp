const express = require('express')
const router = express.Router();
const { JobController } = require('../controllers')

function init() {

    // get all jobs (all)
    // router.get("/",JobController.getAllJobs)

    // delete specific job (company)
    // router.delete("/:jobId",JobController.deleteJob)

    // update specific Job (admin/company)
    // router.put("/:jobId",JobController.updateJob)

    // get specific Job (all)
    // router.get("/:jobId",JobController.getJob)

     // create new Job (Company)
    // router.post("/:jobId",JobController.createJob)

}

module.exports = {
    router,
    init
}