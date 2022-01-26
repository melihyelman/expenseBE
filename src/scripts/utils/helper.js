const CryptoJS = require('crypto-js');

const passwordHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
}

module.exports = {
    passwordHash
}