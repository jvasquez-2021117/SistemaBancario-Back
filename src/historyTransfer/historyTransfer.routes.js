'use strict'

const historyController = require('./historyTransfer.controller');
const express = require('express');
const api = express.Router();

api.get('/get/:id', historyController.get);
api.get('/getById', historyController.getById);
api.get('/getAll/:id', historyController.getAll);

module.exports = api;