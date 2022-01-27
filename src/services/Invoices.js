const Invoice = require("../models/Invoices");

const insert = (data) => {
    const invoice = new Invoice(data);

    return invoice.save();
}

const list = (where) => {
    return Invoice.find(where || {}).populate("from", { password: 0 });
}

const modify = (id, data) => {
    return Invoice.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
    insert,
    list,
    modify
}