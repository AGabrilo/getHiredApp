const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    message: {
        type: String
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'user'
    }

});

const NotificationModel = mongoose.model('notification', NotificationSchema)
module.exports = NotificationModel;