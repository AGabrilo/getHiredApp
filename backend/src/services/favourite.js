const { FavouriteModel } = require("../models")

module.exports.getFavourites = async (userId) => {
    console.log('Get company: ', userId)
    const filter = {
        userId: userId
    }
    return await FavouriteModel.find(filter);
}

module.exports.deleteFavouriteJob = async (favouriteId) => {
    const filter = {
        _id: favouriteId
    }
    return await FavouriteModel.findOneAndDelete(filter);
}

module.exports.createFavouriteJob = async ( favouriteObject) => {
    return await FavouriteModel.create({...favouriteObject});
}