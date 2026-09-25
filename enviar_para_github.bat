@echo off
chcp 65001 > nul
echo ========================================================
echo   A'uwẽ - Aprenda Xavante: Enviar para o GitHub
echo ========================================================
echo.
echo Este script envia o projeto para o seu GitHub para que o
echo GitHub Actions compile o arquivo .APK e crie o link público direto!
echo.
echo Dica: Se o repositório for "xavante-app" no seu usuário "AVerz26", a URL será:
echo https://github.com/AVerz26/xavante-app.git
echo.
set "DEFAULT_URL=https://github.com/AVerz26/xavante-app.git"
set /p REPO_URL="Digite a URL do repositório (Pressione ENTER para usar %DEFAULT_URL%): "

if "%REPO_URL%"=="" set "REPO_URL=%DEFAULT_URL%"

echo.
echo [1/3] Preparando arquivos e commit...
git checkout -B main
git add .
git commit -m "feat: app estilo Duolingo offline Xavante com gerador de release direto do APK" --allow-empty

echo.
echo [2/3] Configurando repositório remoto (%REPO_URL%)...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo.
echo [3/3] Enviando para o GitHub...
git push -u origin main --force

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   SUCESSO! Código enviado para o GitHub!
    echo.
    echo   1. Acesse o seu repositório no navegador.
    echo   2. Vá na aba "Actions": a compilação do APK iniciou!
    echo   3. Em ~2 minutos, o APK estará disponível:
    echo      - Na seção "Releases" (Download direto permanente)
    echo      - Link direto para distribuir via WhatsApp / QR Code:
    echo        %REPO_URL:.git=%/releases/latest/download/AprendaXavante.apk
    echo ========================================================
) else (
    echo.
    echo [ATENÇÃO] Ocorreu uma falha no envio.
    echo Verifique se você já criou o repositório no GitHub (https://github.com/new)
    echo e se a URL informada está correta.
)

pause
