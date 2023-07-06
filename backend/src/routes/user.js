const express = require('express')
const router = express.Router();
const { UserController } = require('../controllers')

function init() {

    // get all users (all)
    router.get("/",UserController.getAllUsers)

    // delete specific user (admin)
    router.delete("/:userId",UserController.deleteUser)

    // update specific user (admin/user)
    router.put("/:userId",UserController.updateUser)

    // get specific user (all)
    router.get("/:userId",UserController.getUser)

     // create new user (admin/user)
    router.post("/",UserController.createUser)

}

module.exports = {
    router,
    init
}