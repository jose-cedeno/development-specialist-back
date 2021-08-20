const ObjectId = require('mongodb').ObjectId;

const Bill = require('../domain/Bills');
const response = require("../../utils/response");
const User = require("../../user/domain/User");
const {validateBuyerBalance} = require("../utility/billUtility");
const {verifyUsers, validateUserLogged} = require("../utility/billUtility");

const createBill = async (req, res) => {
    try {
        const {name, description, subtotal, discount, sellerEmail, buyerEmail} = req.body;

        const aux = Math.floor(subtotal * discount) / 100;

        const total = subtotal - aux;


        await verifyUsers(buyerEmail, sellerEmail);

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
        return res.status(400).send(response(false, e));
    }
}

const payBill = async (req, res) => {

    try {
        const {billId, buyerId} = req.body;

        const bill = await Bill.findOne({_id: new ObjectId(billId)});

        const userSeller = await User.findOne({email: bill.sellerEmail});

        const userBuyer = await User.findOne({email: bill.buyerEmail});


        validateUserLogged(buyerId, userBuyer);

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
        return res.status(400).send(response(false, e));
    }
}

module.exports = {
    createBill,
    payBill
}
