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
    items: Joi.array().required().items(
        Joi.object({
            name: Joi.string().required().min(3),
            price: Joi.number().required().min(1),
            quantity: Joi.number().required().min(1),
        })
    ),
});

module.exports = {
    createValidation,
}