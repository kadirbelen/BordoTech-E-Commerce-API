const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        var category = await Category.find();
        res.json(category);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;