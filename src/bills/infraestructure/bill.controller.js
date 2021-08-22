const service = require('../application/bills.service');

const createBill = async (req, res) => {
    try {
        return service.createBill(req, res);
    } catch (e) {
        console.log('entro')
        return res.status(500).send(e);
    }
}

const payBill = async (req, res) => {
    try {
        return service.payBill(req, res);
    } catch (e) {
        return res.status(500).send(e);
    }
}


module.exports = {
    createBill, payBill
}
