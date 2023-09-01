const mongoose = require('mongoose')

module.exports.toCompanyObject = (req) => {
  return {
    ...req.body._id && { _id: mongoose.Types.ObjectId(req.body._id) },
    ...req.body.name && { name: req.body.name },
    ...req.body.employersNum && { employersNum: req.body.employersNum },
    ...req.body.description && { description: req.body.description },
    ...req.file && { picture: '/img/company/' + req.file.filename },
    ...req.body.picture && { picture: req.body.picture },
    ...req.body.location && { location: req.body.location },
  }
}
module.exports.toUserObject = (req) => {
  return {
    email: req.body.email,
    password: req.body.password,
    repeatedPassword: req.body.repeatedPassword,
    ...req.body.firstName && { firstName: req.body.firstName },
    ...req.body.lastName && { lastName: req.body.lastName },
    ...req.body.name && { name: req.body.name },
    ...req.files && req.files.resume && { resume: '/img/user/' + req.files.resume[0].filename },
    ...req.files && req.files.picture && { picture: '/img/user/' + req.files.picture[0].filename },
    ...req.body.summary && { summary: req.body.summary },
    ...req.body.location && { location: req.body.location },
    ...req.body.skills && { skills: req.body.skills },
    ...req.body.education && { education: req.body.education },
    ...req.body.workExperience && { workExperience: req.body.workExperience },
  }
}

module.exports.toApplicationObject = (req) => {
  console.log('reqqq', req.files)
  return {
    jobId: req.body.jobId,
    userId: req.body.userId[1],
    ...req.files && req.files.resume && { resume: '/img/user/' + req.files.resume[0].filename }
  }
}
