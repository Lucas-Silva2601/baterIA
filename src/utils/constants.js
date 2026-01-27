// Configurações de cores
export const COLORS = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#c8c8c8',
  BLUE: '#0000ff',
  LIGHT_BLUE: '#6464ff',
  DARK_GRAY: '#323232',
  RED: '#ff0000',
  GREEN: '#00ff00',
};

// Mapeamento de sons da bateria
export const DRUM_SOUNDS = {
  A: {
    file: '/sounds/chimbal_fechado.wav',
    name: 'Chimbal Fechado',
    key: 'A',
    color: COLORS.GRAY,
  },
  S: {
    file: '/sounds/bumbo.wav',
    name: 'Bumbo',
    key: 'S',
    color: COLORS.GRAY,
  },
  W: {
    file: '/sounds/caixa.wav',
    name: 'Caixa',
    key: 'W',
    color: COLORS.GRAY,
  },
  D: {
    file: '/sounds/tom1.wav',
    name: 'Tom 1',
    key: 'D',
    color: COLORS.GRAY,
  },
  F: {
    file: '/sounds/tom2.wav',
    name: 'Tom 2',
    key: 'F',
    color: COLORS.GRAY,
  },
  R: {
    file: '/sounds/surdo.wav',
    name: 'Surdo',
    key: 'R',
    color: COLORS.GRAY,
  },
  J: {
    file: '/sounds/crash.wav',
    name: 'Crash',
    key: 'J',
    color: COLORS.GRAY,
  },
  K: {
    file: '/sounds/conducao.wav',
    name: 'Condução',
    key: 'K',
    color: COLORS.GRAY,
  },
  Z: {
    file: '/sounds/chimbal_abrindo.wav',
    name: 'Chimbal Abrindo',
    key: 'Z',
    color: COLORS.GRAY,
  },
  X: {
    file: '/sounds/aro.wav',
    name: 'Aro',
    key: 'X',
    color: COLORS.GRAY,
  },
  C: {
    file: '/sounds/chimbal_aberto.wav',
    name: 'Chimbal Aberto',
    key: 'C',
    color: COLORS.GRAY,
  },
};

// Posições iniciais dos pads (pode ser customizado pelo usuário)
export const INITIAL_PAD_POSITIONS = {
  A: { x: 50, y: 50 },
  S: { x: 150, y: 50 },
  W: { x: 250, y: 50 },
  D: { x: 350, y: 50 },
  F: { x: 450, y: 50 },
  R: { x: 550, y: 50 },
  J: { x: 650, y: 50 },
  K: { x: 750, y: 50 },
  Z: { x: 50, y: 150 },
  X: { x: 150, y: 150 },
  C: { x: 250, y: 150 },
};

// Configurações de BPM disponíveis
export const BPM_OPTIONS = {
  SLOW: 80,
  MEDIUM: 120,
  FAST: 160,
};

// Sons disponíveis para loop
export const LOOP_SOUNDS = ['A', 'J', 'K'];

// Configurações de áudio
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.7,
  PLAYBACK_DELAY: 150, // ms entre notas ao tocar sequência
};

// Dimensões da tela
export const SCREEN_CONFIG = {
  WIDTH: 1000,
  HEIGHT: 780,
};

// Configurações do chat
export const CHAT_CONFIG = {
  MAX_MESSAGES: 100,
  SCROLL_SPEED: 30,
};

// Prompt do sistema para a IA Groq - API Mode (JSON Only)
export const SYSTEM_PROMPT = `Você é o "baterIA", um assistente musical inteligente e baterista virtual.
Você é entusiasta, criativo e fala como um músico experiente.

IMPORTANTE: Sua resposta deve ter DUAS PARTES:

1. TEXTO AMIGÁVEL (primeira linha):
   - Responda de forma natural e amigável
   - Explique o que você está tocando
   - Seja conciso mas informativo
   - Use emojis musicais 🎵🎸🥁

2. COMANDO JSON (última linha):
   - Sempre termine com um objeto JSON válido
   - JSON em uma linha separada

FORMATO DE RESPOSTA:
[Seu texto amigável aqui]
{"bpm": 120, "pattern": "S+A-A-W+A-A-S+A-A-W+A-A", "action": "LOOP"}

LEGENDA DE TECLAS:
- S = Bumbo (Kick)
- W = Caixa (Snare)
- A = Chimbal Fechado (Hi-hat Closed)
- Z = Chimbal Abrindo (Hi-hat Opening)
- C = Chimbal Aberto (Hi-hat Open)
- J = Crash (Prato de Ataque)
- K = Condução (Ride)
- D = Tom 1
- F = Tom 2
- R = Surdo (Floor Tom)
- X = Aro (Rimshot)
- _ = Pausa/Silêncio (Rest)

SONS SIMULTÂNEOS: Use "+" entre teclas no mesmo beat (ex: "S+A" = Bumbo + Chimbal juntos)

EXEMPLOS DE RESPOSTA:

Pedido: "Faz um beat de rock"
Resposta: Beleza! Aqui vai um rock clássico em 120 BPM. Perfeito pra começar! 🎸
{"bpm": 120, "pattern": "S+A-A-W+A-A-S+A-A-W+A-A", "action": "LOOP"}

Pedido: "Hip hop pesadão"
Resposta: Show! Um boom bap clássico em 90 BPM. Groove pesado! 🎤
{"bpm": 90, "pattern": "S-_-W-_-S-S-W-_", "action": "LOOP"}

Pedido: "Para"
Resposta: Parando o loop agora! 🛑
{"action": "STOP"}

Pedido: "Como você está?"
Resposta: Tô firme! Pronto pra tocar qualquer ritmo que você quiser! 🥁

Se o usuário não pedir música, converse normalmente SEM enviar JSON.

BIBLIOTECA DE RITMOS (Use como base):
- Rock Básico: {"bpm": 120, "pattern": "S+A-A-W+A-A-S+A-A-W+A-A", "action": "LOOP"}
- Disco/Dance: {"bpm": 120, "pattern": "S+A-Z-W+A-Z-S+A-Z-W+A-Z", "action": "LOOP"}
- Punk Rápido: {"bpm": 180, "pattern": "S+K-K-W+K-K", "action": "LOOP"}
- Hip Hop: {"bpm": 90, "pattern": "S-_-W-_-S-S-W-_", "action": "LOOP"}
- Samba: {"bpm": 110, "pattern": "S+A-A-W+A-A-W-A", "action": "LOOP"}
- Funk: {"bpm": 100, "pattern": "S-_-W-S-_-S-W-_", "action": "LOOP"}
`;

// Instruções para o usuário
export const INSTRUCTIONS = [
  'Clique nos botões ou use o teclado para tocar',
  'Shift + Arrastar: Mover botões',
  'Comandos: (iniciar loopBPMX), (final loop)',
];

// Regex para comandos especiais
export const COMMAND_PATTERNS = {
  START_LOOP: /\(iniciar loop(\d+)([A-Z])\)/i,
  STOP_LOOP: /\(final loop\)/i,
};

// ===========================
// BACKING TRACKS PRESETS
// ===========================

export const BACKING_TRACKS = {
  ROCK_BASIC: {
    name: 'Rock Básico',
    genre: 'Rock',
    bpm: 120,
    pattern: 'S+A-A-W+A-A-S+A-A-W+A-A',
    description: 'Batida clássica de rock 4/4',
    emoji: '🎸',
  },
  ROCK_HEAVY: {
    name: 'Rock Pesado',
    genre: 'Rock',
    bpm: 140,
    pattern: 'S+A-A-W+A-S+A-A-W+A-A-S+A',
    description: 'Rock com bumbo duplo',
    emoji: '🤘',
  },
  BLUES_SHUFFLE: {
    name: 'Blues Shuffle',
    genre: 'Blues',
    bpm: 90,
    pattern: 'S+K-K-W+K-K-S+K-K-W+K-K',
    description: 'Shuffle clássico de blues',
    emoji: '🎺',
  },
  JAZZ_SWING: {
    name: 'Jazz Swing',
    genre: 'Jazz',
    bpm: 140,
    pattern: 'S+K-K+A-K-W+K-K-S+K-K+A-K-W+K-K',
    description: 'Swing jazz com condução',
    emoji: '🎷',
  },
  HIP_HOP: {
    name: 'Hip Hop',
    genre: 'Hip Hop',
    bpm: 90,
    pattern: 'S-_-W-_-S-S-W-_',
    description: 'Boom bap clássico',
    emoji: '🎤',
  },
  FUNK: {
    name: 'Funk Groove',
    genre: 'Funk',
    bpm: 100,
    pattern: 'S-_-W-S-_-S-W-_',
    description: 'Groove funk sincopado',
    emoji: '🕺',
  },
  DISCO: {
    name: 'Disco Dance',
    genre: 'Disco',
    bpm: 120,
    pattern: 'S+A-Z-W+A-Z-S+A-Z-W+A-Z',
    description: 'Batida disco com chimbal aberto',
    emoji: '🪩',
  },
  PUNK: {
    name: 'Punk Rock',
    genre: 'Punk',
    bpm: 180,
    pattern: 'S+K-K-W+K-K',
    description: 'Punk rápido e direto',
    emoji: '⚡',
  },
  SAMBA: {
    name: 'Samba',
    genre: 'Samba',
    bpm: 110,
    pattern: 'S+A-A-W+A-A-W-A',
    description: 'Batida de samba brasileira',
    emoji: '🇧🇷',
  },
  BOSSA_NOVA: {
    name: 'Bossa Nova',
    genre: 'Bossa',
    bpm: 130,
    pattern: 'S+X-_-W+X-_-S-_-W+X-_',
    description: 'Bossa nova com aro',
    emoji: '🌴',
  },
  REGGAE: {
    name: 'Reggae',
    genre: 'Reggae',
    bpm: 80,
    pattern: '_-S+A-_-W+A-_-S+A-_-W+A',
    description: 'One drop reggae',
    emoji: '🌿',
  },
  METAL: {
    name: 'Metal',
    genre: 'Metal',
    bpm: 160,
    pattern: 'S-S-W+A-S-S-S-W+A-S',
    description: 'Double bass metal',
    emoji: '🔥',
  },
};
