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