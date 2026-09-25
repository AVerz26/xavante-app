@echo off
chcp 65001 > nul
echo ========================================================
echo   A'uwẽ - Aprenda Xavante: Enviar para o GitHub
echo ========================================================
echo.
echo Este script prepara o projeto e envia para o seu GitHub
echo para compilar o arquivo .APK automaticamente!
echo.
set /p REPO_URL="Cole a URL do seu repositório GitHub (ex: https://github.com/seu-usuario/xavante-app.git): "

if "%REPO_URL%"=="" (
    echo [ERRO] Nenhuma URL fornecida.
    pause
    exit /b
)

echo.
echo [1/4] Inicializando git...
git init
git checkout -B main

echo.
echo [2/4] Adicionando arquivos...
git add .

echo.
echo [3/4] Criando commit...
git commit -m "feat: app estilo Duolingo offline da lingua indigena Xavante com suporte a APK"

echo.
echo [4/4] Conectando ao repositório e enviando...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git push -u origin main --force

echo.
echo ========================================================
echo   PRONTO!
echo   Vá na aba "Actions" do seu GitHub.
echo   O APK estará disponível para download na seção "Artifacts"!
echo ========================================================
pause
