@echo off
chcp 65001 >nul
title CICMELINST Industrial - Development Server

echo.
echo ============================================================
echo  CICMELINST C.A. - Ingenieria Industrial Venezuela
echo  Development Environment Launcher
echo ============================================================
echo.

REM Verificar si Node.js esta instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH
    echo Por favor instala Node.js desde https://nodejs.org/
    echo.
    echo Presione cualquier tecla para salir...
    pause >nul
    exit /b 1
)

REM Verificar version de Node
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [INFO] Node.js version: %NODE_VERSION%

REM Verificar si npm esta disponible
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no esta disponible
    echo.
    echo Presione cualquier tecla para salir...
    pause >nul
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [INFO] npm version: %NPM_VERSION%

echo.
echo [INFO] Directorio de trabajo: %CD%
echo.

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo [INFO] node_modules no encontrado, instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Fallo en npm install
        echo.
        echo Presione cualquier tecla para salir...
        pause >nul
        exit /b 1
    )
    echo [OK] Dependencias instaladas
    echo.
)

echo [INFO] Iniciando servidor de desarrollo Vite...
echo [INFO] La aplicacion estara disponible en:
echo         - Local:   http://localhost:5173
echo         - Network: http://[TU-IP]:5173
echo.
echo ============================================================
echo  CONTROLES:
echo  - Ctrl+C          : Detener servidor
echo  - r + Enter       : Reiniciar servidor (en terminal compatible)
echo  - Abrir navegador : http://localhost:5173
echo ============================================================
echo.

REM MANTENER VENTANA ABIERTA SIEMPRE - usar cmd /k
echo [INFO] Iniciando servidor (ventana se mantendra abierta)...
cmd /k npm run dev

REM Si por alguna razon cmd /k falla, fallback
npm run dev

echo.
echo [INFO] Servidor detenido.
echo Presione cualquier tecla para salir...
pause >nul