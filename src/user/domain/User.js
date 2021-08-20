const {Schema, model} = require('mongoose');
const CustomError = require('../../utils/error/CustomError');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    document: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

UserSchema.post('save', (err, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        return next(new CustomError('User already exist', 400));
    }
    next();
});

const User = model('users', UserSchema);

module.exports = User;
