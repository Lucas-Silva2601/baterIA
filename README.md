# 🥁 Bateria Virtual com IA

> **Branch atual:** `migracao/nextjs-tailwind` — branch de trabalho para migrar o projeto para **React.js + Next.js + Tailwind CSS**.
> O código atual ainda roda em **React 19 + Vite 7 + Tailwind CSS v4**. O Tailwind já está em uso (se necessário = já atendido), e a migração para Next.js será feita nesta branch por etapas (ver [Plano de Migração](#-plano-de-migração-para-nextjs)).

Uma aplicação web interativa de bateria virtual com integração de Inteligência Artificial usando Groq API. Toque os pads da bateria, converse com a IA para criar ritmos incríveis e use o sistema de loop para praticar!

![Status](https://img.shields.io/badge/status-funcional-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Next.js](https://img.shields.io/badge/Next.js-migra%C3%A7%C3%A3o_planejada-black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Índice

- [Características](#-características)
- [Demonstração](#-demonstração)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Execução rápida (abrir / parar / reiniciar)](#-execução-rápida-abrir--parar--reiniciar)
- [Plano de Migração para Next.js](#-plano-de-migração-para-nextjs)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Comandos da IA](#-comandos-da-ia)
- [Mapeamento de Teclas](#-mapeamento-de-teclas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Troubleshooting](#-troubleshooting)
- [Contribuindo](#-contribuindo)
- [Documentação Adicional](#-documentação-adicional)
- [Licença](#-licença)

---

## ✨ Características

### 🎵 Bateria Virtual
- **11 instrumentos** diferentes (Chimbal Fechado/Abrindo/Aberto, Bumbo, Caixa, Toms, Surdo, Crash, Condução, Aro)
- **Clique ou teclado** para tocar
- **Drag & Drop** - Arraste os pads com Shift + Mouse
- **Posições persistentes** - Salvas no localStorage
- **Feedback visual** ao tocar

### 🤖 IA Integrada (Groq)
- **Chat inteligente** com IA
- **Criação de ritmos** automática
- **Comandos especiais** para controlar o loop
- **Processamento automático** de sequências musicais

### 🔁 Sistema de Loop
- **3 opções de BPM**: 80 (Lento), 120 (Médio), 160 (Rápido)
- **3 instrumentos** para loop: Chimbal (A), Crash (J), Condução (K)
- **Contador de loops** em tempo real
- **Controle via IA** ou interface

### 🎨 Interface Moderna
- **Design responsivo** e intuitivo
- **Tema escuro** com cores vibrantes
- **Animações suaves**
- **Scrollbar customizada**
- **Background personalizado**

---

## 🎬 Demonstração

### Tela Principal
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

---

## 🛠 Tecnologias

### Estado atual (branch `migracao/nextjs-tailwind`)
- **React 19.2.0** - Biblioteca UI (ver `package.json`)
- **Vite 7.2.4** - Build tool / dev server atual
- **Tailwind CSS 4.1.18** - Estilos (via `@tailwindcss/postcss` + `@import "tailwindcss"`) — já atende ao requisito de Tailwind
- **Web Audio API** - Reprodução de áudio

### Alvo da migração
- **Next.js (App Router)** - SSR/SSG, rotas e otimizações — migração a ser executada nesta branch
- **Tailwind CSS** - Mantido (só ajustar config para o padrão do Next.js se necessário)

### Backend/API
- **Groq API** - IA (Llama 3.3 70B)
- **Axios** - Cliente HTTP

### Ferramentas
- **ESLint** - Linting
- **PropTypes** - Validação de props

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Conta Groq** (para API key)

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bateria-ia.git
cd bateria-ia/bateria-ia-react
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua API key do Groq:

```env
VITE_GROQ_API_KEY=sua_chave_aqui
```

### 4. Inicie o servidor de desenvolvimento (já abre o navegador)

```bash
npm run dev:open
```

O aplicativo estará disponível em `http://localhost:5173` e o navegador abre automaticamente.

> Atalhos Windows (duplo-clique):
> - `iniciar.bat` / `iniciar.ps1` → instala deps se faltar + `npm run dev:open`
> - `parar.bat` / `parar.ps1` → fecha o projeto (libera portas 5173–5175)
> - `reiniciar.bat` / `reiniciar.ps1` → para + inicia + abre o navegador

---

## ▶️ Execução rápida (abrir / parar / reiniciar)

| Ação | npm | Windows (duplo-clique) |
|------|-----|------------------------|
| Executar + abrir navegador | `npm run dev:open` (ou `npm start`) | `iniciar.bat` ou `.\iniciar.ps1` |
| Fechar o projeto | `npm run stop` | `parar.bat` ou `.\parar.ps1` |
| Restartar o projeto | `npm run restart` | `reiniciar.bat` ou `.\reiniciar.ps1` |
| Dev sem abrir navegador | `npm run dev` | — |
| Preview do build + abrir navegador | `npm run preview` | — |

Detalhes:
- `npm run dev:open` = `vite --open` (sobe na porta `5173` e abre `http://localhost:5173`).
- `npm run stop` = `node scripts/stop-dev.mjs` (mata os PIDs em `LISTENING` nas portas `5173/5174/5175`; não mata `node.exe` genérico por segurança).
- `npm run restart` = `node scripts/restart-dev.mjs` (executa o stop, aguarda ~1,5s e roda `dev:open`).
- Se o PowerShell bloquear `.ps1`, rode uma vez: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Criar/entrar nesta branch

```bash
git fetch origin
git checkout migracao/nextjs-tailwind
# ou, se a branch ainda só existe local:
# git push -u origin migracao/nextjs-tailwind
```

---

## 🔜 Plano de Migração para Next.js

Escopo previsto nesta branch `migracao/nextjs-tailwind` (nada migrado ainda — só preparação):

1. **Setup Next.js**: `npx create-next-app@latest` (App Router, Tailwind yes, ESLint yes) ou migração incremental com `npm i next`.
2. **Portar `src/`**: `App.jsx` → `app/page.jsx`, `main.jsx` → `app/layout.jsx`, `index.css` → `app/globals.css`, componentes/hooks/services/utils para `app/` ou `src/`.
3. **Ajustes obrigatórios**: `'use client'` em componentes com `AudioContext`, `localStorage`, drag & drop e chat; mover `VITE_GROQ_API_KEY` → `NEXT_PUBLIC_GROQ_API_KEY`; mover `public/sounds` e `public/images` para `public/` do Next.
4. **Tailwind**: manter v4 (`@import "tailwindcss"`) ou alinhar com a versão instalada pelo `create-next-app`; revisar `tailwind.config.js` / `postcss.config.js`.
5. **Build/validar**: `npm run dev`, `npm run build`, testar sons, loop, chat IA e drag & drop.
6. **Scripts**: manter `iniciar/parar/reiniciar` atualizando a porta para `3000` quando o Next.js assumir (hoje é `5173` do Vite).

> Status Tailwind: **já necessário e já em uso** — nenhuma instalação extra foi feita agora. Só revisar na hora do Next.js se o scaffold pedir versão diferente.

---

## ⚙️ Configuração

### Obtendo a API Key do Groq

1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta ou faça login
3. Navegue até **API Keys**
4. Clique em **Create API Key**
5. Copie a chave gerada
6. Cole no arquivo `.env`

### Estrutura do .env

```env
# API Key do Groq (obrigatório)
VITE_GROQ_API_KEY=gsk_sua_chave_aqui
```

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` no Git!

---

## 📖 Como Usar

### 1. Tocar a Bateria

#### Método 1: Clique
- Clique nos pads coloridos para tocar os sons

#### Método 2: Teclado
- Pressione as teclas correspondentes (A, S, W, D, F, R, J, K, Z)

#### Método 3: Arrastar
- Segure **Shift** + Arraste o pad para reposicionar
- As posições são salvas automaticamente

### 2. Usar o Loop

#### Iniciar/Parar Loop
1. Clique no botão **▶️ INICIAR** ou **⏹️ PARAR**
2. O loop tocará o instrumento selecionado no BPM escolhido

#### Mudar BPM
- Clique em **80**, **120** ou **160**
- O loop será reiniciado automaticamente

#### Mudar Instrumento
- Clique em **A** (Chimbal), **J** (Crash) ou **K** (Condução)

### 3. Conversar com a IA

#### Enviar Mensagem
1. Digite sua mensagem no campo de texto
2. Pressione **Enter** ou clique em **Enviar**
3. A IA responderá com ritmos e comandos

#### Exemplos de Mensagens
```
"Crie um ritmo de rock"
"Faça um samba"
"Toque algo rápido"
"Inicie um loop de 120 BPM no chimbal"
```

---

## 🎮 Comandos da IA

A IA pode enviar comandos especiais para controlar o loop:

### Iniciar Loop
```
(iniciar loop120A)
```
- **120**: BPM (40-240)
- **A**: Instrumento (A, J, K)

### Parar Loop
```
(final loop)
```

### Exemplos Completos

#### Resposta da IA:
```
ASWDJ
(iniciar loop120A)
WSADAF
```

**O que acontece:**
1. Toca a sequência: A-S-W-D-J
2. Inicia loop de 120 BPM no Chimbal (A)
3. Toca a sequência: W-S-A-D-A-F

---

## ⌨️ Mapeamento de Teclas

| Tecla | Instrumento | Arquivo |
|-------|-------------|---------|
| **A** | Chimbal Fechado | `chimbal_fechado.wav` |
| **S** | Bumbo | `bumbo.wav` |
| **W** | Caixa | `caixa.wav` |
| **D** | Tom 1 | `tom1.wav` |
| **F** | Tom 2 | `tom2.wav` |
| **R** | Surdo | `surdo.wav` |
| **J** | Crash | `crash.wav` |
| **K** | Condução | `conducao.wav` |
| **Z** | Chimbal Abrindo | `chimbal_abrindo.wav` |
| **X** | Aro | `aro.wav` |
| **C** | Chimbal Aberto | `chimbal_aberto.wav` |

---

## 📁 Estrutura do Projeto

```
bateria-ia-react/
├── public/
│   ├── sounds/              # Arquivos de áudio (.wav)
│   │   ├── bumbo.wav
│   │   ├── caixa.wav
│   │   ├── chimbal_aberto.wav
│   │   ├── chimbal_fechado.wav
│   │   ├── conducao.wav
│   │   ├── crash.wav
│   │   ├── surdo.wav
│   │   ├── tom1.wav
│   │   └── tom2.wav
│   └── images/
│       └── fundo_bateria.jpg
├── src/
│   ├── components/          # Componentes React
│   │   ├── DrumPad.jsx      # Pad individual
│   │   ├── DrumKit.jsx      # Conjunto de pads
│   │   ├── ChatBox.jsx      # Área de chat
│   │   ├── InputBox.jsx     # Campo de entrada
│   │   ├── LoopControls.jsx # Controles de loop
│   │   └── index.js
│   ├── hooks/               # Hooks customizados
│   │   ├── useAudioPlayer.js # Gerenciamento de áudio
│   │   ├── useLoop.js        # Sistema de loop
│   │   ├── useChat.js        # Lógica do chat
│   │   └── index.js
│   ├── services/            # Serviços externos
│   │   ├── groqAPI.js       # Integração Groq
│   │   └── index.js
│   ├── utils/               # Utilitários
│   │   ├── constants.js     # Constantes
│   │   ├── commandParser.js # Parser de comandos
│   │   ├── helpers.js       # Funções auxiliares
│   │   └── index.js
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos globais
│   ├── main.jsx             # Entry point
│   └── index.css            # Reset CSS
├── .env                     # Variáveis de ambiente
├── .env.example             # Template do .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor Vite (sem abrir navegador)
npm run dev:open     # Inicia + abre http://localhost:5173 no navegador
npm start            # Atalho para dev:open

# Controle do projeto
npm run stop         # Fecha o projeto (libera portas 5173/5174/5175)
npm run restart      # Para + inicia + abre o navegador

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Preview do build de produção (+ abre navegador)

# Lint
npm run lint         # Verifica erros de código
```

Windows (duplo-clique na raiz do projeto): `iniciar.bat` / `parar.bat` / `reiniciar.bat` (ou os equivalentes `.ps1`).

---

## 🐛 Troubleshooting

### Problema: Sons não tocam

**Solução:**
- Verifique se os arquivos `.wav` estão em `public/sounds/`
- Clique em qualquer lugar da página primeiro (política de autoplay)
- Verifique o console do navegador para erros

### Problema: IA não responde

**Solução:**
- Verifique se a API key está configurada corretamente no `.env`
- Verifique sua conexão com a internet
- Verifique se há créditos na sua conta Groq
- Veja o console para mensagens de erro específicas

### Problema: Loop não funciona

**Solução:**
- Certifique-se de que os sons foram carregados (aguarde a tela de loading)
- Clique em um pad primeiro para ativar o AudioContext
- Verifique se o BPM está entre 40-240

### Problema: Pads não aparecem

**Solução:**
- Limpe o localStorage: `localStorage.clear()`
- Recarregue a página
- Clique em "Resetar Posições"

### Problema: Erro de CORS

**Solução:**
- Certifique-se de estar rodando com `npm run dev`
- Não abra o `index.html` diretamente no navegador

---

## 🎨 Personalização

### Mudar Cores

Edite `src/utils/constants.js`:

```javascript
export const COLORS = {
  BLUE: '#0000ff',        // Cor primária
  LIGHT_BLUE: '#6464ff',  // Cor secundária
  // ... outras cores
};
```

### Adicionar Novos Sons

1. Adicione o arquivo `.wav` em `public/sounds/`
2. Edite `src/utils/constants.js`:

```javascript
export const DRUM_SOUNDS = {
  // ... sons existentes
  'Q': {
    file: '/sounds/novo_som.wav',
    name: 'Novo Som',
    key: 'Q',
    color: COLORS.GRAY,
  },
};
```

### Mudar Posições Padrão

Edite `src/utils/constants.js`:

```javascript
export const INITIAL_PAD_POSITIONS = {
  A: { x: 50, y: 50 },
  S: { x: 150, y: 50 },
  // ... outras posições
};
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📚 Documentação Adicional

A documentação foi consolidada neste `README.md`. Os arquivos `.md` auxiliares de desenvolvimento (fases, checklists, resumos e relatórios) foram removidos da branch `migracao/nextjs-tailwind` para manter o repositório limpo — o histórico continua disponível no Git (`git log -- --name-only -- "*.md"`).

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- Email: seu-email@example.com

---

## 🙏 Agradecimentos

- **Groq** pela API de IA incrível
- **React** pela biblioteca UI
- **Vite** pelo build tool rápido
- **Web Audio API** pela reprodução de áudio

---

## 📊 Status do Projeto

- ✅ Bateria Virtual - Funcional
- ✅ Sistema de Loop - Funcional
- ✅ Chat com IA - Funcional
- ✅ Drag & Drop - Funcional
- ✅ Persistência - Funcional
- ✅ Responsivo - Funcional

---

## 🔮 Roadmap

- [ ] Adicionar mais instrumentos
- [ ] Gravar e salvar ritmos
- [ ] Compartilhar ritmos com outros usuários
- [ ] Modo multiplayer
- [ ] Suporte a MIDI
- [ ] Temas customizáveis
- [ ] PWA (Progressive Web App)

---

## 📞 Suporte

Se você tiver problemas ou dúvidas:

1. Verifique a seção [Troubleshooting](#-troubleshooting)
2. Abra uma [Issue](https://github.com/seu-usuario/bateria-ia/issues)
3. Entre em contato via email

---

## ⭐ Star o Projeto

Se você gostou do projeto, dê uma ⭐ no GitHub!

---

**Desenvolvido com ❤️ e muita música 🎵**
