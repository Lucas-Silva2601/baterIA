import { execSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const stopScript = join(here, 'stop-dev.mjs');

console.log('🔄 Reiniciando baterIA...');
try {
  execSync(`node "${stopScript}"`, { stdio: 'inherit', cwd: root, shell: true });
} catch {
  // continua mesmo se não havia nada rodando
}

// Pequena pausa para liberar a porta
await new Promise((r) => setTimeout(r, 1500));

console.log('🚀 Iniciando projeto (abre o navegador automaticamente)...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const child = spawn(npmCmd, ['run', 'dev:open'], { cwd: root, stdio: 'inherit', shell: false });
child.on('exit', (code) => process.exit(code ?? 0));
