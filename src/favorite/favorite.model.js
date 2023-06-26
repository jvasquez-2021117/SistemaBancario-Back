'use strict'

const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accountFav: {
        type: Number,
        ref: 'Account'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Favorite', favoriteSchema);