'use strict'

const favoritesController = require('./favotite.controller');
const express = require('express');
const api = express.Router();

api.post('/add', favoritesController.add);
api.delete('/delete', favoritesController.delete);
api.get('/get', favoritesController.get);

module.exports = api;