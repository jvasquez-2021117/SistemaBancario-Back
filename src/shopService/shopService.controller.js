'use strict'

const Shop = require('./shopService.model')
const Account = require('../account/account.model')
const Service = require('../ProductServices/services.model')

exports.buyService = async (req, res) => {
    try {
        let data = req.body
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
        return res.status(200).send({ message: 'Shp' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error buying' })
    }
} 