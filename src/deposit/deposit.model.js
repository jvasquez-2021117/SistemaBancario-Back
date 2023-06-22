'use strict'

const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({
    accountReq: {
        type: Number,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String
    },
    hour: {
        type: String
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Deposit', depositSchema);