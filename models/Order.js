const User = require("./User");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    cardItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        amount: { type: Number, default: 1 },
        totalPrice: { type: Number },
    }, ],
    payType: {
        type: String,
        default: "Online Ödeme",
        enum: ["Online Ödeme", "Kapıda Ödeme"],
    },
    address: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Order", OrderSchema);