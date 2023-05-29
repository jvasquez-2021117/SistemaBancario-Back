'use strict'

const User = require('./user.model')
const { checkPassword, encrypt, validateData } = require('../utils/validate')
const { createToken } = require('../services/jwt')

exports.test = (req, res) => {
    return res.send({ message: 'Test User running' })
}

exports.adminDefault = async (req, res) => {
    try {
        let admin = {
            name: 'ADMINB',
            username: 'ADMINB',
            noAccount: '123456789',
            DPI: '1489652398741',
            adress: 'ADMINB',
            phone: '12345678',
            email: 'ADMINB@gmail.com',
            password: 'ADMINB',
            work: 'ADMINB',
            salary: '0.00',
            role: 'ADMIN'
        }
        admin.password = await encrypt(admin.password);
        let existAdmin = await User.findOne({ username: admin.username });
        if (existAdmin) return
        let adminDefault = new User(admin)
        await adminDefault.save();
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error create admin default' })
    }
}