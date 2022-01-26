const Joi = require('joi');

const createValidation = Joi.object({
    full_name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(20),
})

module.exports = {
    createValidation
}