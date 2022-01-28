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

const updateValidation = Joi.object({
    full_name: Joi.string().min(3),
    email: Joi.string().email(),
})

const resetPasswordValidation = Joi.object({
    email: Joi.string().required().email(),
})

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation
}