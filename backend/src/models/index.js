const applicationStatus = require('./enums/applicationStatus');
const jobType = require('./enums/jobType');
const skill = require('./enums/skill');
const workLocation = require('./enums/workLocation');
const ApplicationModel = require('./application');
const CompanyModel = require('./company');
const { EducationModel } = require('./education')
const { ExperienceModel } = require('./experience')
const JobModel = require('./job')
const UserModel = require('./user')
const FavouriteModel = require('./favourite')

module.exports = {
    applicationStatus,
    jobType,
    skill,
    workLocation,
    ApplicationModel,
    CompanyModel,
    EducationModel,
    ExperienceModel,
    JobModel,
    UserModel,
    FavouriteModel
}