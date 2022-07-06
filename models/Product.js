const Category = require("./Category");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productTitle: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Product", ProductSchema);