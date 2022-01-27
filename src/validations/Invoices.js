const Joi = require('joi');

const createValidation = Joi.object({
    receiver: {
        name: Joi.string().required().min(3),
        email: Joi.string().email(),
        phone: Joi.string().min(5),
        streetAddress: Joi.string().min(3),
        city: Joi.string().min(3),
        zipCode: Joi.string().min(3),
        country: Joi.string().min(3),
    },
    description: Joi.string().required().min(3),
    payment_date: Joi.date(),
    payment_due: Joi.date(),
    status: Joi.string().valid('pending', 'paid'),
    items: Joi.array().required().items(
        Joi.object({
            name: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            quantity: Joi.number().required().min(1),
        })
    )
});

const updateValidation = Joi.object({
    _id: Joi.string().min(3),
    from: Joi.string().min(3),
    receiver: {
        name: Joi.string().required().min(3),
        email: Joi.string().email(),
        phone: Joi.string().min(5),
        streetAddress: Joi.string().min(3),
        city: Joi.string().min(3),
        zipCode: Joi.string().min(3),
        country: Joi.string().min(3),
        _id: Joi.string().min(3),
    },
    description: Joi.string().min(3),
    payment_date: Joi.date(),
    payment_due: Joi.date(),
    status: Joi.string().valid('pending', 'paid'),
    items: Joi.array().items(
        Joi.object({
            name: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            quantity: Joi.number().required().min(1),
            _id: Joi.string().min(3)
        })
    ),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});

module.exports = {
    createValidation,
    updateValidation
}