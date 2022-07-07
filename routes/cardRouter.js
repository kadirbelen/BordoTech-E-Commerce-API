const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

router.post("/addCard", (req, res) => {
    const productId = req.body.products[0].productId;
    const amount = req.body.products[0].amount;

    Card.findOne({ userId: req.userId }).then((card) => {
        if (!card) {
            //kullanıcın sepeti/kartı yoksa oluştur
            card = new Card({...req.body, userId: req.userId });
        } else {
            console.log("card:", card);
            console.log("products:", card.products);
            //aynı ürün varsa bize o ürünün indis numarasını verecek yoksa -1 döner
            const productIndex = card.products.findIndex((item) => {
                console.log("item", item.productId.id);

                // console.log("productIDDDDD", productId);

                item.productId == productId;
            });
            console.log("productIndex", productIndex);

            if (productIndex > -1) {
                //ürün var aynı ürünün adetini arttırdık
                const productItem = card.products[productIndex];
                productItem.amount += 1;
                card.products[productIndex] = productItem;
            } else {
                console.log("productId", req.body.products);

                card.products.push({
                    productId: productId,
                    amount: amount,
                });
            }
        }

        card.save();
        res.json(card);
    });
});

router.get("/getCard/:userId", (req, res) => {
    console.log(req.params.userId);
    Card.find({ userId: req.params.userId })
        .then((card) => {
            console.log(card);
            res.json(card);
        })
        .catch((e) => {
            res.json(e);
        });
});

module.exports = router;