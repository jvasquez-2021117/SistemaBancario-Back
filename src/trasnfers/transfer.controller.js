'use strict'

const Transfer = require('./transfers.model')


exports.test = (req, res)=>{
    return res.send({message: 'test fuction is running'});
}

exports.create = async(req, res)=>{
    try{
        const data = req.body;
        let transfers = new Transfer(data);
        await transfers.save();
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
        let update = await Transfer.findOneAndUpdate({_id: id}, data, {new: true});
        if(!update) return res.send({message: 'Transfer not found and not deleted'});
        return res.status(200).send({message: 'Transfer updated successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message:'Error updating'})
    }
}

exports.getDeposits = async(req, res)=>{
    try{
        let transfers = await Transfer.find();
        return res.status(200).send({transfers});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getDepositById = async(req, res)=>{
    try{
        let { id } = req.params;
        let transfer = await Transfer.findOne({_id: id});
        return res.status(200).send({transfer});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}