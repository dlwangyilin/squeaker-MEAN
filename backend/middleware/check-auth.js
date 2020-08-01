require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // authorization: "Bearer
    try {
        const token = req.headers.authorization.split(' ')[1];  // extract token
        const decodedToken = jwt.verify(token, process.env.PRIVATE_SECRET_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId};  // As we add them when generating tokens.
        next();
    } catch (e) {
        res.status(401).json({
            message: "You are not authenticated"
        });
    }
};
