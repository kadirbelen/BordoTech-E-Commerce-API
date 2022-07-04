const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("categories");
});

router.post("/", (req, res) => {
    const category = new Category({
        categoryName: req.body.categoryName,
    });
    category.save();
    res.json(category);
});

module.exports = router;