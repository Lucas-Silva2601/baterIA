import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrumPad from './DrumPad';
import { DRUM_SOUNDS, INITIAL_PAD_POSITIONS } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/helpers';

/**
 * Componente DrumKit - Conjunto de pads da bateria
 * @param {Object} props
 * @param {Function} props.onPlay - Callback ao tocar um som
 * @param {string} props.activeKey - Tecla atualmente ativa (para loop)
 * @param {boolean} props.isDraggable - Se os pads podem ser arrastados
 */
const DrumKit = ({ onPlay, activeKey = null, isDraggable = true }) => {
  const [positions, setPositions] = useState(() => {
    // Tentar carregar posições salvas do localStorage
    const saved = loadFromLocalStorage('drum-pad-positions');
    return saved || INITIAL_PAD_POSITIONS;
  });

  /**
   * Handler para mudança de posição de um pad
   */
  const handlePositionChange = useCallback((key, newPosition) => {
    setPositions(prev => {
      const updated = {
        ...prev,
        [key]: newPosition,
      };
      
      // Salvar no localStorage
      saveToLocalStorage('drum-pad-positions', updated);
      
      return updated;
    });
  }, []);

  /**
   * Reseta posições para o padrão
   */
  const resetPositions = useCallback(() => {
    setPositions(INITIAL_PAD_POSITIONS);
    saveToLocalStorage('drum-pad-positions', INITIAL_PAD_POSITIONS);
  }, []);

  /**
   * Handler para teclas do teclado
   */
  const handleKeyPress = useCallback((e) => {
    const key = e.key.toUpperCase();
    
    // Verificar se é uma tecla válida
    if (DRUM_SOUNDS[key] && onPlay) {
      onPlay(key);
    }
  }, [onPlay]);

  // Adicionar listener de teclado
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Estilo do container
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px',
    backgroundColor: 'transparent',
  };

  return (
    <div style={containerStyle}>
      {Object.keys(DRUM_SOUNDS).map(key => {
        const sound = DRUM_SOUNDS[key];
        const position = positions[key] || { x: 0, y: 0 };
        
        return (
          <DrumPad
            key={key}
            drumKey={key}
            name={sound.name}
            onPlay={onPlay}
            position={position}
            onPositionChange={handlePositionChange}
            isDraggable={isDraggable}
            isActive={activeKey === key}
            color={sound.color}
          />
        );
      })}
      
      {/* Botão de reset (opcional) */}
      {isDraggable && (
        <button
          onClick={resetPositions}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            padding: '8px 16px',
            backgroundColor: '#6464ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
          title="Resetar posições dos pads"
        >
          Resetar Posições
        </button>
      )}
    </div>
  );
};

DrumKit.propTypes = {
  onPlay: PropTypes.func,
  activeKey: PropTypes.string,
  isDraggable: PropTypes.bool,
};

export default DrumKit;
