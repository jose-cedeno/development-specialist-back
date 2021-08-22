const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let bearerToken = req.header('authorization');

        bearerToken = bearerToken.split(' ');

        if (bearerToken.length < 2) {
            return res.status(403).send("Access denied.")
        }

        const decoded = jwt.verify(bearerToken[1], process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({status: false, data: "Invalid token"});
    }
};
