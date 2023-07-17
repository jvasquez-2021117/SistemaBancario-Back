'use strict'

const Shop = require('./shopService.model')
const Account = require('../account/account.model')
const Service = require('../ProductServices/services.model')
const HistoryService = require('../shoppingHistoryServices/shoppingHistoryServices.model');

exports.buyService = async (req, res) => {
    try {
        let data = req.body
        if((parseInt(data.account) % 10) > 0) {
            let numberAccount = data.account
            data.account = (numberAccount + '' + '.0')
            console.log(data.account);
        }
        let services = await Service.findOne({ _id: data.service });
        let account = await Account.findOne({ _id: data.account });
        let amount = services.price
        if (account.balances < amount) return res.send({ message: 'No tienes suficiente dinero' })
        let shop = new Shop(data)
        await shop.save()
        await Account.findOneAndUpdate(
            { _id: data.account },
            { $inc: { balances: -(amount) } },
            { new: true }
        )
        let history = new HistoryService({ service: shop._id, user: account.user });
        await history.save();
        return res.status(200).send({ message: 'bought' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error buying' })
    }
} 