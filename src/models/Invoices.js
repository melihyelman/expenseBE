const Mongoose = require('mongoose');

const ReceiverSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    phone: String,
    streetAddress: String,
    city: String,
    zipCode: String,
    country: String,
})

const ItemSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

const InvoiceSchema = new Mongoose.Schema({
    from: {
        type: Mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiver: {
        type: ReceiverSchema,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    payment_date: Date,
    payment_due: Date,
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    items: [
        {
            type: ItemSchema,
            required: true,
        }
    ]

}, { timestamps: true, versionKey: false });


module.exports = Mongoose.model('invoice', InvoiceSchema);