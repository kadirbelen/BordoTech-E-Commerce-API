const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("products");
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

module.exports = router;