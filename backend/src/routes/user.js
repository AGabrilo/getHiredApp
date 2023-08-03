const express = require('express')
const router = express.Router();
const { UserController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')

function init() {

    // get all users (all)
    router.get("/",
        Authorization,
        restrictTo(['user', 'admin', 'company']),
        UserController.getAllUsers)

    // delete specific user (admin)
    router.delete("/:userId",
        Authorization,
        restrictTo(['admin', 'user'], 'userId'),
        UserController.deleteUser)

    // update specific user (admin/user)
    router.put("/:userId",
        Authorization,
        restrictTo(['admin', 'user'], 'userId'),
        UserController.updateUser)

    // get specific user (all)
    router.get("/:userId",
        Authorization,
        restrictTo(['user', 'admin', 'company']),
        UserController.getUser)

    // create new user (admin/user)
    router.post("/", UserController.createUser)

}

module.exports = {
    router,
    init
}