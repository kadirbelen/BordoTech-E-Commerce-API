const express = require("express");
const router = express.Router();
const Card = require("../../models/Card");
const Product = require("../../models/Product");
const validate = require("../../middleware/validationControl");

router.patch("/newItem", validate("cardSchema"), async(req, res) => {
    try {
        const productId = req.body.products[0].productId;
        const amount = req.body.products[0].amount ?
            req.body.products[0].amount :
            1;

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
            card.totalPrice += amount * product.productPrice;
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
            const newCard = card.products.filter(
                (item) => item.productId.toString() !== req.query.productId
            );
            const totalPrice = await cardTotalPrice(newCard, req);
            card.products = newCard;
            card.totalPrice = totalPrice;
        } else {
            //kullanıcıya ait card silindi/temizlendi
            card.products = [];
            card.totalPrice = 0;
        }

        const updateCard = await Card.findByIdAndUpdate(card._id, card, {
            new: true,
        });
        res.json(updateCard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

async function cardTotalPrice(card) {
    var totalPrice = 0;
    await Promise.all(
        card.map(async(item) => {
            const product = await Product.findById(item.productId);
            totalPrice += item.amount * product.productPrice;
        })
    );
    return totalPrice;
}
module.exports = router;