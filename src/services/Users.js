const User = require("../models/Users");

const insert = (data) => {
    const user = new User(data);

    return user.save();
}

const loginUser = (loginData) => {
    return User.findOne(loginData, { password: 0 });
}

const list = () => {
    return User.find({}, { password: 0 });
}

module.exports = {
    insert,
    list,
    loginUser
}