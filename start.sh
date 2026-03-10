#!/bin/bash
# Script de inicio rápido para INEMO

echo "🎓 Iniciando Portal INEMO..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instálalo primero."
    echo "   Descargalo en: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js detectado: $(node --version)"
echo "✓ npm detectado: $(npm --version)"
echo ""

# Navegar a la carpeta backend
echo "📦 Instalando dependencias del backend..."
cd backend

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    npm install
    echo "✓ Dependencias instaladas"
else
    echo "✓ Dependencias ya instaladas"
fi

echo ""
echo "🚀 Iniciando servidor en http://localhost:3000..."
echo ""
echo "===================="
echo "💡 Tips de uso:"
echo "===================="
echo "- Acceder al sitio: http://localhost:3000/"
echo "- Panel Admin: http://localhost:3000/frontend/admin/"
echo "- Usuario demo: admin"
echo "- Contraseña demo: admin123"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo "===================="
echo ""

npm start
