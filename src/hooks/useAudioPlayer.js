import { useState, useEffect, useCallback, useRef } from 'react';
import { DRUM_SOUNDS, AUDIO_CONFIG } from '../utils/constants';

/**
 * Hook customizado para gerenciar reprodução de áudio
 * @returns {Object} - Funções e estado do player de áudio
 */
export const useAudioPlayer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSounds, setLoadedSounds] = useState({});
  const [error, setError] = useState(null);
  const audioContextRef = useRef(null);
  const audioBuffersRef = useRef({});

  /**
   * Inicializa o AudioContext
   */
  const initAudioContext = useCallback(() => {
    // Se não existe ou está fechado, criar novo
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  /**
   * Carrega um arquivo de áudio
   * @param {string} key - Tecla do instrumento
   * @param {string} url - URL do arquivo de áudio
   */
  const loadSound = useCallback(async (key, url) => {
    try {
      const audioContext = initAudioContext();
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${url}: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      audioBuffersRef.current[key] = audioBuffer;
      
      return true;
    } catch (err) {
      console.error(`Erro ao carregar som ${key}:`, err);
      throw err;
    }
  }, [initAudioContext]);

  /**
   * Carrega todos os sons
   */
  const loadAllSounds = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const soundKeys = Object.keys(DRUM_SOUNDS);
      const loadPromises = soundKeys.map(key => {
        const sound = DRUM_SOUNDS[key];
        return loadSound(key, sound.file);
      });

      await Promise.all(loadPromises);

      // Marcar todos como carregados
      const loaded = {};
      soundKeys.forEach(key => {
        loaded[key] = true;
      });
      setLoadedSounds(loaded);
      setIsLoading(false);
    } catch (err) {
      setError(`Erro ao carregar sons: ${err.message}`);
      setIsLoading(false);
    }
  }, [loadSound]);

  /**
   * Toca um som específico
   * @param {string} key - Tecla do instrumento
   * @param {number} volume - Volume (0-1, padrão: AUDIO_CONFIG.DEFAULT_VOLUME)
   */
  const playSound = useCallback((key, volume = AUDIO_CONFIG.DEFAULT_VOLUME) => {
    try {
      // Inicializar ou recriar o contexto se necessário
      let audioContext = audioContextRef.current;
      
      // Se não existe ou está fechado, tentar inicializar
      if (!audioContext || audioContext.state === 'closed') {
        audioContext = initAudioContext();
      }

      // Verificar novamente após inicialização
      if (!audioContext || audioContext.state === 'closed') {
        console.warn(`AudioContext não pode ser inicializado`);
        return;
      }

      const audioBuffer = audioBuffersRef.current[key];
      if (!audioBuffer) {
        console.warn(`Som ${key} não está carregado`);
        return;
      }

      // Retomar o contexto se estiver suspenso
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Criar source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Criar gain node para controle de volume
      const gainNode = audioContext.createGain();
      gainNode.gain.value = Math.max(0, Math.min(1, volume));

      // Conectar: source -> gain -> destination
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Tocar
      source.start(0);
    } catch (err) {
      console.error(`Erro ao tocar som ${key}:`, err);
    }
  }, [initAudioContext]);

  /**
   * Toca uma sequência de sons
   * @param {string} sequence - Sequência de letras (ex: "ASWDJ")
   * @param {number} delay - Delay entre notas em ms (padrão: AUDIO_CONFIG.PLAYBACK_DELAY)
   * @param {number} volume - Volume (0-1)
   * @returns {Promise<void>}
   */
  const playSequence = useCallback(async (sequence, delay = AUDIO_CONFIG.PLAYBACK_DELAY, volume = AUDIO_CONFIG.DEFAULT_VOLUME) => {
    if (!sequence || typeof sequence !== 'string') {
      return;
    }

    const upperSequence = sequence.toUpperCase();
    const validKeys = Object.keys(DRUM_SOUNDS);

    for (let char of upperSequence) {
      if (validKeys.includes(char)) {
        playSound(char, volume);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }, [playSound]);

  /**
   * Para todos os sons (resume o AudioContext se suspenso)
   */
  const resumeAudioContext = useCallback(async () => {
    const audioContext = audioContextRef.current;
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  }, []);

  /**
   * Suspende o AudioContext
   */
  const suspendAudioContext = useCallback(async () => {
    const audioContext = audioContextRef.current;
    if (audioContext && audioContext.state === 'running') {
      await audioContext.suspend();
    }
  }, []);

  /**
   * Obtém informações sobre um som
   * @param {string} key - Tecla do instrumento
   * @returns {Object|null} - Informações do som
   */
  const getSoundInfo = useCallback((key) => {
    const sound = DRUM_SOUNDS[key];
    const buffer = audioBuffersRef.current[key];

    if (!sound || !buffer) {
      return null;
    }

    return {
      name: sound.name,
      key: sound.key,
      file: sound.file,
      duration: buffer.duration,
      sampleRate: buffer.sampleRate,
      numberOfChannels: buffer.numberOfChannels,
      isLoaded: !!loadedSounds[key],
    };
  }, [loadedSounds]);

  /**
   * Verifica se um som está carregado
   * @param {string} key - Tecla do instrumento
   * @returns {boolean}
   */
  const isSoundLoaded = useCallback((key) => {
    return !!loadedSounds[key] && !!audioBuffersRef.current[key];
  }, [loadedSounds]);

  /**
   * Recarrega um som específico
   * @param {string} key - Tecla do instrumento
   */
  const reloadSound = useCallback(async (key) => {
    const sound = DRUM_SOUNDS[key];
    if (!sound) {
      throw new Error(`Som ${key} não encontrado`);
    }

    try {
      await loadSound(key, sound.file);
      setLoadedSounds(prev => ({ ...prev, [key]: true }));
    } catch (err) {
      setError(`Erro ao recarregar som ${key}: ${err.message}`);
      throw err;
    }
  }, [loadSound]);

  /**
   * Obtém estatísticas de carregamento
   * @returns {Object}
   */
  const getLoadingStats = useCallback(() => {
    const totalSounds = Object.keys(DRUM_SOUNDS).length;
    const loadedCount = Object.values(loadedSounds).filter(Boolean).length;
    const percentage = totalSounds > 0 ? (loadedCount / totalSounds) * 100 : 0;

    return {
      total: totalSounds,
      loaded: loadedCount,
      percentage: Math.round(percentage),
      isComplete: loadedCount === totalSounds,
    };
  }, [loadedSounds]);

  // Carregar sons ao montar o componente
  useEffect(() => {
    loadAllSounds();

    // Cleanup - apenas fecha o contexto quando o componente realmente desmontar
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        // Usar timeout para evitar fechar durante re-renders do StrictMode
        const context = audioContextRef.current;
        setTimeout(() => {
          if (context.state !== 'closed') {
            context.close().catch(err => console.warn('Erro ao fechar AudioContext:', err));
          }
        }, 100);
      }
    };
  }, [loadAllSounds]);

  return {
    // Estado
    isLoading,
    loadedSounds,
    error,
    
    // Funções principais
    playSound,
    playSequence,
    
    // Controle do AudioContext
    resumeAudioContext,
    suspendAudioContext,
    
    // Utilitários
    getSoundInfo,
    isSoundLoaded,
    reloadSound,
    getLoadingStats,
    
    // Recarregar todos
    loadAllSounds,
  };
};

export default useAudioPlayer;
