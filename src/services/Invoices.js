const Invoice = require("../models/Invoices");

const insert = (data) => {
    const invoice = new Invoice(data);

    return invoice.save();
}

const list = () => {
    return Invoice.find({}).populate("from", { password: 0 });
}

module.exports = {
    insert,
    list,
}