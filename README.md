# 🥁 baterIA — Bateria Virtual com Inteligência Artificial

> Projeto de portfólio: uma bateria virtual jogável no navegador, com **chat de IA que compõe ritmos**, **sistema de loop** e **pads arrastáveis** — tudo em tempo real com Web Audio API.

![Status](https://img.shields.io/badge/status-funcional-brightgreen)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-a855f7?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Ollama AI](https://img.shields.io/badge/AI-Ollama_Cloud-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 Sobre

O **baterIA** é uma aplicação web onde o usuário toca bateria de três formas — clicando, pelo teclado ou conversando com uma IA. A IA (via Ollama Cloud) entende pedidos em linguagem natural como *"crie um ritmo de rock"* e responde tocando sequências nos pads, podendo inclusive **ligar/desligar o loop e trocar o BPM por conta própria** através de um protocolo de comandos embutido nas respostas.

Destaques do projeto:

- 🖱️ **11 pads jogáveis** com áudio real (`.wav` via Web Audio API) e feedback visual
- ⌨️ **Controle total pelo teclado** + drag & drop com posições persistentes em `localStorage`
- 🤖 **IA que toca bateria**: parser de comandos transforma texto da IA em ação (tocar sequência, iniciar/parar loop)
- 🔁 **Sistema de loop** com BPM configurável (80 / 120 / 160) e contador em tempo real

---

## 🎬 Demonstração

```
┌──────────────────────────────────────────────────┐
│        🥁 Bateria Virtual com IA                 │
├────────────────────────────┬─────────────────────┤
│  [A] [S] [W] [D] [F]       │  🔁 Loop Controls   │
│  [R] [J] [K] [Z]           │  Status: ✅ ATIVO   │
│                            │  BPM: 120           │
│  📖 Instruções             │  Som: A (Chimbal)   │
│  • Clique nos botões       │                     │
│  • Shift + Arrastar        │  💬 Chat com IA     │
│  • Use o teclado           │  Você: Crie ritmo   │
│                            │  IA: ASWDJ...       │
└────────────────────────────┴─────────────────────┘
```

> Para ver funcionando: clone o repositório e rode `npm run dev:open` (instruções abaixo).

---

## 🛠️ Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | **React 19**, **Vite 7**, **Tailwind CSS 4** |
| Áudio | **Web Audio API** (reprodução, `AudioContext`, pré-carregamento) |
| IA | **Ollama Cloud** (Gemma 4 31B) via **Axios** |
| Estado | Hooks customizados (`useAudioPlayer`, `useLoop`, `useChat`) |
| Qualidade | **ESLint**, **PropTypes** |

**Habilidades demonstradas:** integração com API de IA generativa · manipulação de áudio no browser · custom hooks · drag & drop · persistência local · parsing de linguagem/comandos · UI responsiva com Tailwind.

> 🔜 **Em evolução:** migração para **Next.js (App Router)** em andamento na branch [`migracao/nextjs-tailwind`](https://github.com/Lucas-Silva2601/baterIA/tree/migracao/nextjs-tailwind).

---

## ✨ Funcionalidades

- **Bateria jogável** — 11 instrumentos (bumbo, caixa, chimbal fechado/abrindo/aberto, tons, surdo, crash, condução, aro)
- **3 formas de tocar** — clique nos pads, teclas do teclado ou comandos da IA
- **Chat com IA** — peça ritmos em linguagem natural (*"faça um samba"*, *"algo rápido"*)
- **Loop inteligente** — a IA controla BPM (40–240) e instrumento do loop sozinha
- **Pads personalizáveis** — arraste com `Shift` + mouse; posições salvas automaticamente
- **Interface escura e responsiva** com animações e scrollbar customizada

---

## 🚀 Como executar

**Pré-requisitos:** Node.js 18+ e uma API key do [Ollama Cloud](https://ollama.com/settings/keys).

```bash
git clone https://github.com/Lucas-Silva2601/baterIA.git
cd baterIA
npm install
cp .env.example .env   # adicione sua VITE_OLLAMA_API_KEY
npm run dev:open        # abre http://localhost:5173 no navegador
```

| Ação | Comando npm | Windows (duplo-clique) |
|------|-------------|------------------------|
| ▶️ Executar + abrir navegador | `npm run dev:open` | `scripts/iniciar.bat` |
| ⏹️ Fechar o projeto | `npm run stop` | `scripts/parar.bat` |
| 🔄 Reiniciar | `npm run restart` | `scripts/reiniciar.bat` |
| 📦 Build de produção | `npm run build` | — |

---

## 🧠 Como a IA toca bateria (detalhe técnico)

O diferencial do projeto é o **protocolo de comandos**: a IA recebe um system prompt instruindo-a a embutir comandos nas respostas, e um parser (`src/utils/commandParser.js`) os interpreta:

- `(iniciar loop120A)` → inicia loop a 120 BPM no chimbal (A)
- `(final loop)` → para o loop
- Letras soltas (`ASWDJ...`) → sequência de pads tocada em ordem

Exemplo de resposta da IA:

```
ASWDJ
(iniciar loop120A)
WSADAF
```

Isso faz a IA **agir na interface**, não apenas conversar — um padrão aplicável a qualquer integração IA + UI.

---

## 📁 Estrutura

```
├── public/sounds/      # samples .wav dos 11 instrumentos
├── src/
│   ├── components/     # DrumPad, DrumKit, ChatBox, InputBox, LoopControls
│   ├── hooks/          # useAudioPlayer, useLoop, useChat
│   ├── services/       # integração com a Ollama Cloud API
│   └── utils/          # constantes, parser de comandos, helpers
├── scripts/            # controle do servidor (dev:open/stop/restart)
│   ├── stop-dev.mjs, restart-dev.mjs
│   └── iniciar|parar|reiniciar.(bat|ps1)  # atalhos Windows (duplo-clique)
└── README.md
```

---

## 🧩 Desafios superados

- **Política de autoplay dos navegadores** — `AudioContext` suspenso até a primeira interação; resolvido com ativação no primeiro clique e pré-carregamento dos samples.
- **Sincronia IA ↔ áudio** — respostas em streaming fatiadas em comandos executados em sequência sem travar a UI.
- **Drag & drop + persistência** — posições dos pads reconciliadas entre estado React e `localStorage`.

---

## 🔮 Roadmap

- [ ] Migração para Next.js (App Router) + Tailwind — em andamento
- [ ] Gravar e salvar ritmos
- [ ] Suporte a MIDI
- [ ] PWA com uso offline
- [ ] Temas customizáveis

---

<details>
<summary><strong>⌨️ Mapeamento de teclas</strong></summary>

| Tecla | Instrumento | Tecla | Instrumento |
|-------|-------------|-------|-------------|
| **A** | Chimbal Fechado | **R** | Surdo |
| **S** | Bumbo | **J** | Crash |
| **W** | Caixa | **K** | Condução |
| **D** | Tom 1 | **Z** | Chimbal Abrindo |
| **F** | Tom 2 | **X** | Aro |
| | | **C** | Chimbal Aberto |

</details>

<details>
<summary><strong>🐛 Troubleshooting</strong></summary>

- **Sons não tocam** → verifique `public/sounds/` e clique uma vez na página (política de autoplay).
- **IA não responde** → confira `VITE_OLLAMA_API_KEY` no `.env` e sua conexão.
- **Loop não funciona** → aguarde o carregamento dos sons e clique num pad primeiro.
- **Pads sumiram** → `localStorage.clear()` + recarregar a página.

</details>

---

## 👨‍💻 Autor

**Lucas Silva** — [@Lucas-Silva2601](https://github.com/Lucas-Silva2601)

Gostou do projeto? Deixe uma ⭐ no repositório!

## 📝 Licença

Distribuído sob a licença MIT — veja [LICENSE](LICENSE) para detalhes.

---

**Feito com ❤️, React e muita música 🎵**
