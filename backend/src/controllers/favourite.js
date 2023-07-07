const { FavouriteService } = require('../services')

module.exports.getFavourites = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const result = await FavouriteService.getFavourites(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.createFavouriteJob = async (req, res, next) => {
    const favouriteObject = req.body
    console.log(req.body)
    try{
        const result = await FavouriteService.createFavouriteJob(favouriteObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteFavouriteJob = async (req, res, next) => {
    const {favouriteId} = req.params;
    try{
        const result = await FavouriteService.deleteFavouriteJob(favouriteId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}
