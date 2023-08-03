require('dotenv').config()
const express = require('express')
const loaders = require('./loaders')
const cors = require('cors');

async function startServer() {
    const app = express()
    app.use(express.json());
    app.use(cors())
    
    const port = process.env.PORT || 3001;
    // run loaders
    await loaders.init(app)

    app.listen(port, () => {
        console.log("Running on port " + port);
    })

    process.on('unhandledRejection', err => {
        console.log(err.name, err.message)
        console.log('Undandled rejection! Shutting down... ')
        server.close(() => {
          process.exit(1)
        })
      })
}

startServer()

