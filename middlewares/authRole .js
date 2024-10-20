const authRole = (allowedRoles) => (req, res, next) => {
    try {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access forbidden. Insufficient permissions." });
        }
        
        next(); // Proceed if the role is allowed
    } catch (error) {
        console.error('Role Authorization Error:', error);
        return res.status(400).json({ message: "Authorization error" });
    }
};

module.exports = authRole;
