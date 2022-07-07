const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Card = require("../../models/Card");

router.post("/addOrder", (req, res, next) => {
    Card.findOne({ userId: req.userId })
        .then((card) => {
            const order = new Order({
                cardItems: card.products,
                payType: req.body.payType,
                address: req.body.address,
            });
            order.save();
            res.json(order);
            req.body = order;
            next();
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;