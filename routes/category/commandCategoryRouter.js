const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.post("/create", (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName,
  });
  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
