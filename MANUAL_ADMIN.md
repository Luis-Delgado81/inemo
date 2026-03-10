# 📚 Manual del Panel Administrativo - INEMO

## 🎯 Acceso al Panel

1. **URL**: http://localhost:3000/frontend/admin/
2. **Usuario**: `admin`
3. **Contraseña**: `admin123`

## 📊 Dashboard Principal

Al ingresar, verás:

- 📰 Total de noticias publicadas
- 🎪 Total de eventos registrados
- ✉️ Total de mensajes recibidos
- 👤 Bienvenida personalizada

### Acciones rápidas:
- Botón para crear noticias
- Botón para crear eventos
- Botón para ver contactos

---

## 📰 Gestión de Noticias

### Ver Noticias

1. Click en **"Noticias"** en la navegación
2. Verás una tabla con todas las noticias
3. Cada fila muestra: Título, Categoría, Fecha, Autor, Estado

### Crear Nueva Noticia

1. Click en botón **"+ Crear Nueva Noticia"**
2. Completa el formulario:
   - **Título*** - Nombre de la noticia
   - **Contenido*** - Texto completo
   - **URL de Imagen** - Link a imagen (opcional)
   - **Categoría** - General, Becas, Programas

3. Click en **"Guardar Noticia"**
4. ¡Aparecerá en la página pública!

### Editar Noticia

1. En la tabla, click en botón **"Editar"**
2. Modifica los campos deseados
3. Click en **"Guardar Noticia"**
4. Los cambios se aplican inmediatamente

### Eliminar Noticia

1. En la tabla, click en botón **"Eliminar"** (rojo)
2. Confirma la eliminación
3. La noticia desaparece del sitio

---

## 🎪 Gestión de Eventos

### Ver Eventos

1. Click en **"Eventos"** en la navegación
2. Tabla con todos los eventos
3. Muestra: Título, Fecha, Lugar, Capacidad, Inscritos

### Crear Nuevo Evento

1. Click en **"+ Crear Nuevo Evento"**
2. Completa:
   - **Título*** - Nombre del evento
   - **Descripción*** - Detalles
   - **Fecha*** - Selecciona fecha
   - **Hora*** - Formato 24h (ej: 14:00)
   - **Lugar*** - Dónde se realizará
   - **Capacidad*** - Número máximo de participantes
   - **URL de Imagen** - Link a imagen (opcional)

3. Click en **"Guardar Evento"**

### Monitorear Inscritos

- La tabla muestra: Inscritos/Capacidad
- Barra visual de ocupación
- Estados: LLENO, CASI LLENO, con espacios

### Editar Evento

1. Click en **"Editar"**
2. Modifica fechas, horarios, capacidad, etc.
3. **Nota**: No se recomienda editar inscritos manualmente
4. Click en **"Guardar Evento"**

### Eliminar Evento

1. Click en **"Eliminar"** (rojo)
2. Confirma
3. El evento desaparece

---

## ✉️ Gestión de Contactos

### Ver Mensajes

1. Click en **"Contactos"**
2. Tabla de todos los mensajes recibidos
3. Indica: Nombre, Email, Teléfono, Asunto, Fecha, Estado

### Estados de Mensajes

- **● Nuevo** - Amarillo (No revisado)
- **✓ Leído** - Verde (Ya visto)

### Leer Mensaje

1. Click en botón **"Ver"**
2. Modal muestra:
   - Asunto
   - Nombre completo
   - Email y teléfono
   - Fecha
   - Mensaje completo

3. Botón para responder por email

### Responder a un Contacto

1. En el modal de mensaje, click **"Responder por Email"**
2. Se abrirá mail con el email del visitante
3. Escribe tu respuesta
4. Envía desde tu cliente de correo

### Eliminar Mensaje

1. En la tabla, click en **"Eliminar"** (rojo)
2. Confirma
3. La conversación se borra

---

## 💡 Tips y Mejores Prácticas

### ✅ HACER

✓ Revisar regularmente los mensajes de contacto
✓ Publicar noticias regularmente (semanal)
✓ Mantener eventos actualizados
✓ Cambiar contraseña regularmente
✓ Hacer respaldos de datos
✓ Usar títulos claros y descriptivos
✓ Agregár imágenes atractivas

### ❌ NO HACER

✗ Dejar el sitio sin actualizar por meses
✗ Publicar contenido sin revisar ortografía
✗ Eventos con fechas pasadas (eliminar)
✗ Compartir credenciales
✗ Cambiar contraseña sin anotar
✗ Publicar información privada

### 📝 Recomendaciones de Contenido

**Noticias:**
- Texto de 200-500 palabras
- Imagen de buena calidad (600x400px mínimo)
- Categoría apropiada
- Fecha actual

**Eventos:**
- Descripción clara
- Fecha y hora precisas
- Capacidad realista
- Lugar específico

---

## 🔐 Seguridad

### Cambiar Contraseña

1. Edita `backend/database/users.json`
2. En tu usuario, cambia el campo `password`
3. **Formato**: texto simple (mejora recomendada con bcrypt)

### Crear Nuevo Usuario

1. Edita `backend/database/users.json`
2. Agrega un nuevo objeto:

```json
{
  "id": 3,
  "username": "nuevo_usuario",
  "email": "usuario@inemo.edu.co",
  "password": "contraseña_segura",
  "role": "editor",
  "nombre": "Nombre Completo"
}
```

3. Guarda el archivo
4. El usuario puede iniciar sesión

### Roles

- **admin** - Acceso total (crear, editar, eliminar)
- **editor** - Crear y editar contenido

---

## 🚨 Problemas Comunes

### "No puedo iniciar sesión"

- Verifica usuario y contraseña exactamente
- Revisa mayúsculas/minúsculas
- Asegúrate que el servidor está corriendo

### "No aparecen mis noticias"

- Verifica que guardaste correctamente
- Recarga la página (F5)
- Comprueba que el estado sea "activo"

### "El evento muestra lleno de repente"

- Alguien se inscribió
- Puedes editar capacidad si es necesario
- No se pueden eliminar inscritos automáticamente

### "Perdí la conexión"

- El servidor se puede haber detenido
- Ejecuta `npm start` nuevamente
- Recarga en el navegador

---

## 📲 Acceso Móvil

El panel admin es responsive y funciona en:
- Tablets
- Teléfonos (no recomendado para trabajos extensos)
- Cualquier dispositivo con navegador

**Recomendación**: Usar desktop/laptop para mejor experiencia

---

## 📞 Información de Contacto Setting

Para actualizar información de contacto del sitio:

1. Edita `backend/database/contactos.json`
2. Modifica la sección `configuracion`:

```json
"configuracion": {
  "correo_soporte": "contacto@inemo.edu.co",
  "telefono": "+573005678901",
  "direccion": "Cra. 45 #123-45, Malambo, Atlántico",
  "horario": "Lun - Vie: 8:00 AM - 5:00 PM",
  "ciudad": "Malambo",
  "pais": "Colombia",
  "coordenadas": {
    "lat": 11.0063,
    "lng": -74.7903
  }
}
```

---

## 🎓 Aprendiendo Más

- Revisa `README.md` para documentación técnica
- Estudia el código en `backend/routes/`
- Experimenta creando contenido de prueba

---

**Manual actualizado**: Marzo 2026
**Versión**: 1.0
**Desarrollado para**: INEMO 2026
