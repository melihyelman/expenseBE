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
    expense_date: {
        type: Date,
        default: Date.now
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
            currency: {
                type: String,
                required: true,
                enum: ['USD', 'EUR', 'GBP', 'TRY']
            }
        }
    ]

}, { timestamps: true, versionKey: false });


module.exports = Mongoose.model('expense', ExpenseSchema);