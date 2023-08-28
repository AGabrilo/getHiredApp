const { NotificationService } = require("../services");
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getNotifications = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const result = await NotificationService.getNotifications(userId);
    if (result) {
        console.log('notificationss',result)
        res.status(200).json(result);
    }
    else return next(new AppError('Notifications not found', 400))
})

module.exports.createNotification = catchAsync(async (req, res, next) => {
    const { jobName, status, userId } = req.body;
    const result = await NotificationService.createNotification(jobName, status, userId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Notification not created', 400))
})

module.exports.deleteNotification = catchAsync(async (req, res, next) => {
    const { notificationId } = req.params;
    console.log('delete notification', notificationId)
    const result = await NotificationService.deleteNotification(notificationId);
    if (result) {
        res.status(200).json(result);
    }
    else return next(new AppError('Notification is not removed', 400))
})