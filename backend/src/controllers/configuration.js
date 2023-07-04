const { ConfigurationService } = require('../services')

module.exports.getAllPublic = async (req, res, next) => {
    console.log('in controleeeeer')
    try{
        const result = await ConfigurationService.getAllPublic();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

