const Mongoose = require('mongoose');

const ClientSchema = new Mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    streetAddress: String,
    city: String,
    zipCode: String,
    country: String,
})

const ItemSchema = new Mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
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
        ItemSchema
    ]

}, { timestamps: true, versionKey: false });


module.exports = Mongoose.model('invoice', InvoiceSchema);