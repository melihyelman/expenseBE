const Mongoose = require('mongoose');

const ClientSchema = new Mongoose.Schema({
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
        type: Mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    client: {
        type: ClientSchema,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    invoice_date: {
        type: Date,
        default: Date.now
    },
    payment_date: {
        type: Date,
        required: true,
    },
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