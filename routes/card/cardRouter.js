const express = require("express");
const router = express.Router();
const Card = require("../../models/Card");
const Product = require("../../models/Product");

router.put("/addItem", async(req, res) => {
    try {
        const productId = req.body.products[0].productId;
        const amount = req.body.products[0].amount;

        const card = await Card.findOne({ userId: req.userId });

        //aynı ürün varsa bize o ürünün indis numarasını verecek yoksa -1 döner
        const productIndex = card.products.findIndex(
            (item) => item.productId.toString() === productId
        );

        console.log("productIndex", productIndex);
        const product = await Product.findById(productId);

        if (productIndex > -1) {
            //ürün var aynı ürünün adetini arttırdık
            const productItem = card.products[productIndex];
            productItem.amount += amount;
            card.totalPrice += amount * product.productPrice;
            card.products[productIndex] = productItem;
        } else {
            card.products.push({
                productId: productId,
                amount: amount,
            });
            card.totalPrice = amount * product.productPrice;
        }
        const updateCard = await Card.findByIdAndUpdate(card._id, card, {
            new: true,
        });
        res.json(updateCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async(req, res) => {
    try {
        const card = await Card.find({ userId: req.userId }).populate(
            "products.productId"
        );
        console.log(req.userId);
        res.json(card);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.patch("/clear", async(req, res) => {
    try {
        const card = await Card.findOne({ userId: req.userId });

        if (req.query.productId) {
            //spesifik bir elemanı silmek
            const newCard = card.products.filter(
                (item) => item.productId.toString() !== req.query.productId
            );
            console.log("newCard", newCard);
            card.products = newCard;
        } else {
            //kullanıcıya ait card silindi/temizlendi
            card.products = [];
        }

        const updateCard = await Card.findByIdAndUpdate(card._id, card.products, {
            new: true,
        });
        res.json(updateCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;