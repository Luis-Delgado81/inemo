const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

// GET all timeline
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM timeline ORDER BY ano ASC');
        res.json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single timeline
router.get('/:id', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM timeline WHERE id = ?', [req.params.id]);
        if (results.length === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { ano, titulo, descripcion } = req.body;
        if (!ano || !titulo || !descripcion) return res.status(400).json({ error: 'Faltan campos' });
        
        const [results] = await pool.query('INSERT INTO timeline (ano, titulo, descripcion) VALUES (?, ?, ?)',
            [ano, titulo, descripcion]
        );
        res.json({ success: true, id: results.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const { ano, titulo, descripcion } = req.body;
        await pool.query('UPDATE timeline SET ano = ?, titulo = ?, descripcion = ? WHERE id = ?',
            [ano, titulo, descripcion, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await pool.query('DELETE FROM timeline WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
