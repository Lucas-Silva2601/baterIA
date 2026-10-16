@echo off
REM ============================================================
REM  baterIA - INICIAR projeto + abrir no navegador
REM  Branch: migracao/nextjs-tailwind
REM  Uso: duplo-clique ou .\iniciar.bat
REM ============================================================
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERRO] npm/Node.js nao encontrado no PATH.
  echo Instale o Node.js 18+ em https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo [INFO] node_modules nao encontrado. Instalando dependencias...
  call npm install
)

if not exist ".env" (
  if exist ".env.example" (
    echo [AVISO] Arquivo .env nao encontrado. Copie com:
    echo   copy .env.example .env
    echo Depois preencha VITE_GROQ_API_KEY.
  )
)

echo [INFO] Iniciando baterIA em http://localhost:5173 ...
echo [INFO] O navegador vai abrir automaticamente. Ctrl+C para encerrar.
call npm run dev:open
