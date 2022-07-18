const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Card = require("../../models/Card");

router.post("/addOrder", (req, res, next) => {
    Card.findOne({ userId: req.userId })
        .then((card) => {
            const order = new Order({
                cardItems: card.products,
                userId: req.userId,
                payType: req.body.payType,
                address: req.body.address,
            });
            order.save();
            res.json(order);
            next(); //mail işlemine git
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;