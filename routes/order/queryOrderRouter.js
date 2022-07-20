const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

router.get("/getOrder", async(req, res) => {
    const order = await Order.find({ userId: req.userId }).populate(
        "cardItems.productId"
    );
    res.json(order);
});

module.exports = router;