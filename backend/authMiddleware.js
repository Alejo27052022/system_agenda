const jwt = require('jsonwebtoken');
const JWT_SECRET = "pato123";

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
