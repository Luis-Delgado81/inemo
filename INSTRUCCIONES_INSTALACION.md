# 🎓 INEMO - Guía de Instalación y Configuración

## 📋 Requisitos del Sistema

- Node.js v14+ instalado
- MySQL Server 5.7+ instalado y ejecutándose
- npm o yarn como gestor de paquetes

---

## 🚀 Pasos de Instalación

### 1. Clonar el Repositorio
```bash
cd /ruta/del/proyecto/inemo
```

### 2. Instalar Dependencias del Backend
```bash
cd backend
npm install
```

Esto instalará:
- express (servidor web)
- mysql2 (driver MySQL)
- jsonwebtoken (autenticación JWT)
- bcryptjs (encriptación de contraseñas)
- cors (control de origen cruzado)
- body-parser (parseo de JSON)
- dotenv (variables de ambiente)

### 3. Configurar MySQL

#### Opción A: Línea de Comando
```bash
# Acceder a MySQL
mysql -u root -p

# Ejecutar el script de inicialización
source backend/database/init.sql;
```

#### Opción B: Cliente gráfico (MySQL Workbench)
1. Abre MySQL Workbench
2. Creates nueva conexión (si no existe)
3. Abre el archivo: `backend/database/init.sql`
4. Ejecuta el script

### 4. Configurar Variables de Ambiente

Editar el archivo `.env` en la carpeta `backend`:

```env
# Base de Datos
DB_HOST=localhost          # Host de MySQL
DB_USER=root              # Usuario MySQL
DB_PASSWORD=              # Contraseña (vacío si no tiene)
DB_NAME=inemo_db          # Nombre de la BD (no cambiar si usas init.sql)

# API
PORT=3000                 # Puerto del servidor
NODE_ENV=development      # development o production

# Seguridad
JWT_SECRET=inemo-secret-key-2026
JWT_EXPIRE=24h
```

**Si tu MySQL tiene contraseña:**
```env
DB_PASSWORD=tu_contraseña_aqui
```

### 5. Iniciar el Servidor

```bash
cd backend
npm start
```

El servidor estarázará en: `http://localhost:3000`

---

## 🔐 Credenciales de Acceso

### Usuarios por Defecto:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Administrador |
| editor | admin123 | Editor de Contenidos |

**⚠️ IMPORTANTE**: Cambiar estas contraseñas en producción.

---

## 📊 Estructura de Base de Datos

### Tablas Creadas:

1. **usuarios** - Gestión de usuarios del sistema
2. **noticias** - Publicación de noticias
3. **eventos** - Gestión de eventos
4. **contactos** - Formularios de contacto
5. **configuracion** - Configuración del sitio

---

## 🎯 Funcionalidades CRUD Operativas

### 📰 Noticias
- ✅ Crear nuevas noticias
- ✅ Listar noticias (con paginación)
- ✅ Editar noticias existentes
- ✅ Eliminar noticias
- ✅ Filtrar por categoría y estado

### 🎪 Eventos
- ✅ Crear eventos
- ✅ Listar eventos (filtrados por estado: próximos, en curso, finalizados)
- ✅ Editar información del evento
- ✅ Eliminar eventos
- ✅ Marcar eventos como destacados

### 👥 Contactos
- ✅ Recibir mensajes de contacto (formulario público)
- ✅ Listar todos los mensajes (admin)
- ✅ Marcar mensajes como leídos
- ✅ Responder a mensajes
- ✅ Eliminar mensajes

### 👨‍💼 Usuarios
- ✅ Crear nuevos usuarios (admin)
- ✅ Listar usuarios
- ✅ Administrar roles
- ✅ Activar/Desactivar usuarios

---

## 🌐 Acceder a la Aplicación

### Frontend (Inicio Público)
```
http://localhost:3000
```

### Páginas Disponibles:
- **Inicio** - Dashboard principal con noticias y eventos
- **Noticias** - Listado completo de noticias
- **Eventos** - Próximos eventos disponibles
- **Nosotros** - Información sobre INEMO
- **Contacto** - Formulario de contacto

### Panel de Administración
```
http://localhost:3000/?admin
```

Haz clic en el botón "⚙️ Admin" (requiere estar autenticado como admin/editor)

---

## 📡 Endpoints de API Disponibles

### Autenticación
```
POST   /api/auth/login           - Iniciar sesión
POST   /api/auth/register        - Crear nuevo usuario (admin)
POST   /api/auth/verify          - Verificar token
```

### Noticias
```
GET    /api/noticias             - Listar noticias (paginadas)
GET    /api/noticias/:id         - Obtener una noticia
POST   /api/noticias             - Crear noticia (admin/editor)
PUT    /api/noticias/:id         - Actualizar noticia (admin/editor)
DELETE /api/noticias/:id         - Eliminar noticia (admin/editor)
```

### Eventos
```
GET    /api/eventos              - Listar eventos
GET    /api/eventos/:id          - Obtener un evento
GET    /api/eventos/destacado    - Obtener evento destacado
POST   /api/eventos              - Crear evento (admin/editor)
PUT    /api/eventos/:id          - Actualizar evento (admin/editor)
DELETE /api/eventos/:id          - Eliminar evento (admin/editor)
```

### Contactos
```
GET    /api/contacto             - Listar contactos (admin)
GET    /api/contacto/:id         - Obtener un contacto (admin)
POST   /api/contacto             - Enviar mensaje (público)
PUT    /api/contacto/:id/leer    - Marcar como leído (admin)
PUT    /api/contacto/:id/responder - Responder contacto (admin)
DELETE /api/contacto/:id         - Eliminar contacto (admin)
```

### Configuración
```
GET    /api/contacto/config      - Obtener configuración de contacto
```

---

## 🛠️ Solución de Problemas

### Error: "Cannot find module 'mysql2'"
```bash
cd backend
npm install mysql2
```

### Error: "Access denied for user 'root'@'localhost'"
Asegurate que las credenciales en `.env` son correctas

### Error: "ECONNREFUSED - Connection refused"
- Verifica que MySQL esté ejecutándose
- Windows: Services > MySQL80 (o la versión que tengas)
- Linux: `sudo service mysql start`
- macOS: `mysql.server start`

### La Base de Datos no existe
```bash
mysql -u root -p < backend/database/init.sql
```

---

## 🔒 Seguridad en Producción

### Antes de ir a producción:

1. **Cambiar JWT_SECRET**
   ```env
   JWT_SECRET=tu_secreto_super_seguro_aqui_12345
   ```

2. **Cambiar contraseñas de usuarios**
   ```sql
   UPDATE usuarios SET password = SHA2('nueva_contraseña', 256) WHERE username = 'admin';
   ```

3. **Habilitar HTTPS**
   - Usar Let's Encrypt o certificado SSL válido

4. **Configurar CORS**
   - Especificar dominio permitido en lugar de '*'

5. **Variables de Ambiente Seguras**
   - Usar servicio de gestión de secretos
   - Nunca commitear `.env` a respositorio

---

## 📈 Mejoras Futuras Recomendadas

1. ✅ Implementar paginación avanzada
2. ✅ System de notificaciones por email
3. ✅ Upload de imágenes
4. ✅ Sistema de comentarios
5. ✅ Analytics y estadísticas
6. ✅ Sistema de roles y permisos avanzado
7. ✅ Backup automático de BD

---

## 💡 Ejemplo de Uso de API con curl

### Crear una Noticia
```bash
curl -X POST http://localhost:3000/api/noticias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "titulo": "Nueva Noticia",
    "contenido": "Contenido de la noticia",
    "categoria": "General",
    "imagen": "https://via.placeholder.com/600x400"
  }'
```

### Listar Noticias
```bash
curl http://localhost:3000/api/noticias?limit=10&page=1
```

### Crear un Evento
```bash
curl -X POST http://localhost:3000/api/eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "titulo": "Feria de Ciencias",
    "descripcion": "Evento de ciencias",
    "fecha_evento": "2026-04-15",
    "ubicacion": "Auditorio"
  }'
```

---

## 📞 Soporte

Para reportar problemas o sugerencias, contactar a:
- 📧 contacto@inemo.edu.co
- 📞 +57 300 567 8901

---

**Versión: 1.0.0** | **Última actualización: Marzo 2026**
