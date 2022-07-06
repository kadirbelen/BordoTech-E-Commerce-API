const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.get("/getAll", (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    Product.find()
        .skip(page * pageSize)
        .limit(pageSize)
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

module.exports = router;