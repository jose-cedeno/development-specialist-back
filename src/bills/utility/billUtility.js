const User = require("../../user/domain/User");
const CustomError = require("../../utils/error/CustomError");

const verifyUsers = async (buyer) => {
    const userBuyer = await User.findOne({email: buyer});

    if (userBuyer === null) {
        throw new CustomError('No existe el comprador en la base de datos.');
    }
}


const validateBill = bill => {
    if (bill === null) {
        throw new CustomError('No existe la factura.');
    }else{
        if (bill.paid === true){
            throw new CustomError('La factura ya se encuentra pagada.');
        }
    }
}
const validateUserLogged = (buyerId, userBuyer) => {

    if (buyerId !== userBuyer) {

        console.log(buyerId !== userBuyer);
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
    validateBuyerBalance,
    validateBill
}
