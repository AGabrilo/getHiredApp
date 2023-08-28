const express = require('express')
const router = express.Router();
const { UserController, NotificationController } = require('../controllers')
const { Authorization, restrictTo } = require('../middlewares/auth')
const multer = require('../middlewares/multer')

function init() {

    // get all users (all)
    router.get("/",
        UserController.getAllUsers)

    router.get("/download/:id",
        Authorization,
        UserController.downloadResume)

    router.post("/notification",
        Authorization,
        NotificationController.createNotification)

        router.delete("/notification/:notificationId",
        Authorization,
        NotificationController.deleteNotification)

    router.get("/notifications/:userId",
        Authorization,
        NotificationController.getNotifications)

    // delete specific user (admin)
    router.delete("/:userId",
        Authorization,
        restrictTo(['admin', 'user'], 'userId'),
        UserController.deleteUser)

    // update specific user (admin/user)
    router.put("/:userId",
        Authorization,
        restrictTo(['admin', 'user']),
        multer.fields([{ name: 'picture' }, { name: 'resume' }]),
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