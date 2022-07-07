const Card = require("./Card");
// const User = require("./User");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    cardItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    },
    payType: {
        type: Boolean,
        default: false, //online ödeme
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model("Order", OrderSchema);