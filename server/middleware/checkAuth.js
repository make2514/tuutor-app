const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req.userData = jwt.verify(token, 'key');
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
