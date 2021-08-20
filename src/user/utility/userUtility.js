const User = require('../domain/User');
const CustomError = require("../../utils/error/CustomError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findAndThrow = async (email, document, phone) => {
    const user = await User.findOne({
            $or: [
                {email},
                {document},
                {phone}
            ]
        }
    );


    if (user !== null) {
        throw new CustomError('User Already exist. Another account have the same email, document or phone.');
    }
};

const comparePassword = async (password, user) => {
    if (user !== null) {
        if (await bcrypt.compare(password, user.password)) {
            return generateToken(user._id);
        }

        throw new CustomError('Contraseña invalida.')
    }
    else{
        throw new CustomError('Usuario o contraseña invalida.')
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
