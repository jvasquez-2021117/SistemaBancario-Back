'use strict'

const transferController = require('./transfer.controller');
const express = require('express');
const api  = express.Router();

api.get('/test', transferController.test);
api.post('/add', transferController.create);
api.put('/update/:id', transferController.update);
api.get('/get', transferController.getTransfers);
api.get('/getById', transferController.getTransferById);

module.exports = api;