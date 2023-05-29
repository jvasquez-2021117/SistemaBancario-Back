'use strict'

const mongoose = require('mongoose')

const userSchemma = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    noAccount: {
        type: Number
    },
    DPI: {
        type: Number
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    work: {
        type: String
    },
    salary: {
        type: Number
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchemma);
