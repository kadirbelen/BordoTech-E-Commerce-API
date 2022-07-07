const Card = require("./Card");
// const User = require("./User");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    cardItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        amount: { type: Number, default: 1 },
    }, ],
    payType: {
        type: Boolean,
        default: false, //online ödeme
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model("Order", OrderSchema);