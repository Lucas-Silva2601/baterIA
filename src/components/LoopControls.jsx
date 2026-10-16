import PropTypes from 'prop-types';
import { BPM_OPTIONS, LOOP_SOUNDS, DRUM_SOUNDS } from '../utils/constants';

/**
 * Componente LoopControls - Controles de loop e BPM
 * @param {Object} props
 * @param {boolean} props.isActive - Se o loop está ativo
 * @param {number} props.bpm - BPM atual
 * @param {string} props.instrument - Instrumento atual do loop
 * @param {number} props.loopCount - Contador de loops
 * @param {Function} props.onToggle - Callback para ligar/desligar loop
 * @param {Function} props.onBpmChange - Callback para mudar BPM
 * @param {Function} props.onInstrumentChange - Callback para mudar instrumento
 */
const LoopControls = ({
  isActive = false,
  bpm = BPM_OPTIONS.MEDIUM,
  instrument = 'A',
  loopCount = 0,
  onToggle,
  onBpmChange,
  onInstrumentChange,
}) => {
  // Estilos
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#323232',
    border: '2px solid #6464ff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '8px',
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const labelStyle = {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '80px',
  };

  const toggleButtonStyle = {
    padding: '12px 24px',
    backgroundColor: isActive ? '#00ff00' : '#6464ff',
    color: isActive ? '#000' : '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '140px',
  };

  const bpmButtonStyle = (isSelected) => ({
    padding: '8px 16px',
    backgroundColor: isSelected ? '#6464ff' : '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: '60px',
  });

  const instrumentButtonStyle = (isSelected) => ({
    padding: '10px',
    width: '50px',
    height: '50px',
    backgroundColor: isSelected ? '#00ff00' : '#555',
    color: isSelected ? '#000' : '#fff',
    border: isSelected ? '3px solid #fff' : 'none',
    borderRadius: '8px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const statusStyle = {
    padding: '12px',
    backgroundColor: '#2a2a2a',
    borderRadius: '6px',
    color: isActive ? '#00ff00' : '#ff6666',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  const infoStyle = {
    color: '#888',
    fontSize: '14px',
    marginTop: '4px',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>🔁 Controles de Loop</div>

      {/* Status do Loop */}
      <div style={statusStyle}>
        Status: {isActive ? '✅ ATIVO' : '⏸️ INATIVO'}
        {isActive && ` | Tocado ${loopCount}x`}
      </div>

      {/* Botão Toggle */}
      <div style={rowStyle}>
        <span style={labelStyle}>Loop:</span>
        <button
          onClick={onToggle}
          style={toggleButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
          aria-label={isActive ? 'Parar loop' : 'Iniciar loop'}
        >
          {isActive ? '⏹️ PARAR' : '▶️ INICIAR'}
        </button>
      </div>

      {/* Controle de BPM */}
      <div>
        <div style={rowStyle}>
          <span style={labelStyle}>BPM:</span>
          <button
            onClick={() => onBpmChange && onBpmChange(BPM_OPTIONS.SLOW)}
            style={bpmButtonStyle(bpm === BPM_OPTIONS.SLOW)}
            onMouseEnter={(e) => {
              if (bpm !== BPM_OPTIONS.SLOW) {
                e.target.style.backgroundColor = '#777';
              }
            }}
            onMouseLeave={(e) => {
              if (bpm !== BPM_OPTIONS.SLOW) {
                e.target.style.backgroundColor = '#555';
              }
            }}
            aria-label="BPM Lento (80)"
          >
            80
          </button>
          <button
            onClick={() => onBpmChange && onBpmChange(BPM_OPTIONS.MEDIUM)}
            style={bpmButtonStyle(bpm === BPM_OPTIONS.MEDIUM)}
            onMouseEnter={(e) => {
              if (bpm !== BPM_OPTIONS.MEDIUM) {
                e.target.style.backgroundColor = '#777';
              }
            }}
            onMouseLeave={(e) => {
              if (bpm !== BPM_OPTIONS.MEDIUM) {
                e.target.style.backgroundColor = '#555';
              }
            }}
            aria-label="BPM Médio (120)"
          >
            120
          </button>
          <button
            onClick={() => onBpmChange && onBpmChange(BPM_OPTIONS.FAST)}
            style={bpmButtonStyle(bpm === BPM_OPTIONS.FAST)}
            onMouseEnter={(e) => {
              if (bpm !== BPM_OPTIONS.FAST) {
                e.target.style.backgroundColor = '#777';
              }
            }}
            onMouseLeave={(e) => {
              if (bpm !== BPM_OPTIONS.FAST) {
                e.target.style.backgroundColor = '#555';
              }
            }}
            aria-label="BPM Rápido (160)"
          >
            160
          </button>
          <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
            {bpm}
          </span>
        </div>
        <div style={infoStyle}>
          Lento: 80 | Médio: 120 | Rápido: 160
        </div>
      </div>

      {/* Seletor de Instrumento */}
      <div>
        <div style={rowStyle}>
          <span style={labelStyle}>Som:</span>
          {LOOP_SOUNDS.map(key => {
            const sound = DRUM_SOUNDS[key];
            return (
              <button
                key={key}
                onClick={() => onInstrumentChange && onInstrumentChange(key)}
                style={instrumentButtonStyle(instrument === key)}
                onMouseEnter={(e) => {
                  if (instrument !== key) {
                    e.target.style.backgroundColor = '#777';
                  }
                }}
                onMouseLeave={(e) => {
                  if (instrument !== key) {
                    e.target.style.backgroundColor = '#555';
                  }
                }}
                title={sound.name}
                aria-label={`Instrumento ${sound.name}`}
              >
                {key}
              </button>
            );
          })}
        </div>
        <div style={infoStyle}>
          A: Chimbal | J: Crash | K: Condução
        </div>
      </div>

      {/* Instruções */}
      <div style={{ ...infoStyle, marginTop: '8px', fontSize: '13px' }}>
        💡 Dica: Use os comandos da IA para controlar o loop automaticamente
      </div>
    </div>
  );
};

LoopControls.propTypes = {
  isActive: PropTypes.bool,
  bpm: PropTypes.number,
  instrument: PropTypes.string,
  loopCount: PropTypes.number,
  onToggle: PropTypes.func,
  onBpmChange: PropTypes.func,
  onInstrumentChange: PropTypes.func,
};

export default LoopControls;
