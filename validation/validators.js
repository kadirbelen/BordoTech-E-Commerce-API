const productSchema = require("./productValidate");
const categorySchema = require("./categoryValidate");
const authSchema = require("./authValidate");

const loginSchema = authSchema.loginSchema;
const registerSchema = authSchema.registerSchema;

module.exports = { productSchema, categorySchema, loginSchema, registerSchema };