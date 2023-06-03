'use strict'

const Product = require('./product.model')


exports.test = (req, res) => {
    return res.send({ message: 'Test product running' })
}

exports.add = async (req, res) => {
    try {
        let data = req.body
        let existProduct = await Product.findOne({ name: data.name });
        if (existProduct) return res.send({ message: 'This Product already exists' });
        let product = new Product(data);
        await product.save();
        return res.status(201).send({ message: 'Product created succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error creating Product' });
    }
}

exports.update = async (req, res) => {
    try {
        let idProduct = req.params.id
        let data = req.body
        let updatedProduct = await Product.findOneAndUpdate(
            { _id: idProduct },
            data,
            { new: true, upsert: true }
        )
        if (!updatedProduct) return res.send({ message: 'Product not found and not updated' })
        return res.send({ message: 'Product update' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating Product' })
    }
}

exports.delete = async (req, res) => {
    try {
        let idProduct = req.params.id
        let productDeleted = await Product.findOneAndDelete({ _id: idProduct });
        if (!productDeleted) return res.send({ message: 'Product not found and not deleted' });
        return res.send({message: 'Product deleting succesfully'})
    } catch (e) {
        console.log(e);
        return res.status(404).send({message: 'Error deleting Product'})
    }
}