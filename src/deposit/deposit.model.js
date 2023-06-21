'use strict'

const mongoose = require('mongoose');

const depositSchema = mongoose.Schema({
    accountReq: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true 
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('Deposit', depositSchema);