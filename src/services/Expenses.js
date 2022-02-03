const Expense = require("../models/Expenses");

const insert = (data) => {
    const expense = new Expense(data);

    return expense.save();
}

const list = (where) => {
    return Expense.find(where || {}).populate("user", { password: 0 }).populate("category", { title: 1 }).sort({ expense_date: -1 });
}

const modify = (id, data) => {
    return Expense.findByIdAndUpdate(id, data, { new: true });
}
const remove = (id) => {
    return Expense.findByIdAndDelete(id);
}

module.exports = {
    insert,
    list,
    modify,
    remove,
}