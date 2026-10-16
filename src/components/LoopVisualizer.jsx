import PropTypes from 'prop-types';

/**
 * LoopVisualizer - Visualização do loop atual
 * Mostra o padrão sendo tocado e o progresso
 */
const LoopVisualizer = ({ pattern, currentStep, bpm, isActive }) => {
  if (!pattern || pattern.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-3xl mb-2 opacity-30">🎵</div>
        <p className="text-xs text-slate-600">Nenhum loop ativo</p>
      </div>
    );
  }

  const patternArray = pattern.split('-');

  return (
    <div className="space-y-4">
      {/* Loop Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isActive ? 'Loop Ativo' : 'Loop Pausado'}
          </span>
        </div>
        <div className="text-xs text-slate-500">
          {patternArray.length} steps • {bpm} BPM
        </div>
      </div>

      {/* Pattern Steps */}
      <div className="grid grid-cols-8 gap-2">
        {patternArray.map((step, index) => {
          const isCurrentStep = isActive && index === currentStep % patternArray.length;
          const sounds = step.split('+').filter(s => s !== '_');
          const isPause = step === '_' || sounds.length === 0;

          return (
            <div
              key={index}
              className={`relative aspect-square rounded-lg border-2 transition-all duration-150 ${
                isCurrentStep
                  ? 'border-cyan-400 bg-cyan-500/20 scale-110 shadow-lg shadow-cyan-500/50'
                  : 'border-slate-700/50 bg-slate-800/50'
              }`}
            >
              {/* Step Number */}
              <div className="absolute top-0.5 left-1 text-[8px] text-slate-600 font-mono">
                {index + 1}
              </div>

              {/* Step Content */}
              <div className="flex items-center justify-center h-full">
                {isPause ? (
                  <span className="text-slate-700 text-xs">—</span>
                ) : (
                  <div className="text-center">
                    {sounds.map((sound, i) => (
                      <div
                        key={i}
                        className={`text-[10px] font-bold ${
                          isCurrentStep ? 'text-cyan-300' : 'text-slate-400'
                        }`}
                      >
                        {sound}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Indicator */}
              {isCurrentStep && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-400/20 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Loop Counter */}
      {isActive && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 
                        border border-emerald-500/30 rounded-full px-4 py-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-300 font-mono">
              Loop infinito ativo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

LoopVisualizer.propTypes = {
  pattern: PropTypes.string,
  currentStep: PropTypes.number,
  bpm: PropTypes.number,
  isActive: PropTypes.bool,
};

LoopVisualizer.defaultProps = {
  pattern: '',
  currentStep: 0,
  bpm: 120,
  isActive: false,
};

export default LoopVisualizer;
