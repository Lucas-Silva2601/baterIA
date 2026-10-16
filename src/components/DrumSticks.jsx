import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * DrumSticks - Baquetas animadas que "tocam" a bateria
 * Mostra animação visual quando um som é tocado
 */
const DrumSticks = ({ activeKey, padPositions }) => {
  const [leftStick, setLeftStick] = useState({ x: 50, y: 30, rotation: -30 });
  const [rightStick, setRightStick] = useState({ x: 50, y: 30, rotation: 30 });
  const [isHitting, setIsHitting] = useState(false);

  useEffect(() => {
    if (!activeKey) return;

    // Determina qual baqueta usar baseado na tecla
    const leftHandKeys = ['A', 'W', 'Z', 'X', 'C']; // Chimbal, Caixa, etc
    const isLeftHand = leftHandKeys.includes(activeKey);

    // Animação de "bater"
    setIsHitting(true);

    if (isLeftHand) {
      // Baqueta esquerda desce
      setLeftStick({ x: 45, y: 50, rotation: -10 });
    } else {
      // Baqueta direita desce
      setRightStick({ x: 55, y: 50, rotation: 10 });
    }

    // Volta à posição original após 150ms
    const timeout = setTimeout(() => {
      setLeftStick({ x: 50, y: 30, rotation: -30 });
      setRightStick({ x: 50, y: 30, rotation: 30 });
      setIsHitting(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [activeKey]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Baqueta Esquerda */}
      <div
        className="absolute transition-all duration-150 ease-out"
        style={{
          left: `${leftStick.x}%`,
          top: `${leftStick.y}%`,
          transform: `translate(-50%, -50%) rotate(${leftStick.rotation}deg)`,
        }}
      >
        <div className="relative">
          {/* Corpo da baqueta */}
          <div className="w-2 h-24 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-lg" />
          {/* Ponta da baqueta */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-4 bg-amber-900 rounded-full" />
          {/* Reflexo */}
          <div className="absolute top-2 left-0 w-1 h-12 bg-gradient-to-b from-amber-400/50 to-transparent rounded-full" />
        </div>
      </div>

      {/* Baqueta Direita */}
      <div
        className="absolute transition-all duration-150 ease-out"
        style={{
          left: `${rightStick.x}%`,
          top: `${rightStick.y}%`,
          transform: `translate(-50%, -50%) rotate(${rightStick.rotation}deg)`,
        }}
      >
        <div className="relative">
          {/* Corpo da baqueta */}
          <div className="w-2 h-24 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-lg" />
          {/* Ponta da baqueta */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-4 bg-amber-900 rounded-full" />
          {/* Reflexo */}
          <div className="absolute top-2 right-0 w-1 h-12 bg-gradient-to-b from-amber-400/50 to-transparent rounded-full" />
        </div>
      </div>

      {/* Efeito de impacto quando toca */}
      {isHitting && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 bg-cyan-400/20 rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
};

DrumSticks.propTypes = {
  activeKey: PropTypes.string,
  padPositions: PropTypes.object,
};

export default DrumSticks;
