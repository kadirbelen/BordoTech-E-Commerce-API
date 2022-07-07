const Product = require("./Product");
const User = require("./User");
const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        amount: { type: Number, default: 1 },
    }, ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Card", CardSchema);