const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

// GET all docentes
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM docentes ORDER BY nombre ASC');
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single docente
router.get('/:id', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM docentes WHERE id = ?', [req.params.id]);
        if (results.length === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { nombre, especialidad, email, telefono, foto } = req.body;
        if (!nombre || !especialidad || !email) return res.status(400).json({ error: 'Faltan campos' });
        
        const [results] = await pool.query('INSERT INTO docentes (nombre, especialidad, email, telefono, foto) VALUES (?, ?, ?, ?, ?)',
            [nombre, especialidad, email, telefono || '', foto || 'https://via.placeholder.com/300x400?text=Docente']
        );
        res.json({ success: true, id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const { nombre, especialidad, email, telefono, foto } = req.body;
        await pool.query('UPDATE docentes SET nombre = ?, especialidad = ?, email = ?, telefono = ?, foto = ? WHERE id = ?',
            [nombre, especialidad, email, telefono || '', foto || 'https://via.placeholder.com/300x400?text=Docente', req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await pool.query('DELETE FROM docentes WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
