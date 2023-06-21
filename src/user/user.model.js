'use strict'

const mongoose = require('mongoose')

const userSchemma = mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    DPI: {
        type: Number,
        maxLength: 13,
        minLength: 13
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
    },
    role: {
        type: String,
        uppercase: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchemma);
