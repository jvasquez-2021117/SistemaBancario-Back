'use strict'

const mongoose = require('mongoose');

const favoriteSchema = mongoose.Schema({
    owner: {
        type: Number,
    },
    accountFav: {
        type: Number,
        ref: 'Account'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Favorite', favoriteSchema);