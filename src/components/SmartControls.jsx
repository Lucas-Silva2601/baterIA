import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BACKING_TRACKS } from '../utils/constants';

// Quick Commands (fora do componente para evitar re-criação)
const QUICK_COMMANDS = [
  { label: '🎸 Rock', command: 'Faz um beat de rock', gradient: 'from-red-500 to-orange-500' },
  { label: '🎤 Hip Hop', command: 'Faz um Hip Hop', gradient: 'from-purple-500 to-pink-500' },
  { label: '⚡ Virada', command: 'Faz uma virada', gradient: 'from-yellow-500 to-red-500' },
  { label: '🛑 Para', command: 'Para', gradient: 'from-gray-600 to-gray-700' },
];

/**
 * SmartControls Premium - Painel de comando AI com Backing Tracks
 */
const SmartControls = ({ onSend, isDisabled, bpm, isLoopActive, loopCount }) => {
  const [inputValue, setInputValue] = useState('');
  const [showPresets, setShowPresets] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isDisabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleQuickCommand = (command) => {
    if (!isDisabled) {
      onSend(command);
    }
  };

  const handlePresetClick = (preset) => {
    if (!isDisabled) {
      onSend(`Toque ${preset.name} em ${preset.bpm} BPM`);
      setShowPresets(false);
    }
  };

  // Organizar presets por gênero (memoizado)
  const presetsByGenre = useMemo(() => {
    return Object.values(BACKING_TRACKS).reduce((acc, preset) => {
      if (!acc[preset.genre]) {
        acc[preset.genre] = [];
      }
      acc[preset.genre].push(preset);
      return acc;
    }, {});
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Status Cards - Grid 2 colunas */}
      <div className="grid grid-cols-2 gap-3">
        {/* BPM Display */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 
                      rounded-xl p-4 border border-slate-700/50 group hover:border-cyan-500/30 
                      transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl 
                        group-hover:bg-cyan-500/10 transition-all" />
          <div className="relative">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
              Tempo (BPM)
            </div>
            <div className="text-3xl font-black font-mono bg-gradient-to-br from-white to-slate-400 
                          bg-clip-text text-transparent">
              {bpm || '--'}
            </div>
          </div>
        </div>

        {/* Loop Status */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 
                      rounded-xl p-4 border border-slate-700/50 group hover:border-violet-500/30 
                      transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/5 rounded-full blur-2xl 
                        group-hover:bg-violet-500/10 transition-all" />
          <div className="relative">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
              Status
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  isLoopActive
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-pulse'
                    : 'bg-slate-600'
                }`}
              />
              <span className={`text-sm font-bold font-mono ${
                isLoopActive ? 'text-emerald-400' : 'text-slate-500'
              }`}>
                {isLoopActive ? 'PLAYING' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backing Tracks Presets */}
      <div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                   bg-gradient-to-r from-violet-500/10 to-purple-500/10 
                   border border-violet-500/30 hover:border-violet-500/50
                   transition-all group"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🎵</span>
            <span className="text-sm font-bold text-violet-300">Backing Tracks</span>
          </div>
          <span className={`text-violet-400 transition-transform ${showPresets ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {showPresets && (
          <div className="mt-3 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {Object.entries(presetsByGenre).map(([genre, presets]) => (
              <div key={genre}>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">
                  {genre}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetClick(preset)}
                      disabled={isDisabled}
                      className="relative overflow-hidden px-3 py-2.5 rounded-lg
                               bg-slate-800/80 border border-slate-700/50
                               hover:border-violet-500/50 hover:bg-slate-700/80
                               transition-all text-left group disabled:opacity-40"
                      title={preset.description}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{preset.emoji}</span>
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                          {preset.name}
                        </span>
                      </div>
                      <div className="text-[9px] text-slate-600">
                        {preset.bpm} BPM
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Commands - Premium Pills */}
      <div>
        <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-3 font-bold">
          Quick Commands
        </div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd.label}
              onClick={() => handleQuickCommand(cmd.command)}
              disabled={isDisabled}
              className={`relative overflow-hidden px-4 py-3 rounded-xl font-medium text-sm
                       transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                       bg-gradient-to-r ${cmd.gradient} hover:scale-105 hover:shadow-lg
                       active:scale-95 text-white shadow-md group`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
              <span className="relative z-10">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Premium */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            placeholder="Ex: 'Toque um backing track de blues para guitarra'"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3.5
                     text-white placeholder-slate-600 focus:outline-none focus:ring-2 
                     focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed text-sm
                     group-hover:border-slate-600/50"
          />
          {isDisabled && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" 
                     style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" 
                     style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" 
                     style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isDisabled || !inputValue.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 
                   hover:from-cyan-600 hover:via-blue-600 hover:to-violet-600 
                   text-white font-bold py-3.5 rounded-xl transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed shadow-lg
                   hover:shadow-cyan-500/50 text-sm uppercase tracking-wide
                   hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
          <span className="relative z-10">
            {isDisabled ? 'Processando...' : '▶ Enviar Comando'}
          </span>
        </button>
      </form>

      {/* Loop Counter Badge */}
      {isLoopActive && loopCount > 0 && (
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 
                        to-purple-500/10 border border-violet-500/30 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-xs text-violet-300 font-mono font-medium">
              Loop: <span className="font-bold">{loopCount}</span> ciclos
            </span>
          </div>
        </div>
      )}

      {/* Hint Text */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-slate-600 leading-relaxed">
          💡 Peça backing tracks para tocar guitarra/violão junto!
        </p>
      </div>
    </div>
  );
};

SmartControls.propTypes = {
  onSend: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  bpm: PropTypes.number,
  isLoopActive: PropTypes.bool,
  loopCount: PropTypes.number,
};

SmartControls.defaultProps = {
  isDisabled: false,
  bpm: null,
  isLoopActive: false,
  loopCount: 0,
};

export default SmartControls;
