'use strict'

const mongoose = require('mongoose')

const shopProductSchemma = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('ShopProduct', shopProductSchemma)