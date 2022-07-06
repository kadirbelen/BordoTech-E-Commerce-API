const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/getAll", (req, res) => {
    Category.find()
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;