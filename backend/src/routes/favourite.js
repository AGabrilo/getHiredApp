const express = require('express')
const router = express.Router();
const { FavouriteController } = require('../controllers')

function init() {


    // delete favourite job 
    router.delete("/:favouriteId",FavouriteController.deleteFavouriteJob)

    // get favourite jobs of user 
    router.get("/:userId",FavouriteController.getFavourites)

     // create new favourite job 
    router.post("/",FavouriteController.createFavouriteJob)

}

module.exports = {
    router,
    init
}