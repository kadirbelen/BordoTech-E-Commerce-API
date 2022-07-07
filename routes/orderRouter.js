const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/addOrder", (req, res) => {
    const order = new Order(req.body);
    order
        .save()
        .then((order) => {
            res.json(order);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/getOrder", (req, res) => {
    console.log(req.userId);
    Order.find({ userId: req.userId })
        .populate("cardItems")
        .then((order) => {
            res.json(order);
        })
        .catch((e) => {
            res.json(e);
        });
});

module.exports = router;