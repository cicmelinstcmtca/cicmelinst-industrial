<# 
.SYNOPSIS
    CICMELINST Industrial - Development Server Launcher (PowerShell)
.DESCRIPTION
    Inicia el servidor de desarrollo Vite con mejor manejo de errores en Windows
#>

# Configurar encoding UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "CICMELINST Industrial - Development Server"

Write-Host "`n============================================================"
Write-Host "  CICMELINST C.A. - Ingeniería Industrial Venezuela"
Write-Host "  Development Environment Launcher"
Write-Host "============================================================`n"

# Verificar Node.js
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Error "[ERROR] Node.js no está instalado o no está en el PATH"
    Write-Host "Por favor instala Node.js desde https://nodejs.org/"
    Read-Host "Presione Enter para salir"
    exit 1
}
Write-Host "[INFO] Node.js version: $((node --version).Trim())"

# Verificar npm
$npmPath = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmPath) {
    Write-Error "[ERROR] npm no está disponible"
    Read-Host "Presione Enter para salir"
    exit 1
}
Write-Host "[INFO] npm version: $((npm --version).Trim())"

Write-Host "`n[INFO] Directorio de trabajo: $PWD`n"

# Verificar node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules no encontrado, instalando dependencias..."
    try {
        npm install
        Write-Host "[OK] Dependencias instaladas`n"
    } catch {
        Write-Error "[ERROR] Fallo en npm install"
        Read-Host "Presione Enter para salir"
        exit 1
    }
}

Write-Host "[INFO] Iniciando servidor de desarrollo Vite..."
Write-Host "[INFO] La aplicación estará disponible en:"
Write-Host "         - Local:   http://localhost:5173"
Write-Host "         - Network: http://[TU-IP]:5173"
Write-Host "`n============================================================"
Write-Host "  CONTROLES:"
Write-Host "  - Ctrl+C          : Detener servidor"
Write-Host "  - r + Enter       : Reiniciar servidor"
Write-Host "  - Abrir navegador : http://localhost:5173"
Write-Host "============================================================`n"

Write-Host "[INFO] Iniciando servidor (la ventana se mantendrá abierta)...`n"

# Ejecutar y mantener ventana abierta
try {
    npm run dev
} catch {
    Write-Error "[ERROR] El servidor se detuvo inesperadamente: $_"
}

Write-Host "`n[INFO] Servidor detenido."
Read-Host "Presione Enter para salir"