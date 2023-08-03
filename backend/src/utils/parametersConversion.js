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
module.exports.toUserObject = (req) => {
    return {
      email: req.body.email,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
      ...req.body.firstName && { firstName: req.body.firstName },
      ...req.body.lastName && { lastName: req.body.lastName },
      ...req.body.name && { name: req.body.name }
    }
  }