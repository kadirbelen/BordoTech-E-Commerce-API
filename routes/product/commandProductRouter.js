const express = require("express");
const Product = require("../../models/Product");
const productValidate = require("../../validation/productValidate");
const router = express.Router();

router.post("/create", async(req, res) => {
    const error = productValidate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

router.put("/update/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json("ürün silindi");
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;