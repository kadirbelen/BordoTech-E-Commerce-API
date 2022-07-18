const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.get("/getAll", async(req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const productName = req.query.productName ?
        req.query.productName.toString() :
        null;

    try {
        var product;
        if (productName === null) {
            product = await Product.find()
                .skip(page * pageSize)
                .limit(pageSize);
        } else {
            var regex = new RegExp(productName, "i"); //case sensitive
            product = await Product.find({
                    productTitle: regex,
                })
                .skip(page * pageSize)
                .limit(pageSize);
        }
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

router.get("/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.json(product);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;