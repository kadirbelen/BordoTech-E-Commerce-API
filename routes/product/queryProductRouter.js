const express = require("express");
const Product = require("../../models/Product");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/", async(req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const productName = req.query.productName ?
        req.query.productName.toString() :
        null;

    const categoryName = req.query.categoryName ?
        req.query.categoryName.toString() :
        null;

    try {
        var product;
        if (productName !== null) {
            var regex = new RegExp(productName, "i"); //case sensitive
            product = await Product.find({
                    productTitle: regex,
                })
                .skip(page * pageSize)
                .limit(pageSize);
        } else if (categoryName !== null) {
            console.log("name", categoryName);
            const category = await Category.findOne({ categoryName: categoryName });

            product = await Product.find({ category: category._id })
                .skip(page * pageSize)
                .limit(pageSize);
        } else {
            product = await Product.find()
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