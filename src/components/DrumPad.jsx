import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * DrumPad - Pad individual de bateria com estilo MPC/Launchpad
 * @param {string} drumKey - Tecla do pad (A, S, W, etc)
 * @param {string} name - Nome do instrumento
 * @param {string} color - Cor do pad
 * @param {Function} onPlay - Callback ao tocar o pad
 * @param {boolean} isActive - Se o pad está ativo (tocando)
 * @param {boolean} isDraggable - Se o pad pode ser arrastado
 * @param {Object} position - Posição do pad {x, y}
 * @param {Function} onPositionChange - Callback para mudança de posição
 */
const DrumPad = ({
  drumKey,
  name,
  color = '#6b7280',
  onPlay,
  isActive = false,
  isDraggable = false,
  position,
  onPositionChange,
}) => {
  const padRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Event handlers para drag (mantém funcionalidade existente)
  useEffect(() => {
    if (!isDraggable || !padRef.current) return;

    const pad = padRef.current;
    let animationFrameId = null;

    const handleMouseDown = (e) => {
      if (!e.shiftKey) return;
      isDragging.current = true;
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;
        onPositionChange?.(drumKey, { x: newX, y: newY });
      });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    pad.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      pad.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDraggable, drumKey, position, onPositionChange]);

  const handleClick = () => {
    if (!isDragging.current) {
      onPlay?.(drumKey);
    }
  };

  // Estilo inline para posição (se draggable)
  const positionStyle = isDraggable ? {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
  } : {};

  return (
    <button
      ref={padRef}
      onClick={handleClick}
      style={positionStyle}
      title={`${name} (tecla ${drumKey})`}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
        rounded-xl transition-all duration-100 ease-out
        flex flex-col items-center justify-center
        border-b-4 active:border-b-0 active:translate-y-1
        group select-none transform
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
        ${isDraggable ? 'cursor-move' : 'cursor-pointer'}
        ${isActive 
          ? 'bg-cyan-400 border-cyan-600 shadow-[0_0_30px_rgba(34,211,238,0.6)] scale-95' 
          : 'bg-slate-700 border-slate-900 hover:bg-slate-600 shadow-xl hover:scale-105'
        }
      `}
    >
      {/* Label da Tecla (K, S, etc) */}
      <span className={`
        text-xl sm:text-2xl md:text-3xl font-bold font-mono mb-1 transition-colors
        ${isActive ? 'text-black' : 'text-slate-400 group-hover:text-white'}
      `}>
        {drumKey}
      </span>
      
      {/* Nome do Instrumento (Pequeno) */}
      <span className={`
        text-[9px] sm:text-[10px] uppercase tracking-wider font-medium transition-colors
        ${isActive ? 'text-black/70' : 'text-slate-500 group-hover:text-slate-300'}
      `}>
        {name}
      </span>

      {/* LED Indicator no canto superior direito */}
      <div className={`
        absolute top-2 right-2 w-2 h-2 rounded-full transition-all
        ${isActive 
          ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,1)]' 
          : 'bg-slate-800'
        }
      `}/>

      {/* Glow effect quando ativo */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-300/20 to-blue-300/20 pointer-events-none" />
      )}

      {/* Shift indicator (quando draggable) */}
      {isDraggable && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] text-slate-500">⇧ drag</span>
        </div>
      )}
    </button>
  );
};

DrumPad.propTypes = {
  drumKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPlay: PropTypes.func,
  isActive: PropTypes.bool,
  isDraggable: PropTypes.bool,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
};

export default DrumPad;
