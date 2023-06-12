'use strict'

const mongoose = require('mongoose');

const historyTransferModel = mongoose.Schema({
    transfer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfer'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('HistoryTransfer', historyTransferModel);