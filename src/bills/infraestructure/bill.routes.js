const {Router} = require('express');
const router = Router();
//controller
const billController = require('./bill.controller');
const {createValidator, billValidator} = require('./bill.validator');
const auth = require('../../middleware/auth/auth.middleware');

router.post('/bill', auth, createValidator, billValidator, billController.createBill);
router.get('/bill/pay/:billId', auth,billController.payBill);

module.exports = router;
