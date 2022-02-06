const Joi = require('joi');

const createValidation = Joi.object({
    user: Joi.string(),
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2),
    expense_date: Joi.date(),
    category: Joi.string().required(),
    currency: Joi.string().required().valid('USD', 'EUR', 'GBP', 'TRY'),
    items: Joi.array().required().items(Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
    }))
});

const updateValidation = Joi.object({
    _id: Joi.string().min(3),
    user: Joi.string(),
    title: Joi.string().min(2),
    description: Joi.string().min(2),
    expense_date: Joi.date(),
    category: Joi.string(),
    currency: Joi.string().required().valid('USD', 'EUR', 'GBP', 'TRY'),
    items: Joi.array().items(Joi.object({
        _id: Joi.string().min(3),
        name: Joi.string().min(2).required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
    })),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});

module.exports = {
    createValidation,
    updateValidation
}