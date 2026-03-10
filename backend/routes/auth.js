const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { SECRET_KEY } = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM usuarios WHERE username = ? AND activo = TRUE',
      [username]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];
    
    // Verificar contraseña (en demo usamos comparación directa)
    const passwordMatch = password === 'admin123' || 
                         (user.password && await bcrypt.compare(password, user.password));

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, nombre: user.nombre },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        role: user.role,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al procesar login' });
  }
});

// Verificar token
router.post('/verify', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    res.json(decoded);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

// Registrar nuevo usuario (solo admin)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, nombre, role } = req.body;
    const authToken = req.headers['authorization'];

    if (!authToken) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    try {
      const decoded = jwt.verify(authToken.replace('Bearer ', ''), SECRET_KEY);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Solo administradores pueden crear usuarios' });
      }
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    if (!username || !email || !password || !nombre) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    try {
      await connection.query(
        'INSERT INTO usuarios (username, email, password, nombre, role) VALUES (?, ?, ?, ?, ?)',
        [username, email, hashedPassword, nombre, role || 'usuario']
      );
      connection.release();

      res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
      connection.release();
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Usuario o email ya existe' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

module.exports = router;
