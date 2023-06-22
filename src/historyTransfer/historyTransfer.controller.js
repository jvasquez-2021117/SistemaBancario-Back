'use strict'

const HistoryTransfer = require('./historyTransfer.model');
const HistoryDeposit = require('../historyDeposit/historyDeposit.model');

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await HistoryTransfer.find({ user: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const history = await HistoryTransfer.findOne({ _id: id });
        return res.status(200).send({ history })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' })
    }
}

exports.getAll = async(req, res)=>{
    try{
        const { id } = req.params;
        const deposit = await HistoryDeposit.find({user: id});
        const transfer = await HistoryTransfer.find({user: id})
        const newArray = deposit.concat(transfer);
        return res.status(200).send({ newArray });
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}