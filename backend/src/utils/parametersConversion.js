const mongoose = require('mongoose')

module.exports.toCompanyObject = (req) => {
    return {
        ...req.body._id && { _id: mongoose.Types.ObjectId(req.body._id) },
        name: req.body.name,
        ...req.body.employersNum && { employersNum: req.body.employersNum},
        ...req.body.description && { description: req.body.description},
        ...req.body.picture && { picture: req.body.picture},
        ...req.body.location && { location: req.body.location},
    }
}