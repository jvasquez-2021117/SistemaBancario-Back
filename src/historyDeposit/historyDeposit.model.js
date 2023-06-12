'use strict'

const mongoose = require('mongoose');

const historyDepositModel = mongoose.Schema({
    deposit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deposit'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('HistoryDeposit', historyDepositModel);