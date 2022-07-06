const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/getAll", (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/create", (req, res) => {
    const category = new Category({
        categoryName: req.body.categoryName,
    });
    category.save();
    res.json(category);
});

module.exports = router;