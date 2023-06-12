'use strict'

const historyController = require('./historyProducts.controller');
const express = require('express');
const api = express.Router();

api.get('/get', historyController.get);
api.get('/getById', historyController.getById);

module.exports = api;