const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'user',
        require: true
    },

    jobId: {
        type: Schema.ObjectId,
        ref: 'job',
        require: true
    }
});

const FavouriteModel = mongoose.model('favourite',FavouriteSchema)
module.exports = FavouriteModel;