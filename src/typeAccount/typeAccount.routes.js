'use strict'

const typeAccountController = require('./typeAccount.controller');
const express = require('express');
const api = express.Router();

api.get('/test', typeAccountController.test);
api.post('/add', typeAccountController.add);
api.put('/update/:id', typeAccountController.update);
api.delete('/delete/:id', typeAccountController.delete);
api.get('/get', typeAccountController.get);
api.get('/getById/:id', typeAccountController.getById);

module.exports = api;