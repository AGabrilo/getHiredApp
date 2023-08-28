const { NotificationModel } = require("../models");

module.exports.getNotifications = async (userId) => {
    console.log('Get notifications: ', userId)
    const filter = {
        userId: userId
    }
    return await NotificationModel.find(filter);
}

module.exports.createNotification = async (jobName, status, userId) => {
    console.log('userId', userId)
    let notificationObject = {
        userId: userId,
        message: `${jobName} status is now changed to ${status}!`
    }
    console.log(notificationObject)
    return await NotificationModel.create({ ...notificationObject });
}

module.exports.deleteNotification = async (notificationId) => {
    const filter = {
        _id: notificationId
    }
    return await NotificationModel.findOneAndDelete(filter);
}