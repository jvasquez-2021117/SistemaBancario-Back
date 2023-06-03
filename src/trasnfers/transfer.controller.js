'use strict'

const Transfer = require('./transfers.model');
const Account = require('../account/account.model');


exports.test = (req, res)=>{
    return res.send({message: 'test fuction is running'});
}

exports.create = async(req, res)=>{
    try{
        const data = req.body;
        let transfers = new Transfer(data);
        await transfers.save();
        await Account.findOneAndUpdate({_id: data.accountReq}, {$inc: {balances: data.amount}}, {new:  true});
        await Account.findOneAndUpdate({_id: data.accountSender}, {$inc: {balances: -data.amount}}, {new: true});
        return res.status(200).send({message: 'Transfer made successfully'})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error creating'})
    }
}

exports.update = async(req, res)=>{
    try{
        const { id } = req.params;
        let data = req.body;
        let transfer = await Transfer.findOne({_id: id});
        let newAmount =  data.amount-transfer.amount;
        if(!transfer) return res.send({message: 'Transfer not found and not deleted'});
        await Transfer.findOneAndUpdate({_id: id}, data, {new: true});
        await Account.findOneAndUpdate({_id: transfer.accountReq}, {$inc: {balances: newAmount}}, {new: true});
        await Account.findOneAndUpdate({_id: transfer.accountSender}, {$inc: {balances: -newAmount}}, {new: true});

        return res.status(200).send({message: 'Transfer updated successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message:'Error updating'})
    }
}

exports.getTransfers = async(req, res)=>{
    try{
        let transfers = await Transfer.find().populate('accountReq').populate('accountSender');
        return res.status(200).send({transfers});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getTransferById = async(req, res)=>{
    try{
        let { id } = req.params;
        let transfer = await Transfer.findOne({_id: id}).populate('accountReq').populate('accountSender');
        return res.status(200).send({transfer});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}