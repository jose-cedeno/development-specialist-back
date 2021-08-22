const CustomError = require('../error/CustomError');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'epayco.suscripciones@gmail.com',
        pass: 'Payco123*'
    }
});

const mailOptions = (email, token, amount) => {
    return ({
        from: 'epayco.suscripciones@gmail.com',
        to: email,
        subject: 'Link de pago enviado',
        text: `La url para realizar su pago por el monto ${amount} lo puede realizar por el siguiente link: http://localhost:3001/${token}`
    });
}

const sendMail = (email, token, amount) => {

    transporter.sendMail(mailOptions(email, token, amount), (err, info) => {
        if (err) {
            throw new CustomError(500, err.message);
        }
    });
}

module.exports = {
    sendMail
}
