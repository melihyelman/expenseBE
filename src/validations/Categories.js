const Joi = require('joi');

const categoryValidation = Joi.object({
    title: Joi.string().min(2).required(),
});

module.exports = {
    categoryValidation
}