const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
    userName: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const registerValidate = (requestBody) => {
    const { error } = registerSchema.validate(requestBody);
    return error;
};

const loginValidate = (res, requestBody) => {
    const { error } = loginSchema.validate(requestBody);
    res.status(400).send(error.details[0].message);
    return error;
};

module.exports = { registerValidate, loginValidate };