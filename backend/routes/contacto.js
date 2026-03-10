const express = require('express');
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Obtener configuración de contacto
router.get('/config', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [config] = await connection.query(
      'SELECT clave, valor FROM configuracion WHERE clave IN ("correo_soporte", "telefono", "direccion", "ciudad", "pais", "hora_apertura", "hora_cierre", "dias_laboral")'
    );
    connection.release();

    const configObj = {};
    config.forEach(item => {
      configObj[item.clave] = item.valor;
    });

    res.json(configObj);
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
});

// Obtener todos los mensajes de contacto (solo admin)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const connection = await pool.getConnection();
    const [contactos] = await connection.query(
      'SELECT * FROM contactos ORDER BY fecha_creacion DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [countResult] = await connection.query('SELECT COUNT(*) as total FROM contactos');
    connection.release();

    res.json({
      data: contactos,
      pagination: {
        total: countResult[0].total,
        page,
        limit,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

// Crear mensaje de contacto (público)
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO contactos (nombre, email, telefono, asunto, mensaje, leido, respondido) VALUES (?, ?, ?, ?, ?, FALSE, FALSE)',
      [nombre, email, telefono || null, asunto, mensaje]
    );
    connection.release();

    console.log('📧 Nuevo mensaje de contacto:', { id: result.insertId, nombre, email, asunto });

    res.status(201).json({
      mensaje: 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Obtener un contacto por ID
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [contactos] = await connection.query(
      'SELECT * FROM contactos WHERE id = ?',
      [req.params.id]
    );
    connection.release();

    if (contactos.length === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json(contactos[0]);
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    res.status(500).json({ error: 'Error al obtener contacto' });
  }
});

// Marcar como leído
router.put('/:id/leer', verifyAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('UPDATE contactos SET leido = TRUE WHERE id = ?', [req.params.id]);
    
    const [contactos] = await connection.query('SELECT * FROM contactos WHERE id = ?', [req.params.id]);
    connection.release();

    res.json(contactos[0]);
  } catch (error) {
    console.error('Error al marcar como leído:', error);
    res.status(500).json({ error: 'Error al actualizar contacto' });
  }
});

// Responder a un contacto
router.put('/:id/responder', verifyAdmin, async (req, res) => {
  try {
    const { respuesta } = req.body;

    if (!respuesta) {
      return res.status(400).json({ error: 'Respuesta requerida' });
    }

    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE contactos SET respondido = TRUE, respuesta = ?, respondido_por = ?, fecha_respuesta = NOW() WHERE id = ?',
      [respuesta, req.user.id, req.params.id]
    );

    const [contactos] = await connection.query('SELECT * FROM contactos WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ mensaje: 'Respuesta enviada', contacto: contactos[0] });
  } catch (error) {
    console.error('Error al responder:', error);
    res.status(500).json({ error: 'Error al responder mensaje' });
  }
});

// Eliminar contacto
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [contactos] = await connection.query('SELECT * FROM contactos WHERE id = ?', [req.params.id]);

    if (contactos.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    await connection.query('DELETE FROM contactos WHERE id = ?', [req.params.id]);
    connection.release();

    res.json({ mensaje: 'Contacto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
});

module.exports = router;
