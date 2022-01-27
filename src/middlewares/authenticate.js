const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1] || null;

    if (!token)
        return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için giriş yapmalısınız..." });

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(httpStatus.FORBIDDEN).send({ error: "Token süresi geçmiştir..." });
        req.user = decoded;
        next();
    })
}

module.exports = authenticate;