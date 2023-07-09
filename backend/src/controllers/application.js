const { ApplicationService } = require('../services')

module.exports.getAllUserApplications = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const result = await ApplicationService.getAllUserApplications(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getAllCompanyApplications = async (req, res, next) => {
    const {companyId} = req.params;
    try{
        const result = await ApplicationService.getAllCompanyApplications(companyId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getApplication = async (req, res, next) => {
    const {applicationId} = req.params;

    try{
        const result = await ApplicationService.getApplication(applicationId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.createApplication = async (req, res, next) => {
    const applicationObject = req.body
    console.log(req.body)
    try{
        const result = await ApplicationService.createApplication(applicationObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUserApplication = async (req, res, next) => {
    const {applicationId} = req.params;
    try{
        const result = await ApplicationService.deleteUserApplication(applicationId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.updateApplicationStatus = async (req, res, next) => {
    const {applicationId} = req.params;
    const status = req.body;
    console.log('req.body', req.body )
    try{
        const result = await ApplicationService.updateApplicationStatus(applicationId, status);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}