const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length >= 0){
        res.status(200).json(docs);}
        else{
            res.status(404).json({
                message: "No entries are found"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Product created successfully',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From database: ", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// PATCH /products/:productId
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Product updated successfully",
            result: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findByIdAndDelete(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'Product deleted successfully',
                    deletedProduct: result
                });
            } else {
                res.status(404).json({
                    message: 'No product found with the provided ID'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
