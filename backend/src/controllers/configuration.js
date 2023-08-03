const { ConfigurationService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllPublic = catchAsync(async (req, res, next) => {
    const result = await ConfigurationService.getAllPublic();
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Configuration data not found', 404))
})

