const express = require("express");
const Product = require("../../models/Product");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        var product;
        if (req.query.productName) {
            product = await Product.find({
                    productTitle: { $regex: new RegExp(req.query.productName, "i") },
                })
                .skip(page * pageSize)
                .limit(pageSize);
        } else if (req.query.categoryName) {
            const category = await Category.findOne({
                categoryName: req.query.categoryName,
            });

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
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        const product = await Product.findOne({ _id: req.params.id });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;