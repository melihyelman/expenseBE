const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

const passwordHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
}

const generateAccessToken = (user) => {
    return JWT.sign({ name: user.email, ...user.toObject() }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1w' });
}

const generateRefreshToken = (user) => {
    return JWT.sign({ name: user.email, ...user.toObject() }, process.env.REFRESH_TOKEN_SECRET_KEY);
}

module.exports = {
    passwordHash,
    generateAccessToken,
    generateRefreshToken
}