const productSchema = require("./productValidate");
const categorySchema = require("./categoryValidate");
const orderSchema = require("./orderValidate");
const cardSchema = require("./cardValidate");
const authSchema = require("./authValidate");
const adminOperations = require("./adminOperationsValidate");

const loginSchema = authSchema.loginSchema;
const registerSchema = authSchema.registerSchema;

module.exports = {
    productSchema,
    categorySchema,
    loginSchema,
    registerSchema,
    orderSchema,
    cardSchema,
    adminOperations,
};