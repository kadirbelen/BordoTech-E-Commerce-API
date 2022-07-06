const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.post("/create", (req, res) => {
    const product = new Product({
        productTitle: req.body.productTitle,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        category: req.body.category,
    });

    product
        .save()
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put("/update/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
            productTitle: req.body.productTitle,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            category: req.body.category,
        })
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete("/delete/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;