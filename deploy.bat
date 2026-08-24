@echo off
chcp 65001 >nul
title CICMELINST Industrial - Deploy Helper

echo.
echo ============================================================
echo  CICMELINST C.A. - Deploy Helper
echo ============================================================
echo.
echo Selecciona plataforma de despliegue:
echo.
echo   [1] Cloudflare Pages (wrangler)
echo   [2] Netlify (netlify-cli)
echo   [3] Vercel (vercel-cli)
echo   [4] Solo Build local (sin deploy)
echo   [5] Verificar build local
echo.
choice /C:12345 /M "Opcion: "

if errorlevel 5 goto VERIFY
if errorlevel 4 goto BUILD_ONLY
if errorlevel 3 goto VERCEL
if errorlevel 2 goto NETLIFY
if errorlevel 1 goto CLOUDFLARE

:CLOUDFLARE
echo.
echo [DEPLOY] Desplegando a Cloudflare Pages...
echo.
echo Requisitos previos:
echo   - wrangler instalado: npm i -g wrangler
echo   - Autenticado: wrangler login
echo   - KV/D1 configurados en wrangler.toml
echo.
where wrangler >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] wrangler no encontrado. Instalando...
    npm i -g wrangler
)
wrangler pages deploy dist --project-name=cicmelinst-industrial
goto END

:NETLIFY
echo.
echo [DEPLOY] Desplegando a Netlify...
echo.
echo Requisitos previos:
echo   - netlify-cli instalado: npm i -g netlify-cli
echo   - Autenticado: netlify login
echo   - Sitio vinculado: netlify link
echo.
where netlify >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] netlify-cli no encontrado. Instalando...
    npm i -g netlify-cli
)
netlify deploy --prod --dir=dist
goto END

:VERCEL
echo.
echo [DEPLOY] Desplegando a Vercel...
echo.
echo Requisitos previos:
echo   - vercel-cli instalado: npm i -g vercel
echo   - Autenticado: vercel login
echo.
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARN] vercel no encontrado. Instalando...
    npm i -g vercel
)
vercel --prod
goto END

:BUILD_ONLY
echo.
echo [BUILD] Solo build de produccion local...
call build-preview.bat
goto END

:VERIFY
echo.
echo [VERIFY] Verificando build local...
echo.
if not exist "dist" (
    echo [INFO] No hay build previo. Ejecutando build...
    npm run build
    if %errorlevel% neq 0 goto END
)
echo.
echo [CHECKLIST] Verificando archivos criticos:
echo.
if exist "dist\index.html"      (echo [OK] index.html) else (echo [FAIL] index.html FALTANTE)
if exist "dist\sw.js"           (echo [OK] sw.js) else (echo [WARN] sw.js no encontrado)
if exist "dist\sitemap.xml"     (echo [OK] sitemap.xml) else (echo [WARN] sitemap.xml no encontrado)
if exist "dist\robots.txt"      (echo [OK] robots.txt) else (echo [WARN] robots.txt no encontrado)
if exist "dist\manifest.webmanifest" (echo [OK] manifest.webmanifest) else (echo [WARN] manifest no encontrado)
if exist "dist\_headers"        (echo [OK] _headers) else (echo [WARN] _headers no encontrado)
if exist "dist\_redirects"      (echo [OK] _redirects) else (echo [WARN] _redirects no encontrado)
if exist "dist\favicon.svg"     (echo [OK] favicon.svg) else (echo [WARN] favicon.svg no encontrado)
if exist "dist\logo.png"        (echo [OK] logo.png) else (echo [WARN] logo.png no encontrado)
echo.
echo [CHECK] Assets principales:
dir dist\assets\js\index-*.js /b 2>nul | findstr /r ".*" >nul && (echo [OK] JS main chunk) || (echo [FAIL] JS main chunk FALTANTE)
dir dist\assets\css\index-*.css /b 2>nul | findstr /r ".*" >nul && (echo [OK] CSS main chunk) || (echo [FAIL] CSS main chunk FALTANTE)
echo.
echo [INFO] Tamano total dist:
for /f "tokens=3,5" %%a in ('dir /s /-c dist 2^>nul ^| find "Archivo(s)"') do (
    echo      %%a bytes (%%b KB)
)
echo.
echo [OK] Verificacion completada
goto END

:END
echo.
echo ============================================================
pause