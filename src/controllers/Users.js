const httpStatus = require('http-status');
const { passwordHash, generateRefreshToken, generateAccessToken } = require('../scripts/utils/helper');
const { insert, list, loginUser } = require("../services/Users");
const invoiceService = require("../services/Invoices");

const create = (req, res) => {
    insert(req.body)
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const login = (req, res) => {
    req.body.password = passwordHash(req.body.password);
    loginUser(req.body)
        .then((response) => {
            if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunamadı." })

            response = {
                ...response.toObject(),
                tokens: {
                    access_token: generateAccessToken(response),
                    refresh_token: generateRefreshToken(response)
                }
            }
            res.status(httpStatus.OK).send(response)
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));

}

const index = (req, res) => {
    list()
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const invoicesList = (req, res) => {
    invoiceService.list({ from: req.user._id })
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

module.exports = {
    index,
    create,
    login,
    invoicesList
}