const express = require('express')
const router = express.Router();
const { FavouriteController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')

function init() {
    // delete favourite job 
    router.delete("/:favouriteId",
        Authorization,
        restrictTo(['user']),
        FavouriteController.deleteFavouriteJob)

    // get favourite jobs of user 
    router.get("/:userId",
        Authorization,
        restrictTo(['user'], 'userId'),
        FavouriteController.getFavourites)

    // create new favourite job 
    router.post("/",
        Authorization,
        restrictTo(['user']),
        FavouriteController.createFavouriteJob)
}

module.exports = {
    router,
    init
}