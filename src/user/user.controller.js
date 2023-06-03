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

exports.login = async (req, res) => {
    try {
        let data = req.body
        if (data.email == '' || data.password == '') return res.send({ message: 'Check that all fields are complete' });
        let msg = validateData(data.email, data.password);
        if (msg) return res.status(400).send({ message: msg });
        let user = await User.findOne({ email: data.email });
        if (user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            let userLogged = {
                id: user._id,
                user: user.name,
                surname: user.surname,
                role: user.role
            }
            return res.send({ message: 'User logged succesfully', token, userLogged })
        }
        return res.status(404).send({ message: 'Invalid Credentials' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Invalid credentials' })
    }
}

exports.save = async (req, res) => {
    try {
        let data = req.body;
        let userExists = await User.findOne({ DPI: data.DPI });
        if (userExists) return res.send({ message: 'This User already exists' });
        let validate = validateData(data)
        if (validate) return res.status(400).send(validate)
        data.password = await encrypt(data.password)
        let user = new User(data);
        await user.save();
        return res.status(201).send({ message: 'User created successfully' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating account' })
    }
}