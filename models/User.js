const mongoose = require("mongoose");
const Product = require("./Product");

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, require: true, min: 6, max: 255, unique: true },
    password: { type: String, required: true, min: 6, max: 1024 },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);