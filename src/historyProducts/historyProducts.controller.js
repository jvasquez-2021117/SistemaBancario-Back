'use strict'

const HistoryProducts = require('./historyProducts.model');

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await HistoryProducts.find({ user: id }).populate({ path: 'product', populate: 'product' });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const history = await HistoryProducts.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}