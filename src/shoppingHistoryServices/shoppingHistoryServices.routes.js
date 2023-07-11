'use strict'

const historyController = require('./shoppingHistoryServices.controller');
const express = require('express');
const api = express.Router();

api.get('/get/:id', historyController.get);
api.get('/getById/:id', historyController.getById);

module.exports = api;