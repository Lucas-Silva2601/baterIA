@echo off
REM ============================================================
REM  baterIA - REINICIAR projeto (para + inicia + abre navegador)
REM  Uso: duplo-clique ou scripts\reiniciar.bat
REM ============================================================
cd /d "%~dp0.."
call npm run restart
