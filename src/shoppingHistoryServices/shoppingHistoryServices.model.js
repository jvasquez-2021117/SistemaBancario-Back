'use strict'

const mongoose = require('mongoose');

const shoppingHistoryServicesModel = mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopService'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('HistoryServices', shoppingHistoryServicesModel);