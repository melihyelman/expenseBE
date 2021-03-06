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
    _id: Joi.string().min(3),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
})

const resetPasswordValidation = Joi.object({
    email: Joi.string().required().email(),
})

const passwordValidation = Joi.object({
    password: Joi.string().required().min(5),
    confirm_password: Joi.string().required().min(5).valid(Joi.ref('password')),
})

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation,
    passwordValidation
}