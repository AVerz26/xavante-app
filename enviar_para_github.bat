@echo off
echo ========================================================
echo   Aprenda Xavante: Enviar para o GitHub
echo ========================================================
echo.
echo Este script envia o projeto para o seu GitHub para que o
echo GitHub Actions compile o arquivo .APK e crie o link publico direto!
echo.
echo URL configurada: https://github.com/AVerz26/xavante-app.git
echo.
set "DEFAULT_URL=https://github.com/AVerz26/xavante-app.git"
set /p REPO_URL="Digite a URL do repositorio (Pressione ENTER para usar %DEFAULT_URL%): "

if "%REPO_URL%"=="" set "REPO_URL=%DEFAULT_URL%"

echo.
echo [1/3] Preparando arquivos e commit...
git checkout -B main
git add .
git commit -m "feat: app estilo Duolingo offline Xavante com gerador de release direto do APK" --allow-empty

echo.
echo [2/3] Configurando repositorio remoto (%REPO_URL%)...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [3/3] Enviando para o GitHub...
git push -u origin main --force

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   SUCESSO! Codigo enviado para o GitHub!
    echo.
    echo   1. Acesse o seu repositorio no navegador:
    echo      https://github.com/AVerz26/xavante-app
    echo.
    echo   2. Va na aba "Actions": a compilacao do APK iniciou!
    echo   3. Em ~2 minutos, o APK estara pronto na secao "Releases":
    echo      https://github.com/AVerz26/xavante-app/releases/latest/download/AprendaXavante.apk
    echo ========================================================
) else (
    echo.
    echo [ATENCAO] Ocorreu uma falha no envio.
    echo Verifique sua conexao ou login no GitHub.
)

pause
