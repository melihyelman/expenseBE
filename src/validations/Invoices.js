const Joi = require('joi');

const createValidation = Joi.object({
    from: Joi.string().required(),
    client: {
        name: Joi.string().required().min(3),
        email: Joi.string().email(),
        phone: Joi.string().min(5),
        streetAddress: Joi.string().min(3),
        city: Joi.string().min(3),
        zipCode: Joi.string().min(3),
        country: Joi.string().min(3),
    },
    description: Joi.string().required().min(3),
    invoice_date: Joi.date().required(),
    payment_date: Joi.date().required(),
    items: Joi.array().items(
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