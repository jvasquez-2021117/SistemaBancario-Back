'use strict'

const Favorite = require('./favorite.model')

exports.add = async(req, res)=>{
    try{
        const data = req.body;
        const alreadyFavorite = await Favorite.findOne({ $and: [ { owner: data.owner }, { accountFav: data.accountFav } ] });
        if( alreadyFavorite )  return res.send({message: 'Ya agregado a favorito'});
        const newFavorite = new Favorite(data);
        await newFavorite.save();
        return res.status(200).send({message: 'added to favorites'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error adding'})
    }
}

exports.delete = async(req, res) => {
    try{
        const data = req.body;
        const deleteFavorite =  await Favorite.findOneAndDelete({ $and: [ { owner: data.owner }, { accountFav: data.accountFav } ] });
        if( !deleteFavorite ) return res.send({message: 'Favorite not found and not deleted'})
        return res.status(200).send({message: 'Removed from favorites'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deleting'})
    }
}

exports.get = async(req, res) => {
    try{
        const data = req.body;
        const favorites = await Favorite.find({ owner: data.owner });
        return res.status(200).send({favorites});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'})
    }
}