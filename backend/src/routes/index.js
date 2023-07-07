const express = require('express')
const rootRouter = express.Router();

function init (){
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

    rootRouter.use("/user", userRouter.router)
    rootRouter.use("/company", companyRouter.router)
    rootRouter.use("/job", jobRouter.router)
    rootRouter.use("/application", applicationRouter.router)
    rootRouter.use("/configuration", configurationRouter.router)
    rootRouter.use("/favourite", favouriteRouter.router)
}

module.exports ={
    rootRouter,
    init
}