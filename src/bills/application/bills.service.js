const Bill = require('../domain/Bills');
const response = require("../../utils/response");
const User = require("../../user/domain/User");
const {validateBuyerBalance} = require("../utility/billUtility");
const {verifyUsers, validateUserLogged, validateBill} = require("../utility/billUtility");

const createBill = async (req, res) => {
    try {
        const {name, description, subtotal, discount, buyerEmail} = req.body;

        const id = req.user.id;

        let sellerEmail = await User.findOne({_id: id});

        sellerEmail = sellerEmail.email;

        const aux = Math.floor(subtotal * discount) / 100;

        const total = subtotal - aux;

        await verifyUsers(buyerEmail);

        const bill = new Bill(
            {
                name,
                description,
                subtotal,
                discount,
                total,
                sellerEmail,
                buyerEmail
            }
        );

        await bill.save();

        return res.status(201).send(response(true, bill));
    } catch (e) {
        return res.status(500).send(response(false, e));
    }
}

const payBill = async (req, res) => {

    try {

        const buyerId = req.user.id;


        const bill = await Bill.findOne({_id: req.params.billId});

        console.log(bill)

        validateBill(bill);

        const userSeller = await User.findOne({email: bill.sellerEmail});

        const userBuyer = await User.findOne({_id: buyerId});


        const buyerIdQuery = userBuyer.id.toString();

        validateUserLogged(buyerId, buyerIdQuery);

        await verifyUsers(bill.buyerEmail, bill.sellerEmail);

        validateBuyerBalance(bill, userBuyer);

        userBuyer.balance -= bill.total;
        userSeller.balance += bill.total;
        bill.paid = true;

        await userBuyer.save();
        await userSeller.save();
        await bill.save();

        return res.status(200).send(response(true, bill));
    } catch (e) {
        return res.status(500).send(response(false, e));
    }
}

module.exports = {
    createBill,
    payBill
}
