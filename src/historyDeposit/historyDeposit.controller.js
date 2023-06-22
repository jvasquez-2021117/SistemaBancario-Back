'use strict'

const HistoryDeposit = require('./historyDeposit.model');

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await HistoryDeposit.find({ user: id }).populate('deposit').populate('user');
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}


exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const history = await HistoryDeposit.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}