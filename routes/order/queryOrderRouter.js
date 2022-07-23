const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

router.get("/", async(req, res) => {
    try {
        const order = await Order.find({ userId: req.userId })
            .sort({ _id: -1 }) //son siparişten ilk siparişe sırala
            .populate("cardItems.productId");
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;