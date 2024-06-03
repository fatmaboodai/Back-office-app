const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, 'mykeyFatma', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Attach decoded manager information to request object
        req.manager = decoded;
        next(); // Move to the next middleware or route handler
    });
};

module.exports = verifyToken;
