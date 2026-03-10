const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');

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

// Middleware para verificar que es admin (solo admin puede crear usuarios)
const verifyAdminOnly = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Solo administradores pueden crear usuarios' });
    }
    next();
  });
};

// Obtener todos los usuarios (solo admin)
router.get('/', verifyAdminOnly, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [usuarios] = await connection.query(
      'SELECT id, username, email, nombre, role, fecha_creacion, estado FROM usuarios ORDER BY fecha_creacion DESC'
    );
    connection.release();
    res.json({ data: usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID (solo admin)
router.get('/:id', verifyAdminOnly, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [usuarios] = await connection.query('SELECT id, username, email, nombre, role, estado FROM usuarios WHERE id = ?', [req.params.id]);
    connection.release();
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuarios[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

// Crear usuario (solo admin)
router.post('/', verifyAdminOnly, async (req, res) => {
  try {
    const { username, email, password, nombre, role } = req.body;

    if (!username || !email || !password || !nombre || !role) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Validar que el rol sea válido
    if (!['admin', 'editor', 'usuario'].includes(role)) {
      return res.status(400).json({ error: 'Rol inválido. Debe ser admin, editor o usuario' });
    }

    const connection = await pool.getConnection();

    // Verificar si usuario ya existe
    const [existentes] = await connection.query('SELECT id FROM usuarios WHERE username = ? OR email = ?', [username, email]);
    if (existentes.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'Usuario o email ya existe' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const [result] = await connection.query(
      'INSERT INTO usuarios (username, email, password, nombre, role, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, nombre, role, 'activo']
    );

    connection.release();

    res.status(201).json({
      id: result.insertId,
      username,
      email,
      nombre,
      role,
      estado: 'activo',
      mensaje: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Actualizar usuario (solo admin)
router.put('/:id', verifyAdminOnly, async (req, res) => {
  try {
    const { nombre, email, role, estado } = req.body;
    const connection = await pool.getConnection();

    const [usuarios] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);

    if (usuarios.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];

    // No permitir cambiar username o email si ya existen para otros usuarios
    if (email && email !== usuario.email) {
      const [duplicado] = await connection.query('SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, req.params.id]);
      if (duplicado.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'Email ya está en uso' });
      }
    }

    const updates = {
      nombre: nombre || usuario.nombre,
      email: email || usuario.email,
      role: role || usuario.role,
      estado: estado || usuario.estado
    };

    await connection.query(
      'UPDATE usuarios SET nombre = ?, email = ?, role = ?, estado = ? WHERE id = ?',
      [updates.nombre, updates.email, updates.role, updates.estado, req.params.id]
    );

    connection.release();
    res.json({ ...updates, id: req.params.id, mensaje: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario (solo admin)
router.delete('/:id', verifyAdminOnly, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // No permitir eliminar al usuario que hace la solicitud
    if (parseInt(req.params.id) === req.user.id) {
      connection.release();
      return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });
    }

    const [usuarios] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);

    if (usuarios.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await connection.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ mensaje: 'Usuario eliminado exitosamente', usuario: usuarios[0] });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
