# ============================================================
#  baterIA - INICIAR projeto + abrir no navegador
#  Branch: migracao/nextjs-tailwind
#  Uso: .\iniciar.ps1
# ============================================================
Set-Location $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "[ERRO] npm/Node.js nao encontrado no PATH." -ForegroundColor Red
  Write-Host "Instale o Node.js 18+ em https://nodejs.org"
  exit 1
}

if (-not (Test-Path "node_modules")) {
  Write-Host "[INFO] node_modules nao encontrado. Instalando dependencias..." -ForegroundColor Yellow
  npm install
}

if (-not (Test-Path ".env") -and (Test-Path ".env.example")) {
  Write-Host "[AVISO] Arquivo .env nao encontrado. Copie com: Copy-Item .env.example .env" -ForegroundColor Yellow
}

Write-Host "[INFO] Iniciando baterIA em http://localhost:5173 ..." -ForegroundColor Green
Write-Host "[INFO] O navegador vai abrir automaticamente. Ctrl+C para encerrar."
npm run dev:open
