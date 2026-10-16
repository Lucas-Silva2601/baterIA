@echo off
REM ============================================================
REM  baterIA - PARAR / fechar projeto (libera portas 5173-5175)
REM  Uso: duplo-clique ou scripts\parar.bat
REM ============================================================
cd /d "%~dp0.."
call npm run stop
pause
