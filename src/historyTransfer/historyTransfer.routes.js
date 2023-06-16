'use strict'

const historyController = require('./historyTransfer.controller');
const express = require('express');
const api = express.Router();

api.get('/get', historyController.get);
api.get('/getById', historyController.getById);

module.exports = api;