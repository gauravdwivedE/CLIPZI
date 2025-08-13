const jwt = require('jsonwebtoken');

module.exports.genToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '2d'});
} 