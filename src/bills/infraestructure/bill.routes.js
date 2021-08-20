const {Router} = require('express');
const router = Router();
//controller
const billController = require('./bill.controller');
const {createBillValidator, resultRegisterValidator} = require('./bill.validator');

router.post('/bill',createBillValidator,resultRegisterValidator);
router.post('/bill/pay');
