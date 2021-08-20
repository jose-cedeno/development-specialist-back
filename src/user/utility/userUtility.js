const User = require('../domain/User');
const CustomError = require("../../utils/error/CustomError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findAndThrow = (email) => {
    const user = User.findOne(email);
    if (user) {
        throw new CustomError('User Already exist.');
    }
};

const comparePassword = async (password, user) => {

    if (await bcrypt.compare(password, user.password)) {
        return generateToken(user._id);
    } else {
        throw new CustomError('Contraseña invalida.')
    }
}
const generateHash = async password => bcrypt.hashSync(password, 10);

const generateToken = (userId) => {
    return jwt.sign
    (
        {
            id: userId
        },
        process.env.PRIVATE_KEY
    );
}

module.exports = {
    findAndThrow,
    generateHash,
    comparePassword
}
