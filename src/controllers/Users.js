const httpStatus = require('http-status');
const { passwordHash, generateRefreshToken, generateAccessToken } = require('../scripts/utils/helper');
const { insert, list, loginUser, modify, remove } = require("../services/Users");
const expenseService = require("../services/Expenses");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require('path');

const create = (req, res) => {
    insert(req.body)
        .then((response) => res.status(httpStatus.CREATED).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const login = (req, res) => {
    req.body.password = passwordHash(req.body.password);
    loginUser(req.body)
        .then((response) => {
            if (!response) return res.status(httpStatus.NOT_FOUND).send({ error: "Not found user." })

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

const expensesList = (req, res) => {
    expenseService.list({ from: req.user._id })
        .then((response) => res.status(httpStatus.OK).send(response))
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const resetPassword = (req, res) => {

    const new_password = Math.random().toString(36).slice(-8);
    modify({ email: req.body.email }, { password: passwordHash(new_password) })
        .then(response => {
            if (!response)
                return res.status(httpStatus.NOT_FOUND).send({ error: "Not found user" })

            eventEmitter.emit("send_email", {
                to: response.email,
                subject: "Şifre Yenileme",
                html: `Şifre sıfırlama işleminiz gerçekleştirmiştir. <br /> Şifrenizi değiştirmeyi unutmayın! <br /> Yeni şifreniz: <b>${new_password}</b>`
            });
            res.status(httpStatus.OK).send({ message: "Sended reset password." })
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const update = (req, res) => {
    modify({ _id: req.user._id }, req.body)
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))

}

const deleteUser = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'Id information is required.' });
    }
    remove(req.params.id)
        .then(response => {
            if (!response)
                return res.status(httpStatus.NOT_FOUND).send({ error: "Not found user." })

            res.status(httpStatus.OK).send({ message: "Deleted user." })
        })
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const changePassword = (req, res) => {
    req.body.password = passwordHash(req.body.password);

    modify({ _id: req.user?._id }, { password: req.body.password })
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const updateProfileImage = (req, res) => {
    if (!req?.files?.profile_image)
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Image upload is required." });

    if (!(path.extname(req.files.profile_image.name) === ".png" || path.extname(req.files.profile_image.name) === ".jpg"))
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Image extension must end with .png or .jpg." });

    const fileName = `${req.user._id}${path.extname(req.files.profile_image.name)}`
    const folderPath = path.join(__dirname, "../uploads/users", fileName);

    req.files.profile_image.mv(folderPath, function (err) {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);

        modify({ _id: req.user._id }, { profile_image: fileName })
            .then(response => res.status(httpStatus.OK).send(response))
            .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
    })
}

module.exports = {
    index,
    create,
    login,
    update,
    expensesList,
    resetPassword,
    deleteUser,
    changePassword,
    updateProfileImage
}