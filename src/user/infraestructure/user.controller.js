const service = require('../application/user.service');

const signup = async (req, res) => {
    try {

        return await service.signup(req, res);

    } catch (e) {

        return res.status(400).send(e);

    }

}

const login = async (req, res) => {
    try {

        return await service.login(req, res);

    } catch (e) {

        return res.status(400).send(e);
    }
}

module.exports = {
    signup, login
}
