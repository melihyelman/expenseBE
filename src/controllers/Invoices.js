const httpStatus = require('http-status');
const { insert } = require("../services/Invoices");
const { list } = require('../services/Invoices');

const create = (req, res) => {
    req.body.from = req.user._id;
    insert(req.body)
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}
const index = (req, res) => {
    console.log(req.user)
    list({ from: req.user._id })
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    index,
    create,
}