'use strict'

const TypeAccount = require('./typeAccount.model')

exports.test = (req, res)=>{
    return res.send({message: 'Test fuction is running'});
}

exports.add = async(req, res)=>{
    try{
        const data = req.body;
        const typeExists = await TypeAccount.findOne({name: data.name});
        if(typeExists) return res.send({message: 'Type is already exists'});
        const newType = new TypeAccount(data);
        await newType.save();
        return res.status(200).send({message: 'Type created successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error addign'})
    }
}

exports.update = async(req, res)=>{
    try{
        const { id } = req.params;
        const data = req.body;
        const typeExists =  await TypeAccount.findOne({name: data.name});
        if(typeExists) return res.send({message: 'Type is already exists'});
        const update = await TypeAccount.findOneAndUpdate({_id: id}, data, {new: true});
        if(!update) return res.send({message: 'Type not found and not updated'});
        return res.status(200).send({message: `Type with name ${update.name}, updated successfully`});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error updating'})
    }
}

exports.delete = async(req, res)=>{
    try{
        const { id } = req.params;
        const deleteType = await TypeAccount.findOneAndDelete({_id: id});
        if(!deleteType) return res.sed({message: 'Type not found and not deleted'});
        return res.status(200).send({message: `Type with name ${deleteType.name} deleted successfully`});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deleting'})
    }
}

exports.get = async(req, res)=>{
    try{
        const types = await TypeAccount.find();
        return res.status(200).send({types});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}

exports.getById = async(req, res)=>{
    try{
        const { id } = req.params;
        const type = await TypeAccount.findOne({_id: id})
        return res.status(200).send({type});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}