'use strict'

const productController = require('./product.controller');
const express = require('express')
const api = express.Router();

api.get('/test', productController.test);
api.post('/add', productController.add);
api.put('/update/:id', productController.update);
api.delete('/delete/:id', productController.delete);
api.get('/get', productController.get);
api.get('/gerById/:id', productController.getById);

module.exports = api