const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
    userName: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
    role: Joi.allow(),
});

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };