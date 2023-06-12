'use strict'

const ShoppingHistoryServices = require('./shoppingHistoryServices.model');

exports.get = async(req, res)=>{
    try{
        const { id } = req.params;
        const history = await ShoppingHistoryServices.find({_id: id});
        return res.status(200).send({history})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getById = async(req, res)=>{
    try{
        const { id } = req.params
        const history = await ShoppingHistoryServices.findOne({_id: id});
        return res.status(200).send({history})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}