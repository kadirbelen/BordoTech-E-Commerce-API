const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const Card = require("../../models/Card");
const Product = require("../../models/Product");
const emailService = require("../../service/emailService");
const validate = require("../../middleware/validationControl");

router.post("/", validate("orderSchema"), async(req, res) => {
    try {
        const card = await Card.findOne({ userId: req.userId });

        if (card.products.length > 0) {
            const order = new Order({
                cardItems: card.products,
                totalPrice: card.totalPrice,
                userId: req.userId,
                payType: req.body.payType,
                address: req.body.address,
            });

            var arr = card.products;

            var hasStock = await stockSituation(arr);
            console.log("stock", hasStock);

            if (typeof hasStock === "boolean") {
                console.log("siparişi onayla");
                card.products.map(async(item) => {
                    var product = await Product.findById(item.productId);
                    product.stock = product.stock - item.amount;
                    product.save();
                });
                order.save();
                card.products = [];
                card.totalPrice = 0;
                card.save();
                emailService(req, res);
                return res.json(order);
            } else {
                console.log("sipariş iptali");
                res.status(404).json({
                    error: `${hasStock} isimli ürün için istenen adette stok yoktur`,
                });
            }
        } else {
            res.json("Sepette ürün yok");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

async function stockSituation(arr) {
    console.log("isStock çalıştı");
    for (let index = 0; index < arr.length; index++) {
        var product = await Product.findById(arr[index].productId);
        if (product.stock < arr[index].amount) {
            var productName = product.productTitle;
            return productName;
        }
    }

    return true;
}

module.exports = router;