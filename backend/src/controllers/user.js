const { UserService } = require('../services')

module.exports.getAllUsers = async (req, res, next) => {
    // res.send("Welcome to my API!!!")
    try{
        const result = await UserService.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.getUser = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const result = await UserService.getUser(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}