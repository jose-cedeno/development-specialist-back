const {Router} = require('express');
const router = Router();
//controller
const userController = require('./user.controller');
const {registerValidator,resultRegisterValidator} = require ('./user.validator');


router.post('/signup',registerValidator,resultRegisterValidator, userController.signup);
router.post('/login',userController.login)

module.exports = router;
