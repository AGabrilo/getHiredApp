const {jobType, skill, workLocation,applicationStatus} = require('../models')

module.exports.getAllPublic = async ()=>{
    return {
        jobType: Object.entries(jobType).map(([key, value])=>({key: value, value: key})),
        skill: Object.entries(skill).map(([key, value])=>({key: value, value: key})),
        workLocation: Object.entries(workLocation).map(([key, value])=>({key: value, value: key})),
        applicationStatus: Object.entries(applicationStatus).map(([key, value])=>({key: value, value: key})),
    }
}
