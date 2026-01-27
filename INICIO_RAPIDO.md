# 🚀 GUIA DE INÍCIO RÁPIDO

**Projeto**: Bateria Virtual com IA  
**Tempo estimado**: 5 minutos  
**Dificuldade**: Fácil ⭐

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- ✅ **Node.js** (versão 16 ou superior)
- ✅ **npm** (vem com o Node.js)
- ✅ **Chave da API Groq** ([obtenha aqui](https://console.groq.com))
- ✅ **Editor de código** (VS Code recomendado)
- ✅ **Navegador moderno** (Chrome, Firefox, Edge, Safari)

---

## ⚡ 3 Passos para Começar

### 1️⃣ Instalar Dependências (2 minutos)

Abra o terminal na pasta do projeto e execute:

```bash
cd bateria-ia-react
npm install
```

**O que isso faz?**
- Instala React, Vite, Axios e outras dependências
- Configura o ambiente de desenvolvimento
- Prepara o projeto para execução

---

### 2️⃣ Configurar API Key (1 minuto)

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua `sua_chave_groq_aqui` pela sua chave real:

```env
VITE_GROQ_API_KEY=gsk_sua_chave_real_aqui
```

**Onde obter a chave?**
1. Acesse: https://console.groq.com
2. Faça login ou crie uma conta
3. Vá em "API Keys"
4. Clique em "Create API Key"
5. Copie a chave e cole no arquivo `.env`

---

### 3️⃣ Iniciar o Servidor (1 minuto)

No terminal, execute:

```bash
npm run dev
```

**O que você verá?**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Acesse**: http://localhost:5173

---

## 🎉 Pronto! Agora você pode:

### 🥁 Tocar a Bateria
- **Clique** nos pads para tocar
- **Tecle** A, S, W, D, F, R, J, K, Z para tocar
- **Shift + Arraste** para mover os pads

### 🔄 Usar o Loop
- Clique em **"Iniciar Loop"**
- Escolha o **BPM** (80, 120 ou 160)
- Escolha o **instrumento** (A, J ou K)
- Veja o **contador** de loops

### 🤖 Conversar com a IA
- Digite no campo de chat
- Pressione **Enter** ou clique em **"Enviar"**
- A IA responderá e pode tocar ritmos!

---

## 🎹 Mapeamento de Teclas

| Tecla | Instrumento |
|-------|-------------|
| **A** | Chimbal Fechado |
| **S** | Bumbo |
| **W** | Caixa |
| **D** | Tom 1 |
| **F** | Tom 2 |
| **R** | Surdo |
| **J** | Crash |
| **K** | Condução |
| **Z** | Chimbal Aberto |

---

## 🤖 Comandos da IA

### Iniciar Loop
Digite no chat:
```
Toque um loop de bumbo a 120 BPM
```

A IA responderá com:
```
(iniciar loop120S)
```

### Parar Loop
Digite no chat:
```
Pare o loop
```

A IA responderá com:
```
(final loop)
```

### Tocar Sequência
Digite no chat:
```
Toque um ritmo básico
```

A IA pode responder:
```
Claro! Vou tocar: S W S W
```

E os sons serão tocados automaticamente!

---

## 🎨 Interface

### Lado Esquerdo: Bateria Virtual
- 9 pads coloridos
- Clique para tocar
- Shift + Arraste para mover
- Botão "Resetar Posições"

### Lado Direito: Chat e Controles
- **Topo**: Controles de Loop
  - Status (Ativo/Inativo)
  - Seletor de BPM
  - Seletor de Instrumento
  - Contador de Loops
- **Centro**: Chat com IA
  - Histórico de mensagens
  - Scroll automático
  - Indicador "digitando..."
- **Rodapé**: Campo de Entrada
  - Digite sua mensagem
  - Enter para enviar

---

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
```

### Build
```bash
npm run build        # Cria build de produção
npm run preview      # Preview do build
```

### Qualidade
```bash
npm run lint         # Verifica erros de código
```

---

## ❓ Problemas Comuns

### ❌ Erro: "Cannot find module"
**Solução**: Execute `npm install` novamente

### ❌ Erro: "API key not found"
**Solução**: Verifique se o arquivo `.env` existe e tem a chave correta

### ❌ Erro: "Port 5173 is already in use"
**Solução**: 
1. Feche outros servidores Vite
2. Ou use: `npm run dev -- --port 3000`

### ❌ Sons não tocam
**Solução**: 
1. Clique em qualquer lugar da página primeiro
2. Verifique se os arquivos .wav estão em `public/sounds/`

### ❌ IA não responde
**Solução**:
1. Verifique a chave da API no `.env`
2. Verifique sua conexão com a internet
3. Veja o console do navegador (F12) para erros

---

## 📚 Documentação Completa

Para mais informações, consulte:

- 📖 [README.md](README.md) - Documentação completa
- 📋 [CHECKLIST.md](../CHECKLIST.md) - Checklist de desenvolvimento
- 🧪 [TESTES_VALIDACAO.md](TESTES_VALIDACAO.md) - Testes realizados
- 📊 [PROJETO_FINALIZADO.md](PROJETO_FINALIZADO.md) - Certificado de conclusão
- 📈 [RESUMO_FINAL.md](RESUMO_FINAL.md) - Estatísticas do projeto
- 📑 [INDICE_COMPLETO.md](INDICE_COMPLETO.md) - Índice de todos os arquivos
- 🎉 [PARABENS.md](PARABENS.md) - Celebração da conclusão

---

## 💡 Dicas Rápidas

### Para Melhor Experiência:
1. ✅ Use fones de ouvido
2. ✅ Ajuste o volume do sistema
3. ✅ Use um navegador moderno
4. ✅ Tela em modo paisagem (landscape)
5. ✅ Boa conexão com a internet (para IA)

### Para Desenvolvedores:
1. ✅ Abra o DevTools (F12)
2. ✅ Veja o console para logs
3. ✅ Use React DevTools
4. ✅ Teste em diferentes navegadores
5. ✅ Leia o código fonte

---

## 🎯 Próximos Passos

Depois de testar o projeto:

1. 🎨 **Personalize** - Mude cores, sons, layout
2. 🧩 **Expanda** - Adicione novos instrumentos
3. 🚀 **Deploy** - Publique no Vercel/Netlify
4. 📱 **Compartilhe** - Mostre para amigos
5. 💼 **Portfolio** - Adicione ao seu portfólio

---

## 🆘 Precisa de Ajuda?

### Recursos:
- 📖 Leia o [README.md](README.md)
- 🔍 Veja o [Troubleshooting](README.md#-troubleshooting)
- 💬 Abra uma Issue no GitHub
- 📧 Entre em contato

### Links Úteis:
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Groq Docs](https://console.groq.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## ✅ Checklist de Início

Antes de começar a usar:

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Chave da API Groq configurada (`.env`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Navegador aberto em `http://localhost:5173`
- [ ] Sons funcionando (clique em um pad)
- [ ] IA respondendo (envie uma mensagem)
- [ ] Loop funcionando (inicie um loop)

---

## 🎊 Tudo Pronto!

**Parabéns! Você está pronto para usar a Bateria Virtual com IA!**

### Agora você pode:
- 🥁 Tocar bateria virtualmente
- 🔄 Criar loops profissionais
- 🤖 Conversar com IA
- 🎨 Personalizar a interface
- 🚀 Compartilhar com o mundo

---

## 📊 Tempo Total

- ⏱️ **Instalação**: ~2 minutos
- ⏱️ **Configuração**: ~1 minuto
- ⏱️ **Inicialização**: ~1 minuto
- ⏱️ **Primeiro teste**: ~1 minuto

**Total**: ~5 minutos ⚡

---

## 🌟 Aproveite!

**Você está a apenas 5 minutos de tocar bateria com IA!**

Siga os 3 passos acima e divirta-se! 🎵

---

**🥁 Toque, crie e divirta-se! 🎵**

---

**Criado em**: 26/01/2026  
**Status**: ✅ Pronto para uso  
**Dificuldade**: ⭐ Fácil  
**Tempo**: ⚡ 5 minutos
