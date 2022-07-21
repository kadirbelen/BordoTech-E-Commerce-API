const Joi = require("@hapi/joi");

const productSchema = Joi.object({
    productTitle: Joi.string().required().min(3).max(255),
    productDescription: Joi.string(),
    productPrice: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.allow(),
});

module.exports = productSchema;