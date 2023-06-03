'use strict'

const depositController = require('./deposit.controller')
const express = require('express');
const api = express.Router();

api.get('/test', depositController.test);
api.post('/add', depositController.create);
api.put('/update/:id', depositController.update);
api.get('/get', depositController.getDeposits);
api.get('/getById', depositController.getDepositById);

module.exports = api;