'use strict'

const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    accountReq: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    accountSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
},
    {
        versionKey: false
    });

module.exports = mongoose.model('Transfer', transferSchema);