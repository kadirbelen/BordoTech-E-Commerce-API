const Joi = require("@hapi/joi");

const orderSchema = Joi.object({
    payType: Joi.string().valid("Online Ödeme", "Kapıda Ödeme"),
    address: Joi.string().required(),
});

module.exports = orderSchema;