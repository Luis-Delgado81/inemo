const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const pool = require('../config/database');
const { verifyAdmin } = require('../middleware/auth');

const uploadDir = path.join(__dirname, '../../frontend/assets/images/docentes');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const nombreUnico = `docente-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, nombreUnico);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Solo se permiten archivos de imagen'));
        }
        cb(null, true);
    }
});

// POST subir foto de docente
router.post('/upload', verifyAdmin, (req, res) => {
    upload.single('foto')(req, res, (err) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });
        res.json({ url: `/frontend/assets/images/docentes/${req.file.filename}` });
    });
});

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
