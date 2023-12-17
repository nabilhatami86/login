// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { getToken } = require('../getToken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) return res.status(401).json({ error: true, message: 'authenticate faileds' })

        const verifyToken = jwt.verify(token, config.jwtSecret)
        if (!verifyToken) return res.status(401).json({ error: true, message: 'authenticate faileds' })

        req.users = verifyToken
        next()

    } catch (error) {
        next(error)
    }
}

