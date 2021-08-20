const {Schema, model} = require('mongoose');

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
        default: 10
    }
});

UserSchema.post('save', (err, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        return next({message:"User Already exist. Another account have the same email, document or phone.'"});
    }
    else if (err.name==='MongoError') {
        return next({message:"Error al crear el cliente"});
    }
    next();
});

const User = model('users', UserSchema);

module.exports = User;
