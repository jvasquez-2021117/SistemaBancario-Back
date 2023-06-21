'use strict'

const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    accountReq: {
        type: Number,
        ref: 'Account',
        required: true
    },
    accountSender: {
        type: Number,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
    },
    hour: {
        type: String
    },
    description: {
        type: String
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Transfer', transferSchema);