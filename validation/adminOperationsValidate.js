const Joi = require("@hapi/joi");

const roleChangeSchema = Joi.object({
    role: Joi.string().valid("admin", "customer"),
});

module.exports = roleChangeSchema;