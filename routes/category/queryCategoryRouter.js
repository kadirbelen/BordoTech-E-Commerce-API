const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        var category = await Category.find();
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;