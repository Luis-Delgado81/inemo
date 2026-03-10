const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'inemo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Verificar conexión
pool.getConnection()
  .then((conn) => {
    console.log('✓ Conectado a MySQL');
    conn.release();
  })
  .catch((err) => {
    console.error('✗ Error de conexión a MySQL:', err.message);
  });

module.exports = pool;
