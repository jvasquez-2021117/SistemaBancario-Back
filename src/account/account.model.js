'use strict'

const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    balances: {
        type: Number,
        required: true,
        default: 0
    },
    typeAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeAccount',
        required: true
    },
    state: {
        type: String,
        required: true,
        default: 'Activa'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{
    versionKey: false
})

module.exports = mongoose.model('Account', accountSchema);