'use strict'

const shopProductController = require('./shopProduct.controller')
const express = require('express')
const api = express.Router()

api.post('/buyProduct', shopProductController.buyProduct);

module.exports = api
