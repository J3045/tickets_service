// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user ID to request object
        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (error) {
        res.status(400).json({ message: 'Token is not valid', error });
    }
};

module.exports = authMiddleware;
