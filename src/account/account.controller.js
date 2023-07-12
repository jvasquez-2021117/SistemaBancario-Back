'use strict'

const Account = require('./account.model')
const User = require('../user/user.model')
const TypeAccount = require('../typeAccount/typeAccount.model')

exports.test = (req, res) => {
    return res.send({ message: 'test fuction is running' })
}

exports.accountDefault = async (req, res) => {
    try {
        let existsTypeAccount = await TypeAccount.findOne({ name: 'DEFAULT' });
        let userDefault = await User.findOne({ name: 'Default' });
        let defAccount = {
            _id: 1234567891.0,
            balances: 0,
            typeAccount: existsTypeAccount._id,
            user: userDefault._id,
            dpi: userDefault.DPI
        }
        let existsAccount = await Account.findOne({ _id: defAccount._id });
        if (existsAccount) return
        let accountDefault = new Account(defAccount);
        await accountDefault.save();
        return
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'error creating' });
    }
}

exports.add = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ _id: data.user })
        let existsAccount = await Account.findOne({ $and: [{ user: data.user }, { typeAccount: data.typeAccount }] })
        if (existsAccount) return res.send({ message: 'Already exists account' })
        if (!user) return res.send({ message: 'User not found' });
        data.dpi = user.DPI;
        data._id = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
        const newAccount = new Account(data);
        await newAccount.save();
        return res.status(200).send({ message: 'Account created successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding' })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updateAccount = await Account.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!updateAccount) return res.send({ message: 'Account not found and not deleted' });
        return res.status(200).send({ message: 'Account updated succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating' })
    }
}

exports.getAccounts = async (req, res) => {
    try {
        let accounts = await Account.find().populate('typeAccount').populate('user');
        return res.status(200).send({ accounts });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getByUser = async (req, res) => {
    try {
        let { id } = req.params;
        let accounts = await Account.find({ user: id }).populate('typeAccount').populate('user');
        return res.status(200).send({ accounts })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        let account = await Account.findOne({ _id: id }).populate('typeAccount').populate('user');
        return res.status(200).send({ account });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAccount = await Account.findOneAndDelete({ _id: id });
        if (!deleteAccount) return res.send({ message: 'Account not found and not deleted' });
        return res.status(200).send({ message: `Account with DPI ${deleteAccount.user} deleted successfully` });
    } catch (e) {
        console.error(e);
    }
}

exports.movementsHight = async (req, res) => {
    try {
        const accounts = await Account.find().sort({ movements: -1 });
        return res.status(200).send({ accounts })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' });
    }
}

exports.movementsUnder = async (req, res) => {
    try {
        const accounts = await Account.find().sort({ movements: 1 });
        return res.status(200).send({ accounts })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' });
    }
}