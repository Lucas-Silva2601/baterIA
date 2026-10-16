import { execSync, spawnSync } from 'node:child_process';
import { platform } from 'node:os';

const PORTS = [5173, 5174, 5175];
const isWin = platform() === 'win32';

function getPidsOnPort(port) {
  try {
    if (isWin) {
      // Sem "-p TCP" para incluir sockets IPv6 (Vite binda em [::1]:5173).
      const out = execSync('netstat -ano', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const pids = new Set();
      for (const line of out.split('\n')) {
        // Ex IPv4: TCP    0.0.0.0:5173    0.0.0.0:0    LISTENING    1234
        // Ex IPv6: TCP    [::1]:5173      [::]:0       LISTENING    1234
        if (line.includes(`:${port}`) && line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (/^\d+$/.test(pid)) pids.add(pid);
        }
      }
      return [...pids];
    } else {
      // macOS / Linux: tenta lsof, depois fuser, depois ss
      try {
        const out = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
        return out.split('\n').map((s) => s.trim()).filter((s) => /^\d+$/.test(s));
      } catch {
        return [];
      }
    }
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    if (isWin) {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
    } else {
      execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
    }
    return true;
  } catch {
    return false;
  }
}

let killed = [];
for (const port of PORTS) {
  const pids = getPidsOnPort(port);
  for (const pid of pids) {
    if (killPid(pid)) killed.push(`${pid} (porta ${port})`);
  }
}

// Fallback: mata processos vite órfãos só se nada foi encontrado na porta
if (killed.length === 0) {
  try {
    if (isWin) {
      const out = execSync('tasklist /FO CSV /NH', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      // Não mata node.exe genérico por segurança — apenas informa.
      console.log('Nenhum processo LISTENING encontrado nas portas 5173/5174/5175.');
      void out;
    } else {
      const r = spawnSync('pkill', ['-f', 'vite'], { stdio: 'ignore' });
      if (r.status === 0) killed.push('processos vite (pkill)');
    }
  } catch {
    // ignora
  }
}

if (killed.length > 0) {
  console.log(`✅ Projeto fechado. PIDs finalizados: ${killed.join(', ')}`);
} else {
  console.log('ℹ️  Nenhum processo do projeto em execução (portas 5173/5174/5175 livres).');
}
