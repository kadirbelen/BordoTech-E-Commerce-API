const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/getAll", (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.get("/getByCategoryId/:id", (req, res) => {
    console.log(req.params.id);
    Product.find({ id: req.params.id })
        .then((product) => {
            res.json(product);
        })
        .catch((e) => {
            res.json(e);
        });
});

router.post("/create", (req, res) => {
    const product = new Product({
        productTitle: req.body.productTitle,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        category: req.body.category,
    });

    product.save();
    res.json(product);
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