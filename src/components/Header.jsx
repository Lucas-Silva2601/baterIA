/**
 * Header Premium para o Bateria AI Studio
 */
const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 
                     border-b border-slate-700/50 backdrop-blur-xl z-50">
      {/* Glow effect superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r 
                    from-transparent via-cyan-500 to-transparent opacity-50 blur-sm" />
      
      <div className="max-w-[1800px] mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo e Título Premium */}
          <div className="flex items-center gap-4">
            {/* Icon com gradiente */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-violet-500 
                            rounded-2xl blur-lg opacity-50 animate-pulse" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 
                            rounded-2xl flex items-center justify-center border border-cyan-500/30 
                            shadow-xl">
                <span className="text-3xl">🥁</span>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 
                           to-slate-400 bg-clip-text text-transparent tracking-tight">
                baterIA
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 font-medium tracking-wide">
                Assistente Musical Inteligente • Powered by <span className="text-cyan-400">Ollama Cloud</span>
              </p>
            </div>
          </div>

          {/* Status Indicator Sofisticado */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-800/50 border border-emerald-500/30 
                          rounded-full flex items-center gap-2.5 backdrop-blur-sm">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                System Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
