'use strict'

const Deposit = require('./deposit.model')
const Account = require('../account/account.model');

exports.test = (req, res)=>{
    return res.send({message: 'test fuction is running'});
}

exports.create = async(req, res)=>{
    try{
        const data = req.body;
        let deposit = new Deposit(data);
        await deposit.save();
        await Account.findOneAndUpdate({_id: data.id}, {$inc: {balances: data.amount}}, {new: true})
        return res.status(200).send({message: 'Deposit made successfully'})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error creating'})
    }
}

exports.update = async(req, res)=>{
    try{
        const { id } = req.params;
        let data = req.body;
        let deposit = await Deposit.findOne({_id: id})
        if(!deposit) return res.send({message: 'Deposit not found and not deleted'});
        await Deposit.findOneAndUpdate({_id: id}, data, {new: true});
        await Account.findOneAndUpdate({_id: deposit.accountReq}, {$inc: {balances: (data.amount-deposit.amount)}}, {new:  true});
        return res.status(200).send({message: 'Deposit updated successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message:'Error updating'})
    }
}

exports.getDeposits = async(req, res)=>{
    try{
        let deposits = await Deposit.find();
        return res.status(200).send({deposits});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getDepositById = async(req, res)=>{
    try{
        let { id } = req.params;
        let deposit = await Deposit.findOne({_id: id});
        return res.status(200).send({deposit});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}