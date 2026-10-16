# ============================================================
#  baterIA - PARAR / fechar projeto (libera portas 5173-5175)
#  Uso: .\scripts\parar.ps1
# ============================================================
Set-Location (Split-Path $PSScriptRoot -Parent)
npm run stop
