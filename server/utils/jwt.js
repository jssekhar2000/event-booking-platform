const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
};

exports.verifyToken = (token) => jwt.verify(token, SECRET);
