const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get request to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if (id === 'special'){// if id is specia in url this will work
        res.status(200).json({
            message: 'You passed a special ID here sajan',
            id : id
        });
    
    }
    else {
        res.status(200).json({
            message: 'You passed some other ID'
        })
    }
});



router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Updated Product!!!'
    });
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'Deleted the Product!!!'
    });
});

module.exports = router;
