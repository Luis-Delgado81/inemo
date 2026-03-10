# 📁 Estructura del Proyecto INEMO

```
d:\DESCARGAR\inemo/
│
├── 📄 index.html                 # Página principal (raíz)
├── 📄 README.md                  # Documentación completa
├── 📄 GUIA_RAPIDA.md             # Guía de 5 minutos
├── 📄 ESTRUCTURA.md              # Este archivo
├── 📄 .gitignore                 # Archivos a ignorar en Git
├── 📄 .env.example               # Variables de entorno
├── 🎯 start.bat                  # Script de inicio (Windows)
├── 🎯 start.sh                   # Script de inicio (Linux/Mac)
│
├── 📂 backend/                   # SERVIDOR NODE.JS
│   ├── 📄 server.js              # Archivo principal del servidor
│   ├── 📄 package.json           # Dependencias de npm
│   │
│   ├── 📂 routes/                # Rutas de la API REST
│   │   ├── auth.js               # POST /api/auth/login
│   │   ├── noticias.js           # CRUD /api/noticias
│   │   ├── eventos.js            # CRUD /api/eventos
│   │   └── contacto.js           # CRUD /api/contacto
│   │
│   ├── 📂 middleware/            # Funciones intermedias
│   │   └── auth.js               # Verificación de JWT
│   │
│   ├── 📂 controllers/           # Lógica de negocio (estructura)
│   │   └── (controllers futuros)
│   │
│   └── 📂 database/              # Base de datos JSON
│       ├── users.json            # Usuarios (admin, editor)
│       ├── noticias.json         # Noticias publicadas
│       ├── eventos.json          # Eventos del portal
│       └── contactos.json        # Mensajes de contacto
│
├── 📂 frontend/                  # CLIENTE WEB
│   ├── 📄 index.html             # Acceso desde raíz (/)
│   │
│   ├── 📂 css/
│   │   └── styles.css            # Estilos globales
│   │                              # - Colores vinotinto y oro
│   │                              # - Responsivo (mobile first)
│   │                              # - Transiciones y animaciones
│   │
│   ├── 📂 js/
│   │   └── app.js                # Funciones compartidas
│   │                              # - Conexión a API
│   │                              # - Autenticación
│   │                              # - Utilidades
│   │
│   ├── 📂 pages/                 # Páginas públicas
│   │   ├── index.html            # Página de inicio
│   │   ├── noticias.html         # Lista de noticias
│   │   ├── eventos.html          # Catálogo de eventos
│   │   ├── nosotros.html         # Información de INEMO
│   │   ├── contacto.html         # Formulario + mapa
│   │   └── login.html            # Login para admin
│   │
│   ├── 📂 admin/                 # Panel administrativo
│   │   ├── index.html            # Dashboard
│   │   ├── noticias.html         # Gestionar noticias
│   │   ├── eventos.html          # Gestionar eventos
│   │   └── contactos.html        # Ver mensajes
│   │
│   └── 📂 assets/                # Recursos
│       ├── 📂 images/            # Imágenes
│       └── 📂 icons/             # Iconos
│
└── 📄 (otros archivos de configuración)
```

## 🎯 Entidades Principales

### 1. Usuario
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@inemo.edu.co",
  "password": "admin123",
  "role": "admin",
  "nombre": "Administrador INEMO"
}
```

### 2. Noticia
```json
{
  "id": 1,
  "titulo": "Título de la noticia",
  "contenido": "Contenido completo...",
  "imagen": "URL de imagen",
  "fecha": "2026-03-08",
  "autor": "Nombre del autor",
  "categoria": "General",
  "estado": "activo"
}
```

### 3. Evento
```json
{
  "id": 1,
  "titulo": "Nombre del evento",
  "descripcion": "Descripción del evento...",
  "imagen": "URL de imagen",
  "fecha": "2026-03-20",
  "hora": "10:00 AM",
  "lugar": "Auditorio INEMO",
  "capacidad": 200,
  "inscritos": 45,
  "estado": "proximos",
  "inscripcion": "abierta"
}
```

### 4. Contacto
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+573001234567",
  "asunto": "Consulta sobre becas",
  "mensaje": "Mensaje del visitante...",
  "fecha": "2026-03-08",
  "leido": false,
  "respondido": false
}
```

## 🔗 Struktura de URLs

### Público
```
/                           # Inicio
/frontend/pages/noticias.html
/frontend/pages/eventos.html
/frontend/pages/nosotros.html
/frontend/pages/contacto.html
/frontend/pages/login.html
```

### API Backend
```
POST   /api/auth/login
GET    /api/noticias
POST   /api/noticias
PUT    /api/noticias/:id
DELETE /api/noticias/:id

GET    /api/eventos
POST   /api/eventos
PUT    /api/eventos/:id
DELETE /api/eventos/:id
POST   /api/eventos/:id/inscribirse

GET    /api/contacto/config
POST   /api/contacto
GET    /api/contacto (admin)
DELETE /api/contacto/:id (admin)
```

### Admin (protegido)
```
/frontend/admin/
/frontend/admin/noticias.html
/frontend/admin/eventos.html
/frontend/admin/contactos.html
```

## 🎨 Arquitectura de Estilos

```
CSS Variables (colores)
    ↓
Componentes base (botones, cards)
    ↓
Secciones (hero, navbar, footer)
    ↓
Layouts especiales (grid, admin)
    ↓
Responsive (media queries)
```

## 🔐 Flujo de Autenticación

```
Usuario escribe credenciales
        ↓
   POST /api/auth/login
        ↓
Servidor valida (JWT)
        ↓
Retorna token + user
        ↓
Frontend guarda en localStorage
        ↓
Solicitudes posteriores incluyen token
        ↓
Middleware verifica token
```

## 📊 Flujo de Datos - Noticias

```
Admin crea noticia
        ↓
POST /api/noticias
        ↓
Backend valida auth + datos
        ↓
Guarda en noticias.json
        ↓
Frontend recibe confirmación
        ↓
         ↙         ↘
Usuarios ven en lista    Admin ve en CRUD
    (GET)                 (CRUD completo)
```

## 🛠️ Tecnología por Componente

| Componente | Tecnología |
|-----------|-----------|
| Servidor | Node.js + Express |
| API | RESTful JSON |
| Auth | JWT (JSON Web Tokens) |
| BD | JSON (archivos) |
| Frontend | HTML5 + CSS3 + JS (ES6) |
| Estilos | CSS Variables + Responsive |
| Mapa | Google Maps API (iframe) |
| Iconos | Unicode/Emoji |

## 📈 Escalabilidad Futura

Para pasar a producción:

1. **BD JSON → Base de datos SQL/NoSQL**
   - PostgreSQL, MongoDB, MySQL

2. **Autenticación simple → OAuth2**
   - Google, Facebook, Microsoft

3. **Almacenamiento → Cloud**
   - AWS S3, Google Cloud Storage

4. **Email → Servicio SMTP**
   - SendGrid, Mailgun, Nodemailer

5. **Hosting → Plataforma en la nube**
   - AWS, DigitalOcean, Heroku

6. **CDN → Distribución global**
   - CloudFlare, AWS CloudFront

## 📋 Checklist de Configuración

- [ ] Node.js instalado
- [ ] npm install en backend
- [ ] npm start iniciado
- [ ] Acceder a http://localhost:3000
- [ ] Login con admin/admin123
- [ ] Crear primera noticia
- [ ] Crear primer evento
- [ ] Probar inscripción a evento
- [ ] Enviar mensaje de contacto
- [ ] Verificar en panel admin

## 🎓 Archivos Educativos

- **README.md** - Documentación completa
- **GUIA_RAPIDA.md** - Inicio rápido (5 min)
- **ESTRUCTURA.md** - Este archivo (arquitectura)

---

**Documentación actualizada**: Marzo 2026
**Versión**: 1.0.0
**Licencia**: INEMO 2026 ©
