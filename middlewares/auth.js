const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Expecting "Bearer <token>"
    if (!token) return res.status(401).send("Access denied: No token provided");

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Access denied: Invalid token");
    }
};

module.exports = { verifyToken };