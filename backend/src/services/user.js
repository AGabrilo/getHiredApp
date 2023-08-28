const { UserModel } = require("../models")

module.exports.getAllUsers = async () => {
    return await UserModel.find();
}

module.exports.getUser = async (userId) => {
    const filter = {
        _id: userId
    }
    return await UserModel.findOne(filter);
}

module.exports.createUser = async (userObject) => {

    return await UserModel.create({ ...userObject })

}

module.exports.updateUser = async (userId, userObject) => {
    console.log("updateUser", {...userObject})
    const filter = {
        _id: userId
    }
    return await UserModel.findOneAndUpdate(filter, {...userObject}, { new: true });
}

module.exports.deleteUser = async (userId, loggedUser) => {
    console.log('loggedUser',loggedUser)
    const filter = {
        _id: userId
    }
    if(loggedUser.role === 'admin' || loggedUser._id === userId) return await UserModel.findOneAndDelete(filter);
    return null
}