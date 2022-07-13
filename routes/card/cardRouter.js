const express = require("express");
const router = express.Router();
const Card = require("../../models/Card");

router.post("/create", (req, res) => {
  const productId = req.body.products[0].productId;
  const amount = req.body.products[0].amount;

  Card.findOne({ userId: req.userId }).then((card) => {
    if (!card) {
      //kullanıcın sepeti/kartı yoksa oluştur
      card = new Card({ ...req.body, userId: req.userId });
    } else {
      //aynı ürün varsa bize o ürünün indis numarasını verecek yoksa -1 döner
      const productIndex = card.products.findIndex(
        (item) => item.productId.toString() === productId
      );
      console.log("productIndex", productIndex);

      if (productIndex > -1) {
        //ürün var olduğu için aynı ürünün adetini arttırdık
        const productItem = card.products[productIndex];
        productItem.amount += amount;
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

router.get("/getCard", (req, res) => {
  console.log(req.userId);
  Card.find({ userId: req.userId })
    .populate("products.productId")
    .then((card) => {
      console.log(card);
      res.json(card);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.delete("/delete", (req, res) => {
  //kullanıcıya ait card silindi/temizlendi
  Card.findOneAndDelete({ userId: req.userId })
    .then(() => {
      res.json("kart silindi");
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
