const express = require("express");
const Product = require("../../models/Product");

const router = express.Router();

router.get("/getAll", async(req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    try {
        var product = await Product.find()
            .skip(page * pageSize)
            .limit(pageSize);

        res.json(product);
    } catch (error) {
        res.json(err);
    }
});

//endpoint productGetAll üzerinden yapılacak
// router.get("/getByCategoryId/:id", (req, res) => {
//     console.log(req.params.id);
//     Product.find({ category: req.params.id })
//         .then((product) => {
//             console.log(product);
//             res.json(product);
//         })
//         .catch((e) => {
//             res.json(e);
//         });
// });

module.exports = router;