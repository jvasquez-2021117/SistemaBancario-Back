'use strict'

const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Service', servicesSchema)