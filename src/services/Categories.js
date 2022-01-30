const Category = require("../models/Categories");

const insert = (data) => {
    const category = new Category(data);

    return category.save();
}

const list = (where) => {
    return Category.find(where || {});
}

const modify = (id, data) => {
    return Category.findByIdAndUpdate(id, data, { new: true });
}
const remove = (id) => {
    return Category.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    modify,
    remove,
}