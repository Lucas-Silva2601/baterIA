import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Proxy para o Ollama Cloud.
 *
 * O endpoint https://ollama.com/v1/* NÃO envia cabeçalhos CORS
 * (Access-Control-Allow-Origin) e responde 405 ao preflight OPTIONS.
 * Portanto o navegador bloqueia chamadas diretas feitas com axios/fetch.
 *
 * Em desenvolvimento, o Vite encaminha /ollama-api/* para https://ollama.com/*,
 * fazendo a requisição sair do servidor Node (sem CORS).
 */
const ollamaProxy = {
  '/ollama-api': {
    target: 'https://ollama.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/ollama-api/, ''),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: ollamaProxy,
  },
  preview: {
    proxy: ollamaProxy,
  },
})
