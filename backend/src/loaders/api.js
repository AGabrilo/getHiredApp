const path = require('path')
const route = require('../routes')

module.exports = async (app) => {
    //load API routes
    route.init();
    app.use('/api',route.rootRouter);

    return app;
}