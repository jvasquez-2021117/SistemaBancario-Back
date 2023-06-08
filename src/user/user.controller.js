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

        let userExistsDPI = await User.findOne({ DPI: data.DPI });
        if (userExistsDPI) return res.send({ message: 'This DPI is already in use' });
        let userExistsEmail = await User.findOne({ email: data.email });
        if (userExistsEmail) return res.send({ message: 'This Email is already in use' });
        let userExistsUsername = await User.findOne({ username: data.username })
        if (userExistsUsername) return res.send({ message: 'This Email is already in use' })
        if(data.salary<100) return res.send({message: 'The minimun salary can not be less than 100'})

        let validate = validateData(data)
        if (validate) return res.status(400).send(validate)
        data.password = await encrypt(data.password)
        let user = new User(data);s 
        await user.save();
        return res.status(201).send({ message: 'User created successfully' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating user' })
    }
}

exports.update = async (req, res) => {
    try {
        let idUser = req.params.id;
        let data = req.body;

        let userExistsDPI = await User.findOne({ DPI: data.DPI });
        if (userExistsDPI) return res.send({ message: 'This DPI is already in use' });
        let userExistsEmail = await User.findOne({ email: data.email });
        if (userExistsEmail) return res.send({ message: 'This Email is already in use' });
        let userExistsUsername = await User.findOne({ username: data.username })
        if (userExistsUsername) return res.send({ message: 'This Email is already in use' })

        let updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true, upsert: true }
        )
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: 'Updated User', idUser })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating user' })
    }
}

exports.delete = async (req, res) => {
    try {
        let idUser = req.params.id;
        let userDeleted = await User.findOneAndDelete({ _id: idUser });
        if (!userDeleted) return res.send({ message: 'User not found and not deleted' });
        return res.send({ message: 'User deleting succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(404).send({ message: 'Error deleting user' })
    }
}

exports.get = async(req, res) => {
    try{
        let users = await User.find();
        return res.status(200).send({users});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getById =  async(req, res)=>{
    try{
        let { id } = req.params;
        let user = await User.findOne({_id: id});
        if(!user) return res.send({message: 'User not found'});
        return res.status(200).send({user});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}