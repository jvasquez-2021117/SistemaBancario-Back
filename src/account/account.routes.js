'use strict'

const accountController = require('./account.controller');
const express = require('express');
const api = express.Router();

api.get('/test', accountController.test);
api.post('/add', accountController.add);
api.put('/update/:id', accountController.update);
api.delete('/delete/:id', accountController.delete);
api.get('/get', accountController.getAccounts);
api.get('/getById/:id', accountController.getById);
api.get('/getMovementsHigh', accountController.movementsHight);
api.get('/getMovementsUnder', accountController.movementsUnder);
api.get('/getByUser/:id', accountController.getByUser);

module.exports = api;