const Joi = require("@hapi/joi");

const cardSchema = Joi.object({
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            amount: Joi.number(),
        })
    ),
});

module.exports = cardSchema;