const httpStatus = require('http-status');
const { insert, list, modify } = require("../services/Invoices");

const create = (req, res) => {
    req.body.from = req.user._id;
    insert(req.body)
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}
const index = (req, res) => {
    list()
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const update = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'id bilgisi zorunludur.' });
    }
    modify({ _id: req.params.id }, req.body)
        .then(response => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    index,
    create,
    update
}