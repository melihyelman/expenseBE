const httpStatus = require('http-status');
const { passwordHash, generateRefreshToken, generateAccessToken } = require('../scripts/utils/helper');
const { insert, list, loginUser, modify, remove } = require("../services/Users");
const invoiceService = require("../services/Invoices");
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
            if (!response) return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunamadı." })

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

const resetPassword = (req, res) => {

    const new_password = Math.random().toString(36).slice(-8);
    modify({ email: req.body.email }, { password: passwordHash(new_password) })
        .then(response => {
            if (!response)
                return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunamadı." })

            eventEmitter.emit("send_email", {
                to: response.email,
                subject: "Şifre Yenileme",
                html: `Şifre sıfırlama işleminiz gerçekleştirmiştir. <br /> Şifrenizi değiştirmeyi unutmayın! <br /> Yeni şifreniz: <b>${new_password}</b>`
            });
            res.status(httpStatus.OK).send({ message: "Şifre sıfırlama maili gönderildi." })
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const update = (req, res) => {
    modify({ _id: req.user._id }, req.body)
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))

}

const deleteUser = (req, res) => {
    if (!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: 'id bilgisi zorunludur.' });
    }
    remove(req.params.id)
        .then(response => {
            if (!response)
                return res.status(httpStatus.NOT_FOUND).send({ error: "Böyle bir kullanıcı bulunamadı." })

            res.status(httpStatus.OK).send({ message: "Kullanıcı silindi." })
        })
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const changePassword = (req, res) => {
    if (req.body.password !== req.body.confirm_password)
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Şifreler uyuşmuyor." });

    req.body.password = passwordHash(req.body.password);
    modify({ _id: req.user?._id }, { password: req.body.password })
        .then(response => res.status(httpStatus.OK).send(response))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e))
}

const updateProfileImage = (req, res) => {
    if (!req?.files?.profile_image)
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Resim yüklemek zorundasınız" });

    if (!(path.extname(req.files.profile_image.name) === ".png" || path.extname(req.files.profile_image.name) === ".jpg"))
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Resim formatı .png veya .jpg olmalıdır." });

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
    invoicesList,
    resetPassword,
    deleteUser,
    changePassword,
    updateProfileImage
}