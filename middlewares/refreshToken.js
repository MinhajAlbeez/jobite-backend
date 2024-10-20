const jwt = require('jsonwebtoken');

const refreshTokenMiddleware = (req, res, next) => {
    const refreshToken = req.body.token; 

    if (!refreshToken) {
        return res.status(401).json({ message: "Access denied. No refresh token provided." });
    }

    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET); 
        req.user = verified.userId; 
        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Refresh token has expired." });
        }
        res.status(400).json({ message: "Invalid refresh token" });
    }
};

module.exports = refreshTokenMiddleware;
