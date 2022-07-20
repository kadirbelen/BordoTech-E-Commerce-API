const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const emailService = require("../../service/emailService");

router.post("/addOrder", async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        const order = new Order({
            cardItems: user.card,
            userId: req.userId,
            payType: req.body.payType,
            address: req.body.address,
        });

        var arr = user.card;
        var productName = null;
        async function stockSituation(arr) {
            console.log("isStock çalıştı");
            for (let index = 0; index < arr.length; index++) {
                var product = await Product.findById(arr[index].productId);
                if (product.stock < arr[index].amount) {
                    productName = product.productTitle;
                    return false;
                }
            }

            return true;
        }

        var hasStock = await stockSituation(arr);
        console.log("stock", hasStock);

        if (hasStock) {
            console.log("siparişi onayla");
            user.card.map(async(item) => {
                var product = await Product.findById(item.productId);
                product.stock = product.stock - item.amount;
                product.save();
            });
            order.save();
            user.card = [];
            user.save();
            emailService(req, res);
            return res.json(order);
        } else {
            console.log("sipariş iptali");
            res.json(`${productName} isimli ürün için istenen adette stok yoktur`);
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;