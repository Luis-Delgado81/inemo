const jwt = require('jsonwebtoken');

const SECRET_KEY = 'inemo-secret-key-2026';

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar rol de admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin' && req.user.role !== 'editor') {
      return res.status(403).json({ error: 'Acceso denegado. Se requiere permisos de administrador.' });
    }
    next();
  });
};

module.exports = { verifyToken, verifyAdmin, SECRET_KEY };
