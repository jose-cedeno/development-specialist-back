const {check, validationResult} = require('express-validator');

exports.resultRegisterValidator = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(400).json({success: false, error: error})

    }
    next();
}

exports.loginValidator = [
    check('email')
        .isString()
        .withMessage("email must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Client email is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .isString()
        .withMessage("Password must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required'),
]

exports.registerValidator = [
    check('email')
        .isString()
        .withMessage("email must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Client email is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .isString()
        .withMessage("Password must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required'),
    check('document')
        .isNumeric()
        .withMessage("Document must be numeric")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Client document is required'),
    check('name')
        .isString()
        .withMessage("name must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Client name is required'),
    check('phone')
        .isString()
        .withMessage("phone must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Client phone is required')
]
