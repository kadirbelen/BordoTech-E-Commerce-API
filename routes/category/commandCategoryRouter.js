const express = require("express");
const Category = require("../../models/Category");
const validate = require("../../middleware/validationControl");

const router = express.Router();

router.post("/", validate("categorySchema"), async(req, res) => {
    try {
        const category = new Category({
            categoryName: req.body.categoryName,
        });
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;