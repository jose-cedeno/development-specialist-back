const {check, validationResult} = require('express-validator');

exports.createValidator = [
    check('name')
        .isString()
        .withMessage("Bill name must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Bill name is required'),
    check('description')
        .isString()
        .withMessage("Description must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Description is required'),
    check('subtotal')
        .isNumeric()
        .withMessage("Subtotal must be numeric")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Subtotal is required'),
    check('buyerEmail')
        .isString()
        .withMessage("Buyer email must be string")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Buyer email is required')
]

exports.billValidator = (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        const error = result.array()[0].msg;
        return res.status(400).json({success: false, error: error})

    }
    next();
}
