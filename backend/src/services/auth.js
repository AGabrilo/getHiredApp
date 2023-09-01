const { UserModel, CompanyModel } = require('../models')
const { listeners } = require('../models/application')

module.exports.createUser = async (userObject, type) => {
    console.log('In servicee', userObject, type)
    if (type === 'user') return await UserModel.create({ ...userObject })
    else if (type === 'company') return await CompanyModel.create({ ...userObject })
    else return null

}

module.exports.loginUser = async (email, type) => {
    console.log('type', type)
    if (type === 'user') return await UserModel.findOne({ email }).select('+password')
    else if (type === 'company') return await CompanyModel.findOne({ email }).select('+password')
    else return null
}

module.exports.getUserById = async (userId) => {
    let user = await UserModel.findById(userId)
    if (!user) user = await CompanyModel.findById(userId)
    return user
}

module.exports.getUserByEmail = async (email) => {
    let user = await UserModel.findOne({ email })
    if (!user) user = await CompanyModel.findOne({ email })
    return user
}

module.exports.getUserByToken = async (token) => {
    let user = await UserModel.findOne({ passwordResetToken: token })
    if (!user) user = await CompanyModel.findOne({ passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } })
    return user
}
