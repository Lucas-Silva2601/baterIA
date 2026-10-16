import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrumPad from './DrumPad';
import { DRUM_SOUNDS, INITIAL_PAD_POSITIONS } from '../utils/constants';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/helpers';

// Nova chave de storage: o layout v2 tem espaçamento maior, então as
// posições antigas (apertadas) não são reaproveitadas.
const POSITIONS_STORAGE_KEY = 'drum-pad-positions-v2';

// Palco com posições absolutas (e arraste) só em telas largas.
// Abaixo disso os pads viram uma grade fluida — sem sobreposição no mobile.
const DESKTOP_STAGE_QUERY = '(min-width: 1280px)';

/**
 * Hook utilitário: acompanha uma media query.
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    // Valor inicial já lido no useState acima; aqui só assinamos mudanças.
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

/**
 * Componente DrumKit - Conjunto de pads da bateria
 * @param {Object} props
 * @param {Function} props.onPlay - Callback ao tocar um som
 * @param {string} props.activeKey - Tecla atualmente ativa (para loop)
 * @param {boolean} props.isDraggable - Se os pads podem ser arrastados (só no palco desktop)
 */
const DrumKit = ({ onPlay, activeKey = null, isDraggable = true }) => {
  const isDesktopStage = useMediaQuery(DESKTOP_STAGE_QUERY);

  const [positions, setPositions] = useState(() => {
    // Tentar carregar posições salvas do localStorage
    const saved = loadFromLocalStorage(POSITIONS_STORAGE_KEY);
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
      saveToLocalStorage(POSITIONS_STORAGE_KEY, updated);

      return updated;
    });
  }, []);

  /**
   * Reseta posições para o padrão
   */
  const resetPositions = useCallback(() => {
    setPositions(INITIAL_PAD_POSITIONS);
    saveToLocalStorage(POSITIONS_STORAGE_KEY, INITIAL_PAD_POSITIONS);
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

  // Telas menores: grade fluida centralizada (sem arraste, sem sobreposição)
  if (!isDesktopStage) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 py-4 px-2">
        {Object.keys(DRUM_SOUNDS).map(key => {
          const sound = DRUM_SOUNDS[key];

          return (
            <DrumPad
              key={key}
              drumKey={key}
              name={sound.name}
              onPlay={onPlay}
              isDraggable={false}
              isActive={activeKey === key}
              color={sound.color}
            />
          );
        })}
      </div>
    );
  }

  // Telas largas: palco de coordenadas fixas com arraste livre
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '640px',
    height: '510px',
    margin: '0 auto',
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

      {/* Botão de reset — fora da área dos pads, combinando com o tema */}
      {isDraggable && (
        <button
          onClick={resetPositions}
          className="absolute bottom-2 right-2 z-20 px-3 py-1.5 text-[11px] font-semibold
                     uppercase tracking-wider text-slate-400 bg-slate-800/80 border
                     border-slate-700 rounded-lg backdrop-blur
                     hover:text-white hover:border-slate-500 hover:bg-slate-700/80
                     transition-all active:scale-95"
          title="Resetar posições dos pads"
        >
          ⟲ Resetar posições
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
