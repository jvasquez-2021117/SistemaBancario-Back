'use strict'

const Shop = require('./shopProduct.model')
const Account = require('../account/account.model')
const Product = require('../product/product.model')
const HistoryProduct = require('../historyProducts/historyProducts.model')

exports.buyProduct = async (req, res) => {
    try {
        let data = req.body
        if ((parseInt(data.account) % 10) > 0) {
            let numberAccount = data.account
            data.account = (numberAccount + '' + '.0')
            console.log(data.account);
        }
        if (!data.quantity) data.quantity = 1
        let product = await Product.findOne({ _id: data.product });
        let account = await Account.findOne({ _id: data.account });
        let amount = product.price * data.quantity;
        if (account.balances < amount) return res.send({ message: 'No tienes suficiente dinero' })
        let shop = new Shop(data)
        await shop.save()
        await Account.findOneAndUpdate(
            { _id: data.account },
            { $inc: { balances: -(amount) } },
            { new: true }
        )
        let history = new HistoryProduct({ product: shop._id, user: account.user });
        await history.save();
        return res.status(200).send({ message: 'Shp' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error buying' })
    }
}