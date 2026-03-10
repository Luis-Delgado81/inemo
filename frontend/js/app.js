// API Base URL
const API_URL = 'http://localhost:3000/api';

// Obtener token del localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Obtener usuario del localStorage
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Guardar token y usuario
function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

// Limpiar autenticación
function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Actualizar barra de navegación según autenticación
function updateNavbar() {
  const user = getUser();
  const navUser = document.querySelector('.nav-user');

  if (navUser) {
    if (user) {
      navUser.innerHTML = `
        <span style="color: var(--oro); font-weight: 600; margin-right: 15px;">¡Hola, ${user.nombre}!</span>
        ${user.role === 'admin' || user.role === 'editor' ? '<button onclick="navegarA(\'admin\')" style="background: var(--vinotinto); color: white; padding: 8px 15px; border-radius: 4px; cursor: pointer; border: none; margin-right: 10px;">⚙️ Admin</button>' : ''}
        <button class="logout-btn" onclick="logout()" style="background: #dc3545; color: white; padding: 8px 15px; border-radius: 4px; cursor: pointer; border: none;">Cerrar Sesión</button>
      `;
    } else {
      navUser.innerHTML = `
        <button onclick="abrirLogin()" class="btn btn-primary">Iniciar Sesión</button>
      `;
    }
  }
}

// Logout
function logout() {
  if (confirm('¿Deseas cerrar sesión?')) {
    clearAuth();
    updateNavbar();
    navegarA('inicio');
  }
}

// Mostrar alerta
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  `;
  alertDiv.innerHTML = `
    <span>${message}</span>
    <button style="background: none; border: none; cursor: pointer; font-size: 20px; color: white;" onclick="this.parentElement.remove();">×</button>
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentElement) alertDiv.remove();
  }, 5000);
}


// Función para abrir modal de login
function abrirLogin() {
  const loginHTML = `
    <div id="login-modal" class="modal-overlay" style="display: flex !important;">
      <div class="modal-content">
        <h2>Iniciar Sesión - INEMO</h2>
        <form id="login-form-modal" onsubmit="realizarLogin(event)">
          <div class="form-group">
            <label for="login-username">Usuario</label>
            <input type="text" id="login-username" placeholder="admin o editor" required>
          </div>
          <div class="form-group">
            <label for="login-password">Contraseña</label>
            <input type="password" id="login-password" placeholder="Contraseña" required>
          </div>
          <div class="form-group" style="display: flex; gap: 10px; margin-top: 20px;">
            <button type="submit" class="btn btn-primary" style="flex: 1;">Iniciar Sesión</button>
            <button type="button" onclick="cerrarLogin()" class="btn btn-outline" style="flex: 1; background: #999; color: white; border: none;">Cancelar</button>
          </div>
        </form>
        <div style="background: #f0f0f0; padding: 15px; border-radius: 4px; margin-top: 15px; font-size: 12px;">
          <p style="margin: 0 0 10px;"><strong>Datos de prueba:</strong></p>
          <p style="margin: 5px 0;">Usuario: <code>admin</code></p>
          <p style="margin: 5px 0;">Contraseña: <code>admin123</code></p>
        </div>
      </div>
    </div>
  `;
  
  if (!document.getElementById('login-modal')) {
    document.body.insertAdjacentHTML('beforeend', loginHTML);
    document.getElementById('login-modal').addEventListener('click', (e) => {
      if (e.target.id === 'login-modal') cerrarLogin();
    });
  }
}

function cerrarLogin() {
  const modal = document.getElementById('login-modal');
  if (modal) modal.remove();
}

async function realizarLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert(data.error || 'Error en login', 'error');
      return;
    }

    saveAuth(data.token, data.user);
    showAlert('✓ Inicio de sesión exitoso', 'success');
    cerrarLogin();
    updateNavbar();
    
    if (data.user.role === 'admin' || data.user.role === 'editor') {
      setTimeout(() => navegarA('admin'), 500);
    }
  } catch (error) {
    showAlert(`✗ ${error.message}`, 'error');
  }
}

// Inicializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
});

