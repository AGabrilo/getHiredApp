const { FavouriteService } = require('../services')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getFavourites = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await FavouriteService.getFavourites(userId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Favourites not found', 404))
})

module.exports.createFavouriteJob = catchAsync(async (req, res, next) => {
    const favouriteObject = req.body
    const result = await FavouriteService.createFavouriteJob(favouriteObject);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job is not added to favourite', 400))
})

module.exports.deleteFavouriteJob = catchAsync(async (req, res, next) => {
    const { favouriteId } = req.params;
    const result = await FavouriteService.deleteFavouriteJob(favouriteId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Job is not removed from favourites', 400))
})
