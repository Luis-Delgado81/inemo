const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Importar base de datos para verificar conexión
const pool = require('./config/database');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Rutas de API
const authRoutes = require('./routes/auth');
const noticiasRoutes = require('./routes/noticias');
const eventosRoutes = require('./routes/eventos');
const contactoRoutes = require('./routes/contacto');
const timelineRoutes = require('./routes/timeline');
const docentesRoutes = require('./routes/docentes');
const usuariosRoutes = require('./routes/usuarios');

// Usar rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Servir SPA - Redirigir todas las rutas no coincidentes al index.html
app.get('*', (req, res) => {
  // No servir archivos estáticos de rutas específicas
  if (req.path.includes('.') && !req.path.includes('/api/')) {
    return res.status(404).send('Not found');
  }
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error en el servidor',
    message: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🎓 Servidor INEMO                    ║
║  Ejecutándose en http://localhost:${PORT}  ║
║  Ambiente: ${process.env.NODE_ENV || 'development'}            ║
╚════════════════════════════════════════╝
  `);
});
