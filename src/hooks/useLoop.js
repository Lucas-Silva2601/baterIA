import { useState, useCallback, useRef, useEffect } from 'react';
import { BPM_OPTIONS, LOOP_SOUNDS } from '../utils/constants';
import { bpmToMs } from '../utils/helpers';

/**
 * Hook customizado para gerenciar sistema de loop
 * @param {Function} playSound - Função para tocar som
 * @returns {Object} - Estado e funções do loop
 */
export const useLoop = (playSound) => {
  const [isActive, setIsActive] = useState(false);
  const [bpm, setBpm] = useState(BPM_OPTIONS.MEDIUM);
  const [instrument, setInstrument] = useState(LOOP_SOUNDS[0]); // 'A' por padrão
  const [loopCount, setLoopCount] = useState(0);
  const [pattern, setPatternState] = useState(null); // Pattern para loops complexos
  const [currentStep, setCurrentStep] = useState(0); // Step atual do loop
  
  const intervalRef = useRef(null);
  const isActiveRef = useRef(false);
  const patternIndexRef = useRef(0);

  /**
   * Inicia o loop
   * @param {string} instrumentKey - Tecla do instrumento (opcional)
   * @param {number} customBpm - BPM customizado (opcional)
   */
  const startLoop = useCallback((instrumentKey, customBpm) => {
    // Atualizar instrumento se fornecido
    if (instrumentKey && LOOP_SOUNDS.includes(instrumentKey.toUpperCase())) {
      setInstrument(instrumentKey.toUpperCase());
    }

    // Atualizar BPM se fornecido
    if (customBpm && customBpm >= 40 && customBpm <= 240) {
      setBpm(customBpm);
    }

    setIsActive(true);
    isActiveRef.current = true;
    setLoopCount(0);
  }, []);

  /**
   * Para o loop
   */
  const stopLoop = useCallback(() => {
    setIsActive(false);
    isActiveRef.current = false;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Alterna o estado do loop (liga/desliga)
   */
  const toggleLoop = useCallback(() => {
    if (isActive) {
      stopLoop();
    } else {
      startLoop();
    }
  }, [isActive, startLoop, stopLoop]);

  /**
   * Muda o BPM do loop
   * @param {number} newBpm - Novo BPM
   */
  const changeBpm = useCallback((newBpm) => {
    if (newBpm >= 40 && newBpm <= 240) {
      setBpm(newBpm);
      
      // Se o loop está ativo, reiniciar com novo BPM
      if (isActive) {
        stopLoop();
        setTimeout(() => {
          startLoop(instrument, newBpm);
        }, 100);
      }
    }
  }, [isActive, instrument, startLoop, stopLoop]);

  /**
   * Muda o instrumento do loop
   * @param {string} newInstrument - Nova tecla do instrumento
   */
  const changeInstrument = useCallback((newInstrument) => {
    const upperInstrument = newInstrument.toUpperCase();
    
    if (LOOP_SOUNDS.includes(upperInstrument)) {
      setInstrument(upperInstrument);
      
      // Se o loop está ativo, continuar com novo instrumento
      if (isActive) {
        // Não precisa reiniciar, apenas atualizar o estado
        // O useEffect cuidará de usar o novo instrumento
      }
    }
  }, [isActive]);

  /**
   * Define BPM para lento (80)
   */
  const setBpmSlow = useCallback(() => {
    changeBpm(BPM_OPTIONS.SLOW);
  }, [changeBpm]);

  /**
   * Define BPM para médio (120)
   */
  const setBpmMedium = useCallback(() => {
    changeBpm(BPM_OPTIONS.MEDIUM);
  }, [changeBpm]);

  /**
   * Define BPM para rápido (160)
   */
  const setBpmFast = useCallback(() => {
    changeBpm(BPM_OPTIONS.FAST);
  }, [changeBpm]);

  /**
   * Obtém o intervalo atual em milissegundos
   * @returns {number}
   */
  const getInterval = useCallback(() => {
    return bpmToMs(bpm);
  }, [bpm]);

  /**
   * Obtém informações sobre o loop
   * @returns {Object}
   */
  const getLoopInfo = useCallback(() => {
    return {
      isActive,
      bpm,
      instrument,
      instrumentName: instrument ? instrument : 'Nenhum',
      interval: getInterval(),
      loopCount,
    };
  }, [isActive, bpm, instrument, getInterval, loopCount]);

  /**
   * Reseta o contador de loops
   */
  const resetLoopCount = useCallback(() => {
    setLoopCount(0);
  }, []);

  // Effect para gerenciar o loop
  useEffect(() => {
    if (isActive && playSound) {
      const interval = getInterval();
      patternIndexRef.current = 0;
      
      // Função para tocar o próximo som do pattern
      const playNext = () => {
        if (!isActiveRef.current) return;
        
        if (pattern && pattern.length > 0) {
          // Modo pattern complexo
          const currentStep = pattern[patternIndexRef.current];
          
          // Atualizar step atual para visualização
          setCurrentStep(patternIndexRef.current);
          
          // Verificar se é pausa
          if (currentStep !== '_') {
            // Verificar se são múltiplos sons simultâneos (ex: S+A)
            if (currentStep.includes('+')) {
              const simultaneousSounds = currentStep.split('+');
              simultaneousSounds.forEach(sound => {
                if (sound && sound !== '_') {
                  playSound(sound.trim().toUpperCase());
                }
              });
            } else {
              // Som único
              playSound(currentStep.toUpperCase());
            }
          }
          
          // Avançar índice
          patternIndexRef.current = (patternIndexRef.current + 1) % pattern.length;
          setLoopCount(prev => prev + 1);
        } else {
          // Modo simples (instrumento único)
          playSound(instrument);
          setLoopCount(prev => prev + 1);
        }
      };
      
      // Tocar imediatamente ao iniciar
      playNext();

      // Configurar intervalo
      intervalRef.current = setInterval(playNext, interval);

      // Cleanup
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isActive, instrument, bpm, pattern, playSound, getInterval]);

  /**
   * Define um pattern complexo para o loop
   * @param {string} patternString - Pattern no formato "S+A-A-W+A-A" ou array
   */
  const setPattern = useCallback((patternString) => {
    if (!patternString) {
      setPatternState(null);
      return;
    }
    
    // Se for string, converter para array
    if (typeof patternString === 'string') {
      const patternArray = patternString.split('-').map(step => step.trim());
      setPatternState(patternArray);
    } else if (Array.isArray(patternString)) {
      setPatternState(patternString);
    }
  }, []);

  /**
   * Toca um pattern uma única vez (para viradas)
   * @param {string} patternString - Pattern no formato "W-W-D-D-F-F-R-R-S+J"
   * @param {number} customBpm - BPM para tocar
   */
  const playOneShot = useCallback((patternString, customBpm) => {
    if (!patternString || !playSound) return;
    
    const patternArray = typeof patternString === 'string' 
      ? patternString.split('-').map(step => step.trim())
      : patternString;
    
    const bpmToUse = customBpm || bpm;
    const interval = bpmToMs(bpmToUse);
    
    let index = 0;
    
    const playNextStep = () => {
      if (index >= patternArray.length) return;
      
      const currentStep = patternArray[index];
      
      // Verificar se é pausa
      if (currentStep !== '_') {
        // Verificar se são múltiplos sons simultâneos (ex: S+J)
        if (currentStep.includes('+')) {
          const simultaneousSounds = currentStep.split('+');
          simultaneousSounds.forEach(sound => {
            if (sound && sound !== '_') {
              playSound(sound.trim().toUpperCase());
            }
          });
        } else {
          // Som único
          playSound(currentStep.toUpperCase());
        }
      }
      
      index++;
      
      if (index < patternArray.length) {
        setTimeout(playNextStep, interval);
      }
    };
    
    playNextStep();
  }, [playSound, bpm]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    // Estado
    isActive,
    bpm,
    instrument,
    loopCount,
    pattern,
    currentStep,
    
    // Controle principal
    startLoop,
    stopLoop,
    toggleLoop,
    
    // Configuração
    changeBpm,
    changeInstrument,
    setPattern,
    setBpm,
    
    // Atalhos de BPM
    setBpmSlow,
    setBpmMedium,
    setBpmFast,
    
    // Utilitários
    getInterval,
    getLoopInfo,
    resetLoopCount,
    playOneShot,
  };
};

export default useLoop;
