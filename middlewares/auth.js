const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users'); // Assuming you have a User model

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await UserModel.findById(verified.id);
        if (!user) {
            return res.status(401).json({ message: "Access denied. User not found." });
        }

        req.user = user; // Attach the user object to req.user for further use
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        const message = error.name === 'TokenExpiredError' ? "Token has expired." : "Invalid token.";
        return res.status(401).json({ message });
    }
};

module.exports = auth;
