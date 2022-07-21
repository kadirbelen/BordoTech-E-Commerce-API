const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

router.get("/", async(req, res) => {
    const order = await Order.find({ userId: req.userId })
        .sort({ _id: -1 })
        .populate("cardItems.productId");
    res.json(order);
});

module.exports = router;