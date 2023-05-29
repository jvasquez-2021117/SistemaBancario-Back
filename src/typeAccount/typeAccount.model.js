'use strict'

const mongoose = require('mongoose')

const typeAccountSchema = mongoose.Schema({
    name: {
        type: String
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('TypeAccount', typeAccountSchema);
