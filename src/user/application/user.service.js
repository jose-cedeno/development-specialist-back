const User = require('../domain/User');
const response = require('../../helpers/response');
const {findAndThrow, comparePassword,generateHash} = require('../utility/userUtility');

const signup = async (req, res) => {
    try {

        const {email, password, name, document, phone} = req.body;

        findAndThrow(email);

        const hash = await generateHash(password);

        const user = new User({
            email: email,
            password: hash,
            name: name,
            document: document,
            phone: phone
        });

        await user.save();

        return res.status(201).send(response(true, user));
    } catch (e) {
        return res.status(400).send(response(false, e));
    }
}


const login = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        const token = await comparePassword(password, user);

        return res.status(200).send(
            response(true, token)
        )
    } catch (e) {
        return res.status(400).send(response(false, e));
    }

}

module.exports = {
    signup,
    login
}
