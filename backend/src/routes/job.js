const express = require('express')
const router = express.Router();
const { JobController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth');
const { filterParams } = require('../middlewares');

function init() {

    // get all jobs (all)
    router.get("/",
        Authorization,
        restrictTo(['user', 'company', 'admin']),
        filterParams,
        JobController.getAllJobs)

        router.get("/expired/:id",
        Authorization,
        restrictTo(['user', 'company', 'admin']),
        filterParams,
        JobController.getAllExpiredJobsOfCompany)

    // delete specific job (company)
    router.delete("/:jobId",
        Authorization,
        restrictTo(['company']),
        JobController.deleteJob)

    // update specific Job (admin/company)
    router.put("/:jobId",
        Authorization,
        restrictTo(['company']),
        JobController.updateJob)

    // get specific Job (all)
    router.get("/:jobId",
        Authorization,
        restrictTo(['user', 'company', 'admin']),
        JobController.getJob)

    // create new Job (Company)
    router.post("/",
        Authorization,
        restrictTo(['company']),
        JobController.createJob)

}

module.exports = {
    router,
    init
}