const Joi = require('joi');

const createValidation = Joi.object({
    from: Joi.string().required(),
    client: {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        phone: Joi.string().required().min(5),
        streetAddress: Joi.string().required().min(3),
        city: Joi.string().required().min(3),
        zipCode: Joi.string().required().min(3),
        country: Joi.string().required().min(3),
    },
    description: Joi.string().required().min(3),
    invoice_date: Joi.date().required(),
    payment_date: Joi.date().required(),
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