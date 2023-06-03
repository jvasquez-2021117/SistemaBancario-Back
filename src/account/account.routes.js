'use strict'

const accountController = require('./account.controller');
const express = require('express');
const api = express.Router();

api.get('/test', accountController.test);
api.post('/add', accountController.add);
api.put('/update/:id', accountController.update);
api.delete('/delete/:id', accountController.delete);
api.get('/get', accountController.getAccounts)
api.get('/getById/:id', accountController.getById)

module.exports = api;