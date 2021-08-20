const User = require("../../user/domain/User");
const CustomError = require("../../utils/error/CustomError");

const verifyUsers = async (buyer, seller) => {
    const userBuyer = await User.findOne({email: buyer});
    const userSeller = await User.findOne({email: seller});

    if (userBuyer === null || userSeller === null) {
        throw new CustomError('No existe el comprador o el vendedor en la base de datos.')
    }
}

const validateUserLogged = (buyerId, userBuyer) => {
    if (buyerId !== userBuyer._id) {
        throw new CustomError("El usuario logeado no coincide con el usuario que va a pagar la factura.")

    }
}

const validateBuyerBalance = (bill, userBuyer) => {
    if (bill.total > userBuyer.balance) {
        throw new CustomError("El usuario pagador no tiene capital para realizar el pago.");
    }
}
module.exports = {
    verifyUsers,
    validateUserLogged,
    validateBuyerBalance
}
