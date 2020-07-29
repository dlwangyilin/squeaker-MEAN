require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // authorization: "Bearer
    try {
        const token = req.headers.authorization.split(' ')[1];  // extract token
        jwt.verify(token, process.env.PRIVATE_SECRET_KEY);
        next();
    } catch (e) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }



};
