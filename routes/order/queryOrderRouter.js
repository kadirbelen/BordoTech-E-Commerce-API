const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");

router.get("/getOrder", (req, res) => {
  console.log(req.userId);
  Order.find({ userId: req.userId })
    .populate("cardItems.productId")
    .then((order) => {
      res.json(order);
    })
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;
