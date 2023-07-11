'use strict'

const mongoose = require('mongoose');

const historyProductsModel = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopProduct'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('HistoryProducts', historyProductsModel);