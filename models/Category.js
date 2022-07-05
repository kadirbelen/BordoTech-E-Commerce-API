const mongoose = require("mongoose");
const Category = require("./Product");

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Category", CategorySchema);