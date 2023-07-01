const express = require('express')
const loaders = require('./loaders')

async function startServer() {
    const app = express()
    app.use(express.json());
    const port = process.env.PORT || 3001;
    // run loaders
    await loaders.init(app)

    app.listen(port, () => {
        console.log("Running on port " + port);
    })
}

startServer()

