const express = require('express')
const rootRouter = express.Router();
const AppError = require('../utils/appError')
const globalErrorHandler = require('../utils/globalErrorHandler')

function init() {
    const userRouter = require('./user');
    userRouter.init();

    const companyRouter = require('./company');
    companyRouter.init();

    const jobRouter = require('./job');
    jobRouter.init();

    const applicationRouter = require('./application');
    applicationRouter.init();

    const configurationRouter = require('./configuration');
    configurationRouter.init();

    const favouriteRouter = require('./favourite');
    favouriteRouter.init();

    const authRouter = require('./auth')
    authRouter.init()

    rootRouter.use("/user", userRouter.router)
    rootRouter.use("/company", companyRouter.router)
    rootRouter.use("/job", jobRouter.router)
    rootRouter.use("/application", applicationRouter.router)
    rootRouter.use("/configuration", configurationRouter.router)
    rootRouter.use("/favourite", favouriteRouter.router)
    rootRouter.use('/auth', authRouter.router)

    rootRouter.all('*', (req, res, next) => {
        next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404))
    })
    rootRouter.use(globalErrorHandler)
}

module.exports = {
    rootRouter,
    init
}