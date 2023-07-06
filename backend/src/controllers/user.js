const { UserService } = require('../services')

module.exports.getAllUsers = async (req, res, next) => {

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


module.exports.createUser = async (req, res, next) => {
    const userObject = req.body
    console.log(req.body)
    try{
        const result = await UserService.createUser(userObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    const {userId} = req.params;
    const userObject = req.body;
    try{
        const result = await UserService.updateUser(userId, userObject);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    const {userId} = req.params;
    try{
        const result = await UserService.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}