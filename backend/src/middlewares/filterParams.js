const { toStringArray } = require("../utils/helpers")

module.exports = (req, res, next) => {

    let { skill, jobType, workLocation } = req.query
    try {
        if (skill) req.query.skill = toStringArray(skill)
        if (jobType) req.query.jobType = toStringArray(jobType)
        if (workLocation) req.query.workLocation = toStringArray(workLocation)

        next()
    } catch(error){
        console.log(error)
    }
}