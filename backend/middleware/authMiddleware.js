const jwt = require('jsonwebtoken');


const JWT_SECRET = 'thee_kade';

const authMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, JWT_SECRET);

            
            const userRole = decodedToken.role || [];
            const hasRequiredRole = allowedRoles.some(role => 
                userRole.includes(role)
            );

            if (!hasRequiredRole) {
                return res.status(403).json({ 
                    message: 'Insufficient permissions. Required roles: ' + allowedRoles.join(', ')
                });
            }

            req.user = {
                username: decodedToken.username,
                roles: userRole
            };

            next();
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid token' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

module.exports = authMiddleware;