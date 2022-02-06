const Joi = require('joi');

const categoryValidation = Joi.object({
    _id: Joi.string().min(3),
    title: Joi.string().min(2).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});

module.exports = {
    categoryValidation
}