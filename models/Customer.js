const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 50 },
    surname: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, require: true, min: 6, max: 255, unique: true },
    password: { type: String, required: true, min: 6, max: 1024 },
    phone: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Customer", CustomerSchema);