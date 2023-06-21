@echo off

REM METTRE EN MEMOIRE LE CHEMIN OU SE TROUVE LE FICHIER
set BIONEST_API_PATH=%~dp0\API
set BIONEST_FRONTEND_PATH=%~dp0\frontend

echo %BIONEST_API_PATH%
echo %BIONEST_FRONTEND_PATH%

REM -------------------------------------------- REM

REM Démarrer l'API_USERS
cd %BIONEST_API_PATH%\API_USERS
start cmd /k "SET DEBUG=api-users:* & npm start "

REM Attendre 5 secondes
timeout /t 5

REM Démarrer l'API_SECURITY
cd %BIONEST_API_PATH%\API_SECURITY
start cmd /k "SET DEBUG=api-security:* & npm start"

REM Attendre 5 secondes
timeout /t 5

REM Démarrer l'API_PROD
cd %BIONEST_API_PATH%\API_PRODUCTION
start cmd /k "SET DEBUG=api-production:* & npm start"

REM ------------------------------------------------- REM

REM Attendre 5 secondes
timeout /t 5

REM Démarrer la partie frontend
cd %BIONEST_FRONTEND_PATH%
start cmd /k "npm start"