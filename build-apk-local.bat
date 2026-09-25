@echo off
echo ========================================================
echo   Compilacao Local do APK (Aprenda Xavante)
echo ========================================================
echo.
echo [1/3] Gerando arquivos de build web...
call npm.cmd run build
if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha no build web.
    pause
    exit /b
)

echo.
echo [2/3] Sincronizando com o projeto Android...
call npx.cmd cap sync android
if %ERRORLEVEL% neq 0 (
    echo [ERRO] Falha ao sincronizar com Capacitor.
    pause
    exit /b
)

echo.
echo [3/3] Compilando APK via Gradle...
cd android
call gradlew.bat assembleDebug

if exist "app\build\outputs\apk\debug\app-debug.apk" (
    echo.
    echo ========================================================
    echo   SUCESSO! O APK foi compilado:
    echo   android\app\build\outputs\apk\debug\app-debug.apk
    echo ========================================================
) else (
    echo.
    echo [AVISO] Se voce nao tiver o Android SDK/JDK configurado localmente,
    echo use o script "enviar_para_github.bat" para gerar o .APK gratuitamente
    echo pela nuvem do GitHub Actions em 2 minutos!
)
cd ..
pause
