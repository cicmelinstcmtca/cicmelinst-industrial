@echo off
chcp 65001 >nul
title CICMELINST Industrial - Production Build & Preview

echo.
echo ============================================================
echo  CICMELINST C.A. - Ingenieria Industrial Venezuela
echo  Production Build & Preview Launcher
echo ============================================================
echo.

REM Verificar Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [INFO] Node.js version: %NODE_VERSION%

echo.
echo [PASO 1/4] Limpiando build anterior...
if exist "dist" rmdir /s /q "dist" >nul 2>&1
echo [OK] Directorio dist limpiado

echo.
echo [PASO 2/4] Ejecutando build de produccion...
npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build fallido
    pause
    exit /b 1
)
echo [OK] Build completado exitosamente

echo.
echo [PASO 3/4] Verificando archivos generados...
if not exist "dist\index.html" (
    echo [ERROR] index.html no encontrado en dist/
    pause
    exit /b 1
)
if not exist "dist\sw.js" (
    echo [WARN] sw.js no encontrado
)
if not exist "dist\sitemap.xml" (
    echo [WARN] sitemap.xml no encontrado
)
if not exist "dist\robots.txt" (
    echo [WARN] robots.txt no encontrado
)
if not exist "dist\manifest.webmanifest" (
    echo [WARN] manifest.webmanifest no encontrado
)

REM Mostrar tamano de chunks principales
echo.
echo [INFO] Chunks principales generados:
for %%f in (dist\assets\js\index-*.js) do (
    for /f "tokens=3,5" %%a in ('dir /-c "%%f"') do (
        echo      %%~nxf: %%a bytes (%%b KB)
    )
)
for %%f in (dist\assets\css\index-*.css) do (
    for /f "tokens=3,5" %%a in ('dir /-c "%%f"') do (
        echo      %%~nxf: %%a bytes (%%b KB)
    )
)

echo.
echo [PASO 4/4] Iniciando preview de produccion...
echo [INFO] Preview estara disponible en:
echo         - Local:   http://localhost:4173
echo         - Network: http://[TU-IP]:4173
echo.
echo ============================================================
echo  NOTA: Este es un preview LOCAL de produccion.
echo        Para deploy real usa: Cloudflare Pages, Netlify, Vercel
echo ============================================================
echo.

npm run preview

echo.
echo [INFO] Preview detenido.
pause