'use strict'

const shopServiceController = require('./shopService.controller')
const express = require('express')
const api = express.Router()

api.post('/buyService', shopServiceController.buyService);

module.exports = api
