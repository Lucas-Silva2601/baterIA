# 🥁 Bateria Virtual com IA

Uma aplicação web interativa de bateria virtual com integração de Inteligência Artificial usando Groq API. Toque os pads da bateria, converse com a IA para criar ritmos incríveis e use o sistema de loop para praticar!

![Status](https://img.shields.io/badge/status-funcional-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Índice

- [Características](#-características)
- [Demonstração](#-demonstração)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
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

### Frontend
- **React 18.2.0** - Biblioteca UI
- **Vite 5.0** - Build tool
- **Web Audio API** - Reprodução de áudio

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

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

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
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção

# Preview
npm run preview      # Preview do build de produção

# Lint
npm run lint         # Verifica erros de código
```

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

Este projeto possui documentação completa e detalhada:

### 🚀 Guias de Início
- **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Comece a usar em 5 minutos
- **[README.md](README.md)** - Este arquivo (documentação principal)

### 📊 Relatórios de Desenvolvimento
- **[CHECKLIST.md](../CHECKLIST.md)** - Checklist completo de desenvolvimento (510 linhas)
- **[FASE1_CONCLUIDA.md](FASE1_CONCLUIDA.md)** - Relatório da Fase 1 (Setup)
- **[FASE2_CONCLUIDA.md](FASE2_CONCLUIDA.md)** - Relatório da Fase 2 (Utilitários)
- **[FASE3_CONCLUIDA.md](FASE3_CONCLUIDA.md)** - Relatório da Fase 3 (Serviços)
- **[FASE4_CONCLUIDA.md](FASE4_CONCLUIDA.md)** - Relatório da Fase 4 (Hooks)
- **[FASE5_CONCLUIDA.md](FASE5_CONCLUIDA.md)** - Relatório da Fase 5 (Componentes)
- **[FASE6-7_CONCLUIDA.md](FASE6-7_CONCLUIDA.md)** - Relatório das Fases 6 e 7 (App e Estilos)

### 🧪 Testes e Validação
- **[TESTES_VALIDACAO.md](TESTES_VALIDACAO.md)** - Relatório completo de testes (117 testes)

### 📈 Resumos e Certificados
- **[PROJETO_COMPLETO.md](PROJETO_COMPLETO.md)** - Resumo do projeto completo
- **[PROJETO_FINALIZADO.md](PROJETO_FINALIZADO.md)** - Certificado de conclusão
- **[RESUMO_FINAL.md](RESUMO_FINAL.md)** - Estatísticas finais do projeto
- **[INDICE_COMPLETO.md](INDICE_COMPLETO.md)** - Índice de todos os arquivos (37 arquivos)

### 🎉 Celebração
- **[PARABENS.md](PARABENS.md)** - Celebração da conclusão do projeto

**Total**: 14 documentos completos com mais de 2.000 linhas de documentação!

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
