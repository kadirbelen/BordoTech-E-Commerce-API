const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const User = require("../../models/User");

router.patch("/addItem", async(req, res) => {
    const productId = req.body.card[0].productId;
    const amount = req.body.card[0].amount;

    const user = await User.findById(req.userId);
    //aynı ürün varsa bize o ürünün indis numarasını verecek yoksa -1 döner
    const productIndex = user.card.findIndex(
        (item) => item.productId.toString() === productId
    );

    const product = await Product.findById(productId);

    if (productIndex > -1) {
        //ürün var olduğu için aynı ürünün adetini arttırdık
        const productItem = user.card[productIndex];
        productItem.amount += amount;
        productItem.totalPrice += amount * product.productPrice;
        user.card[productIndex] = productItem;
    } else {
        console.log("productId", req.body.card);

        user.card.push({
            productId: productId,
            amount: amount,
            totalPrice: product.productPrice * amount,
        });
    }
    const updateUser = await User.findByIdAndUpdate(req.userId, user, {
        new: true,
    });

    res.json(updateUser);
});

router.get("/getCard", async(req, res) => {
    console.log(req.userId);
    const user = await User.findById(req.userId).populate("card.productId");
    res.json(user);
});

router.patch("/clear", async(req, res) => {
    const user = await User.findById(req.userId);

    if (req.query.productId) {
        //spesifik bir elemanı silmek
        const newCard = user.card.filter(
            (item) => item.productId.toString() !== req.query.productId
        );
        console.log("newCard", newCard);
        user.card = newCard;
    } else {
        //kullanıcıya ait card silindi/temizlendi
        user.card = [];
    }

    const updateUser = await User.findByIdAndUpdate(req.userId, user, {
        new: true,
    });
    res.json(updateUser);
});

module.exports = router;

// router.put("/addItem", async(req, res) => {
//     const productId = req.body.card[0].productId;
//     const amount = req.body.card[0].amount;

//     const user = await User.findById(req.userId);
//     //aynı ürün varsa bize o ürünün indis numarasını verecek yoksa -1 döner
//     const productIndex = user.card.findIndex(
//         (item) => item.productId.toString() === productId
//     );

//     const product = await Product.findById(productId);

//     if (productIndex > -1) {
//         //ürün var olduğu için aynı ürünün adetini arttırdık
//         const productItem = user.card[productIndex];
//         productItem.amount += amount;
//         productItem.totalPrice += amount * product.productPrice;
//         user.card[productIndex] = productItem;
//     } else {
//         console.log("productId", req.body.card);

//         user.card.push({
//             productId: productId,
//             amount: amount,
//             totalPrice: product.productPrice * amount,
//         });
//     }

//     user.save();
//     res.json(user);
// });