'use strict'

const servicesController = require('./services.controller');
const express = require('express')
const api = express.Router();

api.get('/test', servicesController.test);
api.post('/add', servicesController.add);
api.put('/update/:id', servicesController.update);
api.delete('/delete/:id', servicesController.delete);
api.get('/get', servicesController.get);
api.get('/getById/:id', servicesController.getById)

module.exports = api