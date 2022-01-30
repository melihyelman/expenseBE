const Mongoose = require('mongoose');
const { passwordHash } = require('../scripts/utils/helper');

const UserSchema = new Mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: 'default.png',
    }
}, { timestamps: true, versionKey: false });

UserSchema.pre("save", function (next) {

    if (!this.isModified('password'))
        return next();

    try {
        this.password = passwordHash(this.password);
        return next();
    } catch (err) {
        return next(err);
    }
})

module.exports = Mongoose.model('user', UserSchema);