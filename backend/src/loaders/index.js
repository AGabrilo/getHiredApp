const routesLoader = require('./api')
const mongooseLoader = require('./mongoose')

const init = async (expressApp) => {
    const mongoDBConnection = await mongooseLoader();
    await routesLoader(expressApp);
}

module.exports = {
    init
}