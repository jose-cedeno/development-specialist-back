const {Schema, model} = require('mongoose');
const BillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    buyerEmail: {
        type: String,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false
    }
});


BillSchema.post('save', (err, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        return next({message:"Bill Already exist"});
    }
    else if (err.name==='MongoError') {
        return next({message:"Error al crear la factura"});
    }
    next();
});

const Bill = model('bills', BillSchema);

module.exports = Bill;
