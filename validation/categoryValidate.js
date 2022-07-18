const Joi = require("@hapi/joi");

const categorySchema = Joi.object({
    categoryName: Joi.string().required().min(3).max(255),
});

module.exports = (requestBody) => {
    const { error } = categorySchema.validate(requestBody);
    return error;
};