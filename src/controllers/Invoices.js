const httpStatus = require('http-status');
const { insert, list, modify, remove } = require("../services/Invoices");

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

const deleteProject = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'id bilgisi zorunludur.' });
    }
    list({ _id: req.params.id })
        .then(response => {
            if (response.length === 0)
                return res.status(httpStatus.NOT_FOUND).send({ error: 'bu id ye ait invoice bulunamadı' });

            if (response[0].from._id?.toString() !== req.user._id)
                return res.status(httpStatus.FORBIDDEN).send({ error: 'invoice silme yetkiniz yok' });

            remove(req.params.id)
                .then(response => res.status(httpStatus.OK).send({ message: "invoice silindi" }))
                .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
        })
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    index,
    create,
    update,
    deleteProject
}