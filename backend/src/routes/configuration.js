const express = require('express')
const router = express.Router();
const { ConfigurationController } = require('../controllers')

function init() {

    // get all configuration data
    router.get("/",ConfigurationController.getAllPublic)

}

module.exports = {
    router,
    init
}