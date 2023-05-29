'use strict'

const userController = require('./user.controller')
const express = require('express')
const api = express.Router()

api.get('/test', userController.test)

module.exports = api