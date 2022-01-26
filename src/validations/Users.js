const Joi = require('joi');

const createValidation = Joi.object({
    full_name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
})

const loginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
})

module.exports = {
    createValidation,
    loginValidation
}