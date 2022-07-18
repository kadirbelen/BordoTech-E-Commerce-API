const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.post("/create", async(req, res) => {
    try {
        const category = new Category({
            categoryName: req.body.categoryName,
        });
        await category.save();
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;