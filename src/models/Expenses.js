const Mongoose = require('mongoose');


const ExpenseSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Mongoose.Types.ObjectId,
        ref: "category",
        required: true,
    },
    description: String,
    payment_date: Date,
    payment_due: Date,
    expense_date : {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    items: [
        {
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
        }
    ]

}, { timestamps: true, versionKey: false });


module.exports = Mongoose.model('expense', ExpenseSchema);