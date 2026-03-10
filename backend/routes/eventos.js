const express = require('express');
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener todos los eventos (con filtros)
router.get('/', async (req, res) => {
  try {
    const estado = req.query.estado || 'proximo';
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();
    let query = 'SELECT * FROM eventos';
    const params = [];

    if (estado !== 'todos') {
      query += ' WHERE estado = ?';
      params.push(estado);
    }

    query += ' ORDER BY fecha_evento ASC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [eventos] = await connection.query(query, params);

    const [countResult] = await connection.query(
      'SELECT COUNT(*) as total FROM eventos' + (estado !== 'todos' ? ' WHERE estado = ?' : ''),
      estado !== 'todos' ? [estado] : []
    );

    connection.release();

    res.json({
      data: eventos,
      pagination: {
        total: countResult[0].total,
        page,
        limit,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// Obtener evento destacado
router.get('/destacado', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [evento] = await connection.query(
      'SELECT * FROM eventos WHERE destacado = TRUE AND estado = "proximo" LIMIT 1'
    );
    connection.release();

    if (evento.length === 0) {
      return res.status(404).json({ error: 'No hay evento destacado' });
    }

    res.json(evento[0]);
  } catch (error) {
    console.error('Error al obtener evento destacado:', error);
    res.status(500).json({ error: 'Error al obtener evento' });
  }
});

// Obtener un evento por ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [eventos] = await connection.query(
      'SELECT * FROM eventos WHERE id = ?',
      [req.params.id]
    );
    connection.release();

    if (eventos.length === 0) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json(eventos[0]);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    res.status(500).json({ error: 'Error al obtener evento' });
  }
});

// Crear evento (solo admin/editor)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, fecha_evento, hora_inicio, hora_fin, ubicacion, imagen, capacidad, estado, destacado } = req.body;

    if (!titulo || !fecha_evento) {
      return res.status(400).json({ error: 'Título y fecha son requeridos' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO eventos (titulo, descripcion, fecha_evento, hora_inicio, hora_fin, ubicacion, imagen, capacidad, organizador_id, estado, destacado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        titulo,
        descripcion || '',
        fecha_evento,
        hora_inicio || '10:00:00',
        hora_fin || '12:00:00',
        ubicacion || 'INEMO, Malambo',
        imagen || 'https://via.placeholder.com/600x400?text=Evento',
        capacidad || 100,
        req.user.id,
        estado || 'proximo',
        destacado || false
      ]
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      titulo,
      descripcion,
      fecha_evento,
      hora_inicio,
      hora_fin,
      ubicacion,
      imagen,
      capacidad,
      estado: estado || 'proximo',
      destacado: destacado || false,
      mensaje: 'Evento creado exitosamente'
    });
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

// Actualizar evento
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, fecha_evento, hora_inicio, hora_fin, ubicacion, imagen, capacidad, estado, destacado } = req.body;
    const connection = await pool.getConnection();

    const [eventos] = await connection.query('SELECT * FROM eventos WHERE id = ?', [req.params.id]);

    if (eventos.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    const evento = eventos[0];
    const updates = {
      titulo: titulo || evento.titulo,
      descripcion: descripcion !== undefined ? descripcion : evento.descripcion,
      fecha_evento: fecha_evento || evento.fecha_evento,
      hora_inicio: hora_inicio || evento.hora_inicio,
      hora_fin: hora_fin || evento.hora_fin,
      ubicacion: ubicacion || evento.ubicacion,
      imagen: imagen || evento.imagen,
      capacidad: capacidad || evento.capacidad,
      estado: estado || evento.estado,
      destacado: destacado !== undefined ? destacado : evento.destacado
    };

    await connection.query(
      'UPDATE eventos SET titulo = ?, descripcion = ?, fecha_evento = ?, hora_inicio = ?, hora_fin = ?, ubicacion = ?, imagen = ?, capacidad = ?, estado = ?, destacado = ? WHERE id = ?',
      [updates.titulo, updates.descripcion, updates.fecha_evento, updates.hora_inicio, updates.hora_fin, updates.ubicacion, updates.imagen, updates.capacidad, updates.estado, updates.destacado, req.params.id]
    );

    connection.release();
    res.json({ ...updates, id: req.params.id, mensaje: 'Evento actualizado' });
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ error: 'Error al actualizar evento' });
  }
});

// Eliminar evento
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [eventos] = await connection.query('SELECT * FROM eventos WHERE id = ?', [req.params.id]);

    if (eventos.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await connection.query('DELETE FROM eventos WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ mensaje: 'Evento eliminado exitosamente', evento: eventos[0] });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
});

module.exports = router;
