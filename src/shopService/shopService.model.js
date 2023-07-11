'use strict'

const mongoose = require('mongoose')

const shopServiceSchemma = mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    account: {
        type: Number,
        ref: 'Account'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('ShopService', shopServiceSchemma)