const pool = require('./backend/config/database');

async function initDatabase() {
    try {
        console.log('Inicializando tablas timeline y docentes...');

        // Crear tabla timeline
        await pool.query(`
            CREATE TABLE IF NOT EXISTS timeline (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ano INT NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                descripcion LONGTEXT NOT NULL,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_ano (ano)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ Tabla timeline creada');

        // Crear tabla docentes
        await pool.query(`
            CREATE TABLE IF NOT EXISTS docentes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                especialidad VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                telefono VARCHAR(20),
                foto VARCHAR(500),
                biografia LONGTEXT,
                estado ENUM('activo', 'inactivo') DEFAULT 'activo',
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_estado (estado),
                INDEX idx_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('✓ Tabla docentes creada');

        // Insertar datos en timeline
        await pool.query(`
            INSERT IGNORE INTO timeline (ano, titulo, descripcion) VALUES
            (2010, 'Fundación de INEMO', 'Se funda el Instituto Enseñanza Moderna con 50 estudiantes en un local modesto.'),
            (2015, 'Expansión de instalaciones', 'Se construye nuevo bloque académico y se amplía la planta docente a 30 profesores.'),
            (2020, 'Transformación Digital', 'Se implementa la plataforma de educación virtual durante pandemia, alcanzando 500 estudiantes.'),
            (2024, 'Acreditación de Calidad', 'INEMO obtiene certificación de calidad educativa y se posiciona como institución referente en la región.'),
            (2026, 'Presente: Innovación Continua', 'Actualmente contamos con 1000 estudiantes y programa integral de educación técnica y académica.')
        `);
        console.log('✓ Datos de timeline insertados');

        // Insertar datos en docentes
        await pool.query(`
            INSERT IGNORE INTO docentes (nombre, especialidad, email, telefono, foto) VALUES
            ('Dr. Juan Carlos Rodríguez', 'Ingeniería de Sistemas', 'jrodriguez@inemo.edu.co', '+57 310 1234567', 'https://via.placeholder.com/300x400?text=Juan+Carlos'),
            ('Mg. María Gómez López', 'Matemáticas Avanzadas', 'mgomez@inemo.edu.co', '+57 310 7654321', 'https://via.placeholder.com/300x400?text=Maria+Gomez'),
            ('Lic. Pedro Martínez Silva', 'Ciencias Naturales', 'pmartinez@inemo.edu.co', '+57 310 5555555', 'https://via.placeholder.com/300x400?text=Pedro+Martinez'),
            ('Dra. Ana Isabel Ruiz', 'Literatura y Lenguaje', 'aruiz@inemo.edu.co', '+57 310 4444444', 'https://via.placeholder.com/300x400?text=Ana+Ruiz'),
            ('Mag. Carlos Eduardo Villalobos', 'Historia y Ciencias Sociales', 'cvillalobos@inemo.edu.co', '+57 310 3333333', 'https://via.placeholder.com/300x400?text=Carlos+Eduardo')
        `);
        console.log('✓ Datos de docentes insertados');

        console.log('✅ Base de datos inicializada correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

initDatabase();
