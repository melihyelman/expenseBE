const httpStatus = require('http-status');
const { insert, list, modify, remove } = require("../services/Expenses");

const create = (req, res) => {
    req.body.user = req.user._id;
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
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Id information is required.' });
    }
    modify({ _id: req.params.id }, req.body)
        .then(response => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const deleteExpense = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Id information is required.' });
    }
    list({ _id: req.params.id })
        .then(response => {
            if (response.length === 0)
                return res.status(httpStatus.NOT_FOUND).send({ error: 'Not found expense for this Id information.' });

            if (response[0].user._id?.toString() !== req.user._id)
                return res.status(httpStatus.FORBIDDEN).send({ error: 'Not allowed delete expense' });

            remove(req.params.id)
                .then(response => res.status(httpStatus.OK).send({ message: "Expense deleted" }))
                .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
        })
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    index,
    create,
    update,
    deleteExpense
}