@echo off

REM METTRE EN MEMOIRE LE CHEMIN OU SE TROUVE LE FICHIER
set BIONEST_API_PATH=%~dp0\API
echo %BIONEST_API_PATH%

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
cd %BIONEST_API_PATH%\API_SECURITY
start cmd /k "SET DEBUG=api-production:* & npm start"