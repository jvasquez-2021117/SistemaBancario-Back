'use strict'

const Services = require('./services.model')


exports.test = (req, res) => {
    return res.send({message: 'Test Services running'})
}