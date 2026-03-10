@echo off
REM Script de inicio rápido para INEMO en Windows

echo.
echo ========================================
echo   🎓  INEMO - Instituto Enseñanza Moderna
echo ========================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Error: Node.js no está instalado
    echo Descargalo en: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js detectado
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo   Versión: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm detectado
echo   Versión: %NPM_VERSION%

echo.
echo 📦 Instalando dependencias...
cd backend

if not exist "node_modules" (
    echo   Instalando paquetes...
    call npm install
    echo ✓ Dependencias instaladas
) else (
    echo ✓ Dependencias ya existen
)

echo.
echo 🚀 Iniciando servidor...
echo.
echo ==========================================
echo 💡 INFORMACIÓN IMPORTANTE:
echo ==========================================
echo URL del sitio:       http://localhost:3000/
echo Panel Admin:         http://localhost:3000/frontend/admin/
echo Usuario demo:        admin
echo Contraseña demo:     admin123
echo.
echo Presiona Ctrl+C para detener el servidor
echo ==========================================
echo.

call npm start
pause
