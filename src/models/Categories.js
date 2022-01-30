const Mongoose = require('mongoose');

const CategoriesScheme = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
    }

}, { timestamps: true, versionKey: false });


module.exports = Mongoose.model('category', CategoriesScheme);