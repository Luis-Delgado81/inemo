# 🎓 Portal Web INEMO - Instituto Enseñanza Moderna

Bienvenido a **INEMO**, un portal web profesional y amigable para la Fundación Instituto Enseñanza Moderna, ubicado en Malambo, Atlántico, Colombia.

## 📋 Características Principales

### 🌐 Sitio Público
- **Página de Inicio**: Presentación con carrusel de eventos y noticias destacadas
- **Sección de Noticias**: Blog con sistema de categorización y búsqueda
- **Gestión de Eventos**: Calendario interactivo con inscripción en línea
- **Acerca de INEMO**: Información sobre la misión, visión y equipo
- **Contáctenos**: Formulario de contacto y mapa interactivo de Google Maps
- **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y escritorio

### 🔐 Panel Administrativo
- **Autenticación**: Login seguro con roles (Admin/Editor)
- **CRUD de Noticias**: Crear, leer, actualizar y eliminar noticias
- **CRUD de Eventos**: Gestionar eventos, fechas e inscripción
- **Gestión de Contactos**: Ver y responder mensajes de visitantes
- **Dashboard**: Estadísticas y resumen de actividades

### 🎨 Diseño
- **Colores Corporativos**: Vinotinto (#5a1a1a) y Oro (#d4af37)
- **Interfaz Amigable**: Navegación intuitiva y clara
- **Accesibilidad**: Diseño inclusivo y de fácil uso
- **Animaciones**: Transiciones suaves y profesionales

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm (gestor de paquetes)
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)

### Pasos de Instalación

1. **Navega a la carpeta del proyecto**
```bash
cd d:\DESCARGAR\inemo
```

2. **Instala las dependencias del backend**
```bash
cd backend
npm install
```

3. **Inicia el servidor**
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

4. **Accede al portal**
- URL pública: `http://localhost:3000/`
- Panel Admin: `http://localhost:3000/frontend/admin/index.html`

## 🔑 Credenciales de Acceso (Demo)

Por defecto, el sistema incluye dos usuarios de prueba:

### Usuario Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123` (o ver archivo users.json)
- **Rol**: Acceso total a todas las funciones

### Usuario Editor
- **Usuario**: `editor`
- **Contraseña**: `editor123`
- **Rol**: Puede crear y editar contenido (sin acceso a configuración)

## 📁 Estructura de Carpetas

```
inemo/
├── backend/                    # Servidor Node.js + Express
│   ├── server.js              # Archivo principal del servidor
│   ├── package.json           # Dependencias del proyecto
│   ├── routes/                # Rutas de la API
│   │   ├── auth.js           # Autenticación y login
│   │   ├── noticias.js       # API de noticias
│   │   ├── eventos.js        # API de eventos
│   │   └── contacto.js       # API de contactos
│   ├── middleware/            # Middlewares personalizados
│   │   └── auth.js           # Verificación de tokens JWT
│   ├── controllers/           # Lógica de negocio (estructura lista)
│   └── database/              # Datos en JSON
│       ├── users.json        # Base de datos de usuarios
│       ├── noticias.json     # Base de datos de noticias
│       ├── eventos.json      # Base de datos de eventos
│       └── contactos.json    # Mensajes de contacto
│
├── frontend/                   # Cliente web (HTML/CSS/JS)
│   ├── index.html            # Página principal (debe ser accesible)
│   ├── css/
│   │   └── styles.css        # Estilos globales con variables CSS
│   ├── js/
│   │   └── app.js            # Funciones compartidas y utilidades
│   ├── pages/                # Páginas del sitio público
│   │   ├── index.html        # Página de inicio
│   │   ├── noticias.html     # Lista de noticias
│   │   ├── eventos.html      # Lista de eventos
│   │   ├── nosotros.html     # Acerca de INEMO
│   │   ├── contacto.html     # Formulario de contacto con mapa
│   │   └── login.html        # Página de login
│   ├── admin/                # Panel administrativo (protegido)
│   │   ├── index.html        # Dashboard del admin
│   │   ├── noticias.html     # Gestor de noticias
│   │   ├── eventos.html      # Gestor de eventos
│   │   └── contactos.html    # Ver mensajes de contacto
│   └── assets/               # Recursos (imágenes, iconos)
│       ├── images/           # Carpeta para imágenes
│       └── icons/            # Carpeta para iconos
│
└── README.md                  # Este archivo
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/verify` - Verificar token

### Noticias
- `GET /api/noticias` - Obtener todas las noticias
- `GET /api/noticias/:id` - Obtener noticia por ID
- `POST /api/noticias` - Crear noticia (requiere auth)
- `PUT /api/noticias/:id` - Actualizar noticia (requiere auth)
- `DELETE /api/noticias/:id` - Eliminar noticia (requiere auth)

### Eventos
- `GET /api/eventos` - Obtener todos los eventos
- `GET /api/eventos/:id` - Obtener evento por ID
- `POST /api/eventos` - Crear evento (requiere auth)
- `PUT /api/eventos/:id` - Actualizar evento (requiere auth)
- `DELETE /api/eventos/:id` - Eliminar evento (requiere auth)
- `POST /api/eventos/:id/inscribirse` - Inscribirse a evento

### Contacto
- `GET /api/contacto/config` - Obtener información de contacto
- `GET /api/contacto` - Obtener mensajes (requiere auth)
- `POST /api/contacto` - Crear mensaje de contacto
- `PUT /api/contacto/:id/leer` - Marcar como leído (requiere auth)
- `DELETE /api/contacto/:id` - Eliminar mensaje (requiere auth)

## 🎨 Personalización

### Colores Corporativos
Los colores se encuentran definidos en `frontend/css/styles.css`:

```css
:root {
  --vinotinto: #5a1a1a;
  --vinotinto-claro: #8b2e2e;
  --vinotinto-oscuro: #3d1111;
  --oro: #d4af37;
  --oro-claro: #e6c957;
  --oro-oscuro: #b8941e;
}
```

### Información de Contacto
Edita `backend/database/contactos.json` para actualizar:
- Dirección
- Teléfono
- Correo electrónico
- Horario de atención
- Coordenadas del mapa

### Usuarios
Edita `backend/database/users.json` para:
- Agregar nuevos usuarios
- Cambiar roles
- Actualizar información

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticación por tokens
- **JSON** - Base de datos simple

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos y responsividad
- **JavaScript (ES6)** - Interactividad
- **Google Maps API** - Mapa interactivo (embebido)

## 📝 Notas Importantes

1. **Base de Datos**: El sistema utiliza archivos JSON para almacenamiento. En producción, se recomienda usar una base de datos real (MongoDB, PostgreSQL, etc.)

2. **Seguridad**: 
   - Las contraseñas en el archivo JSON son de demostración. En producción, usar bcrypt
   - Implementar HTTPS
   - Validar datos de entrada en lugar de confiar en el cliente

3. **Mapa Google Maps**: 
   - Actualmente utiliza un iframe embebido
   - Para funcionalidad completa, obtener una clave API de Google Maps

4. **Email**: 
   - El sistema permite envío de mensajes pero no envía emails automáticos
   - Implementar un servicio de email (SendGrid, Nodemailer, etc.)

5. **CORS**: 
   - El servidor permite CORS desde cualquier origen
   - En producción, restriccionar orígenes permitidos

## 🚢 Deployment

Para desplegar en producción:

1. Usar un servicio de hosting (Heroku, Vercel, AWS, DigitalOcean)
2. Configurar variables de entorno
3. Usar base de datos productiva
4. Implementar HTTPS
5. Configurar dominio personalizado

## 🤝 Contribución

Para mejorar el portal:
1. Reportar bugs
2. Sugerir features
3. Mejorar documentación
4. Optimizar código

## 📞 Soporte

Para preguntas o soporte técnico:
- Email: contacto@inemo.edu.co
- Teléfono: +57 300 567 8901
- Ubicación: Malambo, Atlántico, Colombia

## 📄 Licencia

Copyright © 2026 INEMO - Instituto Enseñanza Moderna. Todos los derechos reservados.

---

**Última actualización**: Marzo 2026

Hecho con ❤️ para INEMO - Instituto Enseñanza Moderna
