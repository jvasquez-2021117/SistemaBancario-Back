'use strict'

const mongoose = require('mongoose');

const productSchemma = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Product', productSchemma);