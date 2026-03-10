-- Crear base de datos
CREATE DATABASE IF NOT EXISTS inemo_db;
USE inemo_db;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  role ENUM('admin', 'editor', 'usuario') DEFAULT 'usuario',
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Noticias
CREATE TABLE IF NOT EXISTS noticias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido LONGTEXT NOT NULL,
  imagen VARCHAR(500),
  categoria VARCHAR(100) DEFAULT 'General',
  autor_id INT NOT NULL,
  estado ENUM('borrador', 'activo', 'inactivo') DEFAULT 'activo',
  vistas INT DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_estado (estado),
  INDEX idx_categoria (categoria),
  INDEX idx_fecha (fecha_creacion),
  FULLTEXT idx_busqueda (titulo, contenido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Eventos
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion LONGTEXT NOT NULL,
  fecha_evento DATE NOT NULL,
  hora_inicio TIME,
  hora_fin TIME,
  ubicacion VARCHAR(255),
  imagen VARCHAR(500),
  capacidad INT DEFAULT 100,
  asistentes INT DEFAULT 0,
  organizador_id INT NOT NULL,
  estado ENUM('proximo', 'en_curso', 'finalizado', 'cancelado') DEFAULT 'proximo',
  destacado BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizador_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_estado (estado),
  INDEX idx_fecha (fecha_evento),
  INDEX idx_destacado (destacado),
  FULLTEXT idx_busqueda (titulo, descripcion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Contactos
CREATE TABLE IF NOT EXISTS contactos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  asunto VARCHAR(255) NOT NULL,
  mensaje LONGTEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  respondido BOOLEAN DEFAULT FALSE,
  respuesta LONGTEXT,
  respondido_por INT,
  fecha_respuesta DATETIME,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_leido (leido),
  INDEX idx_respondido (respondido),
  INDEX idx_email (email),
  FOREIGN KEY (respondido_por) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Configuración
CREATE TABLE IF NOT EXISTS configuracion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clave VARCHAR(100) UNIQUE NOT NULL,
  valor LONGTEXT,
  tipo ENUM('texto', 'numero', 'json', 'booleano') DEFAULT 'texto',
  descripcion VARCHAR(255),
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar usuarios iniciales
INSERT IGNORE INTO usuarios (username, email, password, nombre, role) VALUES
('admin', 'admin@inemo.edu.co', '$2a$10$YJNVmZw2yHJGLIJzQV7D2O0Q7K5X2M8L9P3Z1w0Q5O5T5Y5.', 'Administrador INEMO', 'admin'),
('editor', 'editor@inemo.edu.co', '$2a$10$YJNVmZw2yHJGLIJzQV7D2O0Q7K5X2M8L9P3Z1w0Q5O5T5Y5.', 'Editor de Contenidos', 'editor');

-- Insertar noticias de ejemplo
INSERT IGNORE INTO noticias (titulo, contenido, imagen, categoria, autor_id, estado) VALUES
('Inauguración del nuevo laboratorio de TI', 'Se inaugura el nuevo laboratorio de tecnología de información con equipos de última generación.', 'https://via.placeholder.com/600x400?text=Laboratorio+TI', 'Infraestructura', 1, 'activo'),
('Resultados de pruebas nacionales 2026', 'Nuestros estudiantes obtienen excelentes resultados en las pruebas nacionales de este año.', 'https://via.placeholder.com/600x400?text=Resultados', 'Académica', 1, 'activo'),
('Programa de becas ampliado', 'Se amplía el programa de becas para estudiantes de insuficientes recursos económicos.', 'https://via.placeholder.com/600x400?text=Becas', 'Institucional', 2, 'activo');

-- Insertar eventos de ejemplo
INSERT IGNORE INTO eventos (titulo, descripcion, fecha_evento, hora_inicio, hora_fin, ubicacion, imagen, organizador_id, estado, destacado) VALUES
('Feria de Ciencias 2026', 'Evento donde los estudiantes presentan sus proyectos científicos. Se realizarán demostraciones, experimentos interactivos y premios para los mejores proyectos.', DATE_ADD(CURDATE(), INTERVAL 30 DAY), '09:00:00', '16:00:00', 'Auditorio Principal', 'https://via.placeholder.com/600x400?text=Feria+Ciencias', 1, 'proximo', TRUE),
('Taller de Programación Avanzada', 'Taller intensivo de 4 horas sobre programación en Python y JavaScript para estudiantes de grado 10 y 11.', DATE_ADD(CURDATE(), INTERVAL 15 DAY), '14:00:00', '18:00:00', 'Sala de Informática', 'https://via.placeholder.com/600x400?text=Programacion', 2, 'proximo', FALSE),
('Día del Deporte Interescolar', 'Competencia deportiva entre institutos de la región. Se realizarán torneos de futbol, baloncesto y voleibol.', DATE_ADD(CURDATE(), INTERVAL 45 DAY), '07:00:00', '17:00:00', 'Complejo Deportivo Los Andes', 'https://via.placeholder.com/600x400?text=Deporte', 1, 'proximo', TRUE);

-- Insertar configuración
INSERT IGNORE INTO configuracion (clave, valor, tipo, descripcion) VALUES
('correo_soporte', 'contacto@inemo.edu.co', 'texto', 'Correo de soporte del instituto'),
('telefono', '+573005678901', 'texto', 'Teléfono principal'),
('direccion', 'Cra. 45 #123-45, Malambo, Atlántico, Colombia', 'texto', 'Dirección física'),
('ciudad', 'Malambo', 'texto', 'Ciudad'),
('pais', 'Colombia', 'texto', 'País'),
('hora_apertura', '08:00', 'texto', 'Hora de apertura'),
('hora_cierre', '17:00', 'texto', 'Hora de cierre'),
('dias_laboral', 'Lunes a Viernes', 'texto', 'Días de atención'),
('fecha_fundacion', '2010', 'texto', 'Año de fundación');

-- Tabla de Línea de Tiempo
CREATE TABLE IF NOT EXISTS timeline (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ano INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion LONGTEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ano (ano)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Docentes
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar línea de tiempo de ejemplo
INSERT IGNORE INTO timeline (ano, titulo, descripcion) VALUES
(2010, 'Fundación de INEMO', 'Se funda el Instituto Enseñanza Moderna con 50 estudiantes en un local modesto.'),
(2015, 'Expansión de instalaciones', 'Se construye nuevo bloque académico y se amplía la planta docente a 30 profesores.'),
(2020, 'Transformación Digital', 'Se implementa la plataforma de educación virtual durante pandemia, alcanzando 500 estudiantes.'),
(2024, 'Acreditación de Calidad', 'INEMO obtiene certificación de calidad educativa y se posiciona como institución referente en la región.'),
(2026, 'Presente: Innovación Continua', 'Actualmente contamos con 1000 estudiantes y programa integral de educación técnica y académica.');

-- Insertar docentes de ejemplo
INSERT IGNORE INTO docentes (nombre, especialidad, email, telefono, foto) VALUES
('Dr. Juan Carlos Rodríguez', 'Ingeniería de Sistemas', 'jrodriguez@inemo.edu.co', '+57 310 1234567', 'https://via.placeholder.com/300x400?text=Juan+Carlos'),
('Mg. María Gómez López', 'Matemáticas Avanzadas', 'mgomez@inemo.edu.co', '+57 310 7654321', 'https://via.placeholder.com/300x400?text=Maria+Gomez'),
('Lic. Pedro Martínez Silva', 'Ciencias Naturales', 'pmartinez@inemo.edu.co', '+57 310 5555555', 'https://via.placeholder.com/300x400?text=Pedro+Martinez'),
('Dra. Ana Isabel Ruiz', 'Literatura y Lenguaje', 'aruiz@inemo.edu.co', '+57 310 4444444', 'https://via.placeholder.com/300x400?text=Ana+Ruiz'),
('Mag. Carlos Eduardo Villalobos', 'Historia y Ciencias Sociales', 'cvillalobos@inemo.edu.co', '+57 310 3333333', 'https://via.placeholder.com/300x400?text=Carlos+Eduardo');

SET FOREIGN_KEY_CHECKS=1;
