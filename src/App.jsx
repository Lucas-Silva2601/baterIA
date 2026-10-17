import { useCallback, useState } from 'react';
import { DrumKit, Header, SmartControls, DrumSticks, ChatInterface, LoopVisualizer } from './components';
import { useAudioPlayer, useLoop, useChat } from './hooks';

/**
 * App.jsx - Bateria AI Studio v2.0
 * Design Profissional com Chat, Loop Infinito e Backing Tracks
 */
function App() {
  const [activeKey, setActiveKey] = useState(null);

  // ===========================
  // HOOKS
  // ===========================
  
  const audioPlayer = useAudioPlayer();
  const { 
    playSound, 
    resumeAudioContext, 
    isLoading: audioLoading,
    getLoadingStats 
  } = audioPlayer;

  const loopControls = useLoop(playSound);
  const {
    isActive: loopActive,
    bpm,
    loopCount,
    pattern,
    currentStep,
    stopLoop,
    toggleLoop,
  } = loopControls;

  const {
    messages,
    isLoading: chatLoading,
    isTyping,
    error: chatError,
    sendMessageAndPlay,
  } = useChat(loopControls);

  // ===========================
  // HANDLERS
  // ===========================
  
  const handleSendMessage = useCallback(async (text) => {
    await resumeAudioContext();
    await sendMessageAndPlay(text);
  }, [sendMessageAndPlay, resumeAudioContext]);

  const handlePlaySound = useCallback(async (key) => {
    await resumeAudioContext();
    playSound(key);
    
    // Animação visual
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 200);
  }, [playSound, resumeAudioContext]);

  const handleToggleLoop = useCallback(async () => {
    await resumeAudioContext();
    toggleLoop();
  }, [toggleLoop, resumeAudioContext]);

  const handleStopLoop = useCallback(() => {
    stopLoop();
  }, [stopLoop]);

  // ===========================
  // RENDER: LOADING
  // ===========================
  
  if (audioLoading) {
    const stats = getLoadingStats();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-6 animate-bounce">🥁</div>
          <div className="text-white text-2xl font-bold mb-3">
            baterIA - Carregando Sons...
          </div>
          <div className="text-slate-400 text-lg mb-6">
            {stats.loaded} / {stats.total} arquivos ({stats.percentage}%)
          </div>
          <div className="w-80 h-3 bg-slate-800 rounded-full overflow-hidden mx-auto shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-300 rounded-full shadow-lg shadow-cyan-500/50"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ===========================
  // RENDER: MAIN APP
  // ===========================
  
  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-hidden">
      
      {/* Header Sofisticado */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Background com Imagem de Bateria */}
        <div className="fixed inset-0 bg-[url('/images/fundo_bateria.jpg')] bg-cover bg-center opacity-20 blur-sm pointer-events-none" />
        <div className="fixed inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950/80 pointer-events-none" />

        {/* Content Grid */}
        <div className="relative z-10 p-4 md:p-8 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
            
            {/* ========================================
                ESQUERDA: Bateria com Baquetas Animadas
                ======================================== */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Área da Bateria */}
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 
                            rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-xl 
                            overflow-hidden min-h-[560px] xl:h-[640px]">
                
                {/* Efeito de Stage Light */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 
                              bg-gradient-radial from-cyan-500/10 via-transparent to-transparent 
                              blur-3xl pointer-events-none" />
                
                {/* Bateria Real como Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <img 
                    src="/images/fundo_bateria.jpg" 
                    alt="Bateria" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Baquetas Animadas */}
                <DrumSticks activeKey={activeKey} />

                {/* Pads da Bateria */}
                <div className="relative z-10 h-full flex items-center justify-center p-8">
                  <DrumKit
                    onPlay={handlePlaySound}
                    activeKey={activeKey}
                    isDraggable={true}
                  />
                </div>

                {/* Visualizador de Frequência (quando tocando) */}
                {loopActive && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-cyan-500 to-violet-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Loop Visualizer */}
              {pattern && (
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 
                              rounded-2xl border border-slate-700/50 backdrop-blur-xl p-6">
                  <LoopVisualizer
                    pattern={pattern.join('-')}
                    currentStep={currentStep}
                    bpm={bpm}
                    isActive={loopActive}
                  />
                  
                  {/* Controles do Loop */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={handleToggleLoop}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wide
                               transition-all hover:scale-105 active:scale-95 shadow-lg ${
                        loopActive
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                          : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                      }`}
                    >
                      {loopActive ? '⏸ Pausar' : '▶ Tocar'}
                    </button>
                    <button
                      onClick={handleStopLoop}
                      disabled={!loopActive}
                      className="px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wide
                               bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                               text-white transition-all hover:scale-105 active:scale-95 shadow-lg
                               disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      ⏹ Parar
                    </button>
                  </div>
                </div>
              )}

              {/* Instruções Elegantes */}
              <div className="text-center">
                <p className="text-sm text-slate-500 flex items-center justify-center gap-4 flex-wrap px-2">
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs">Click</kbd>
                    ou use o teclado
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs">⇧ Shift</kbd>
                    + Arrastar para mover
                  </span>
                </p>
              </div>
            </div>

            {/* ========================================
                DIREITA: Chat e Controles
                ======================================== */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              
              {/* AI Command Center */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 
                            rounded-2xl border border-cyan-500/20 shadow-2xl 
                            backdrop-blur-xl p-6 relative overflow-hidden">
                
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 
                                  rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                        AI Command Center
                      </h2>
                      <p className="text-[10px] text-slate-500">Powered by Ollama Cloud</p>
                    </div>
                  </div>
                  
                  <SmartControls
                    onSend={handleSendMessage}
                    isDisabled={chatLoading || isTyping}
                    bpm={bpm}
                    isLoopActive={loopActive}
                    loopCount={loopCount}
                  />
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 
                            rounded-2xl border border-slate-700/50 backdrop-blur-xl p-6 
                            h-[500px]">
                <ChatInterface
                  messages={messages}
                  isLoading={chatLoading}
                  isTyping={isTyping}
                  error={chatError}
                />
              </div>

              {/* System Status - Compacto */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 
                            rounded-2xl border border-slate-700/50 backdrop-blur-xl p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-[9px] text-slate-500 uppercase mb-1">Audio</div>
                    <div className="text-xs text-emerald-400 font-bold">READY</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-[9px] text-slate-500 uppercase mb-1">AI</div>
                    <div className="text-xs text-cyan-400 font-bold">OLLAMA</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-[9px] text-slate-500 uppercase mb-1">Loops</div>
                    <div className="text-xs text-slate-300 font-bold">{loopCount}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista (dentro do scroll) */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-sm mt-8">
        <div className="max-w-[1800px] mx-auto px-6 py-3">
          <div className="flex items-center justify-center md:justify-between text-[10px] text-slate-600 flex-wrap gap-2">
            <span className="text-center">baterIA v2.0 • Assistente Musical Inteligente</span>
            <span className="hidden md:flex items-center gap-4">
              <span>React</span>
              <span>•</span>
              <span>Ollama AI</span>
              <span>•</span>
              <span>Web Audio API</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
