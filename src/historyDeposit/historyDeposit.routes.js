'use strict'

const historyController = require('./historyDeposit.controller');
const express = require('express');
const api = express.Router();

api.get('/get/:id', historyController.get);
api.get('/getById', historyController.getById);

module.exports = api;