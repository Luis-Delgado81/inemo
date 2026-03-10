# 🚀 Guía de Inicio Rápido - INEMO

## ¡Bienvenido a INEMO!

Este archivo te guiará en 5 minutos para tener el portal funcionando.

## Paso 1️⃣: Verificar Requisitos

Asegúrate de tener **Node.js** instalado:

```bash
node --version
npm --version
```

Si no los tienes, descargalos aquí: https://nodejs.org/

## Paso 2️⃣: Instalar Dependencias

Abre una terminal en la carpeta `backend` e instala las dependencias:

```bash
cd backend
npm install
```

## Paso 3️⃣: Iniciar el Servidor

Inicia el servidor con uno de estos comandos:

**En Windows:**
```bash
npm start
```

**En Linux/Mac:**
```bash
npm start
```

Verás un mensaje como:
```
🎓 Servidor INEMO ejecutándose en http://localhost:3000
```

## Paso 4️⃣: Acceder al Portal

Abre tu navegador web y accede a:

- **Sitio público**: http://localhost:3000/
- **Panel administrativo**: http://localhost:3000/frontend/admin/

## Paso 5️⃣: Iniciar Sesión (Admin)

En el panel administrativo, usa estas credenciales:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

¡Listo! Ya estás dentro 🎉

## 📋 Opciones Disponibles

### En el Panel de Admin (usuario admin)

1. **Dashboard** - Ver estadísticas
2. **Noticias** - Crear, editar, eliminar noticias
3. **Eventos** - Gestionar eventos e inscripciones
4. **Contactos** - Ver mensajes de visitantes

### En el Sitio Público

1. **Inicio** - Página principal con carrusel
2. **Noticias** - Ver todas las noticias (buscar y filtrar)
3. **Eventos** - Ver eventos y inscribirse
4. **Nosotros** - Información sobre INEMO
5. **Contacto** - Enviar mensaje y ver ubicación

## 🔧 Solucionar Problemas

### "Puerto 3000 ya está en uso"

Si el puerto 3000 ya está siendo usado, cambia el puerto en `backend/server.js`:

```javascript
const PORT = process.env.PORT || 3001; // Cambiar de 3000 a 3001
```

### "Error: Cannot find module"

Asegúrate de estar en la carpeta `backend` e instala las dependencias:

```bash
cd backend
npm install
```

### "La página se ve rota (sin estilos)"

Asegúrate de que el servidor esté corriendo (verás el mensaje en la terminal).
Recarga la página con F5 o Ctrl+Shift+R.

## 📚 Más Información

Los archivos importantes están aquí:

- **Backend**: `backend/` - Servidor y API
- **Frontend**: `frontend/` - Páginas web
- **Estilos**: `frontend/css/styles.css` - Colores y diseño
- **Documentación**: `README.md` - Documentación completa

## 🎨 Personalización

Para cambiar los colores corporativos, edita:

**Archivo**: `frontend/css/styles.css`

Busca:
```css
:root {
  --vinotinto: #5a1a1a;
  --oro: #d4af37;
}
```

## 📞 Crear un Nuevo Usuario

Edita el archivo `backend/database/users.json` y agrega un nuevo usuario:

```json
{
  "id": 3,
  "username": "nuevo_usuario",
  "email": "usuario@inemo.edu.co",
  "password": "tu_contraseña",
  "role": "editor",
  "nombre": "Nombre del Usuario"
}
```

## ✨ Próximos Pasos

1. **Personaliza el contenido**:
   - Edita las noticias en el panel admin
   - Agrega tus propios eventos
   - Actualiza la información de contacto

2. **Personaliza el diseño**:
   - Cambia los colores
   - Actualiza logos y imágenes
   - Modifica el contenido de texto

3. **Mejora la seguridad**:
   - Cambia las credenciales de demo
   - Usa HTTPS en producción
   - Implementa validaciones adicionales

## ⚠️ Importante para Producción

Antes de publicar en internet:

1. Cambiar todas las contraseñas
2. Usar una base de datos real (MongoDB, PostgreSQL)
3. Implementar HTTPS
4. Configurar un dominio propio
5. Usar un servicio de email real
6. Respaldar datos regularmente

## 🚀 Desplegar en la Web

Para publicar el sitio, puedes usar:

- **Vercel** - https://vercel.com
- **Netlify** - https://www.netlify.com
- **Heroku** - https://www.heroku.com
- **AWS** - https://aws.amazon.com
- **DigitalOcean** - https://www.digitalocean.com

## 📧 Contacto

¿Necesitas ayuda? Contacta a:
- 📞 +57 300 567 8901
- 📧 contacto@inemo.edu.co

---

**¡Felicidades! 🎉 Tu portal INEMO ya está en marcha.**

Última actualización: Marzo 2026
