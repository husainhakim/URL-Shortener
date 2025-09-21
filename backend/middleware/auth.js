const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to check the JWT tokens
async function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ error: 'Invalid token' });
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}


module.exports = authenticate;
 