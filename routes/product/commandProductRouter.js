const express = require("express");
const Product = require("../../models/Product");
const validate = require("../../middleware/validationControl");
const router = express.Router();

router.post("/", validate("productSchema"), async(req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch("/:id", async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json({ information: "ürün silindi" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;