## 🚀 INICIO RÁPIDO - INEMO

### 1️⃣ Instalar MySQL (si no lo tienes)

**Windows:**
- Descargar MySQL: https://dev.mysql.com/downloads/mysql/
- Instalar y recordar la contraseña

**Linux/Mac:**
```bash
# Mac
brew install mysql
brew services start mysql

# Linux
sudo apt-get install mysql-server
sudo systemctl start mysql
```

---

### 2️⃣ Crear la Base de Datos

```bash
# Desde la carpeta del proyecto
mysql -u root -p < backend/database/init.sql
```

Si no tienes contraseña:
```bash
mysql -u root < backend/database/init.sql
```

---

### 3️⃣ Instalar Dependencias

```bash
cd backend
npm install
```

---

### 4️⃣ Configurar .env

Editar `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=         # (tu contraseña si tienes)
DB_NAME=inemo_db
PORT=3000
NODE_ENV=development
```

---

### 5️⃣ Iniciar el Servidor

```bash
npm start
```

Deberías ver:
```
╔════════════════════════════════════════╗
║  🎓 Servidor INEMO                    ║
║  Ejecutándose en http://localhost:3000 ║
║  Ambiente: development                ║
╚════════════════════════════════════════╝
```

---

### 6️⃣ Acceder a la Aplicación

Abre en tu navegador:
```
http://localhost:3000
```

---

### 7️⃣ Iniciar Sesión

Haz clic en **"Iniciar Sesión"** y usa:

| Usuario | Contraseña |
|---------|-----------|
| admin | admin123 |
| editor | admin123 |

---

### ✨ Funciona:

✅ Ver noticias y eventos en la página principal
✅ Acceder a "Admin" después de iniciar sesión
✅ Crear, editar y eliminar noticias
✅ Crear, editar y eliminar eventos
✅ Gestionar contactos
✅ Crear usuarios

---

### 🐛 Si no funciona

#### Error: "Cannot connect to MySQL"
```bash
# Verificar que MySQL está ejecutándose
# Windows: Services > MySQL
# Linux: sudo systemctl status mysql
# Mac: brew services list
```

#### Error: "EADDRINUSE :::3000"
El puerto 3000 ya está en uso. Cambiar en `.env`:
```env
PORT=3001
# Luego acceder a http://localhost:3001
```

#### Error: "Cannot find module"
```bash
cd backend
npm install
```

---

### 📱 Estructura del Sistema

**Páginas Públicas:**
- / - Inicio con noticias y eventos
- /noticias - Todas las noticias
- /eventos - Próximos eventos
- /nosotros - Información
- /contacto - Formulario contacto

**Panel Admin:**
- /admin - Dashboard
- /admin/noticias - Gestionar noticias
- /admin/eventos - Gestionar eventos
- /admin/contactos - Ver contactos
- /admin/usuarios - Crear usuarios

---

### 💡 Datos de Prueba

La BD crea automáticamente:
- 3 noticias de ejemplo
- 3 eventos de ejemplo
- 1 contacto de ejemplo

---

**¿Todo funcionando? 🎉 ¡Ya está listo para usar!**
