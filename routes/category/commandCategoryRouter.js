const express = require("express");
const Category = require("../../models/Category");
const categoryValidate = require("../../validation/categoryValidate");

const router = express.Router();

router.post("/", async(req, res) => {
    const error = categoryValidate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

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