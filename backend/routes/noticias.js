const express = require('express');
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener todas las noticias (paginadas)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();
    const [noticias] = await connection.query(
      'SELECT * FROM noticias WHERE estado = "activo" ORDER BY fecha_creacion DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [countResult] = await connection.query(
      'SELECT COUNT(*) as total FROM noticias WHERE estado = "activo"'
    );

    connection.release();

    res.json({
      data: noticias,
      pagination: {
        total: countResult[0].total,
        page,
        limit,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
});

// Obtener una noticia por ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [noticias] = await connection.query(
      'SELECT * FROM noticias WHERE id = ? AND estado = "activo"',
      [req.params.id]
    );
    connection.release();

    if (noticias.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    res.json(noticias[0]);
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    res.status(500).json({ error: 'Error al obtener noticia' });
  }
});

// Crear noticia (solo admin/editor)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { titulo, contenido, imagen, categoria } = req.body;

    if (!titulo || !contenido) {
      return res.status(400).json({ error: 'Título y contenido requeridos' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO noticias (titulo, contenido, imagen, categoria, autor_id, estado) VALUES (?, ?, ?, ?, ?, "activo")',
      [titulo, contenido, imagen || 'https://via.placeholder.com/600x400?text=Noticia', categoria || 'General', req.user.id]
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      titulo,
      contenido,
      imagen: imagen || 'https://via.placeholder.com/600x400?text=Noticia',
      categoria: categoria || 'General',
      autor_id: req.user.id,
      estado: 'activo',
      mensaje: 'Noticia creada exitosamente'
    });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({ error: 'Error al crear noticia' });
  }
});

// Actualizar noticia
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { titulo, contenido, imagen, categoria, estado } = req.body;
    const connection = await pool.getConnection();

    const [noticias] = await connection.query(
      'SELECT * FROM noticias WHERE id = ?',
      [req.params.id]
    );

    if (noticias.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    const updateData = {
      titulo: titulo || noticias[0].titulo,
      contenido: contenido || noticias[0].contenido,
      imagen: imagen || noticias[0].imagen,
      categoria: categoria || noticias[0].categoria,
      estado: estado || noticias[0].estado
    };

    await connection.query(
      'UPDATE noticias SET titulo = ?, contenido = ?, imagen = ?, categoria = ?, estado = ? WHERE id = ?',
      [updateData.titulo, updateData.contenido, updateData.imagen, updateData.categoria, updateData.estado, req.params.id]
    );

    connection.release();
    res.json({ ...updateData, id: req.params.id, mensaje: 'Noticia actualizada' });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    res.status(500).json({ error: 'Error al actualizar noticia' });
  }
});

// Eliminar noticia
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [noticias] = await connection.query(
      'SELECT * FROM noticias WHERE id = ?',
      [req.params.id]
    );

    if (noticias.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    await connection.query('DELETE FROM noticias WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ mensaje: 'Noticia eliminada exitosamente', noticia: noticias[0] });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    res.status(500).json({ error: 'Error al eliminar noticia' });
  }
});

module.exports = router;
