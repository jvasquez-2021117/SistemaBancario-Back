'use strict'

const Transfer = require('./transfers.model');
const Account = require('../account/account.model');
const historyTransfer = require('../historyTransfer/historyTransfer.model');


exports.test = (req, res) => {
    return res.send({ message: 'test fuction is running' });
}

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const accountReq = await Account.findOne({ $and: [{ _id: data.accountReq }, { dpi: data.dpi }] });
        if (!accountReq) return res.send({ message: 'Account not found' })
        const accountSender = await Account.findOne({ _id: data.accountSender });
        if (data.amount > 2000) return res.send({ message: 'Transfers can only be less than 2000' });
        if (accountSender.balances < data.amount) return res.send({ message: 'dont have enough money' });
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let fechaManana = new Date(fechaActual);
        fechaManana.setDate(fechaManana.getDate() + 1);
        console.log(fechaManana);
        const total = await Transfer.find({ $and: [{ accountSender: data.accountSender }, { date: { $gte: fechaActual, $lt: fechaManana } }] });
        const totalAmount = total.reduce((acumulador, elemento) => acumulador + elemento.amount, 0);
        if (parseInt(totalAmount) + parseInt(data.amount) > 10000) return res.send({ message: 'No puede transferir mas de 10000 en un dia' })
        let transfers = new Transfer(data);
        let transferSave = await transfers.save();
        let req = await Account.findOneAndUpdate({ _id: data.accountReq }, { $inc: { balances: data.amount, movements: 1 } }, { new: true });
        let sender = await Account.findOneAndUpdate({ _id: data.accountSender }, { $inc: { balances: -data.amount, movements: 1 } }, { new: true });
        let history = new historyTransfer({ transfer: transferSave._id, user: sender.user });
        let history2 = new historyTransfer({ transfer: transferSave._id, user: req.user })
        await history.save();
        await history2.save();
        return res.status(200).send({ message: 'Transfer made successfully' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error creating' })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        let data = req.body;
        let transfer = await Transfer.findOne({ _id: id });
        let newAmount = data.amount - transfer.amount;
        if (!transfer) return res.send({ message: 'Transfer not found and not deleted' });
        let account = await Account.findOne({ _id: transfer.accountSender });
        if (account.balances < newAmount) return res.send({ message: 'dont have enough money' })
        await Transfer.findOneAndUpdate({ _id: id }, data, { new: true });
        await Account.findOneAndUpdate({ _id: transfer.accountReq }, { $inc: { balances: newAmount } }, { new: true });
        await Account.findOneAndUpdate({ _id: transfer.accountSender }, { $inc: { balances: -newAmount } }, { new: true });

        return res.status(200).send({ message: 'Transfer updated successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating' })
    }
}

exports.getTransfers = async (req, res) => {
    try {
        let transfers = await Transfer.find().populate('accountReq').populate('accountSender');
        return res.status(200).send({ transfers });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getTransferById = async (req, res) => {
    try {
        let { id } = req.params;
        let transfer = await Transfer.findOne({ _id: id }).populate('accountReq').populate('accountSender');
        return res.status(200).send({ transfer });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}