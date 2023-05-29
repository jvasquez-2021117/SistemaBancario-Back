'use strict'

const TypeAccount = require('./typeAccount.model')

exports.test = (req, res)=>{
    return res.send({message: 'Test fuction is running'});
}

exports.add = async(req, res)=>{
    try{
        let data = req.body;
        let typeExists = await TypeAccount.fi
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error addign'})
    }
}