/**
 * Utilitários auxiliares para a aplicação
 */

/**
 * Aguarda um tempo específico (Promise-based)
 * @param {number} ms - Milissegundos para aguardar
 * @returns {Promise} - Promise que resolve após o tempo especificado
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Converte BPM para intervalo em milissegundos
 * @param {number} bpm - Batidas por minuto
 * @returns {number} - Intervalo em milissegundos
 */
export const bpmToMs = (bpm) => {
  return (60 / bpm) * 1000;
};

/**
 * Limita um valor entre min e max
 * @param {number} value - Valor a ser limitado
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor limitado
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Gera um ID único
 * @returns {string} - ID único
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formata timestamp para exibição
 * @param {Date} date - Data a ser formatada
 * @returns {string} - Data formatada (HH:MM:SS)
 */
export const formatTime = (date = new Date()) => {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Debounce function - limita a frequência de execução
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} - Função com debounce aplicado
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - garante execução em intervalos regulares
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Intervalo mínimo entre execuções em ms
 * @returns {Function} - Função com throttle aplicado
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Verifica se um elemento está visível no viewport
 * @param {HTMLElement} element - Elemento a ser verificado
 * @returns {boolean} - True se visível
 */
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Rola um elemento para o final
 * @param {HTMLElement} element - Elemento a ser rolado
 * @param {boolean} smooth - Se deve usar scroll suave
 */
export const scrollToBottom = (element, smooth = true) => {
  if (!element) return;
  
  element.scrollTo({
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

/**
 * Copia texto para a área de transferência
 * @param {string} text - Texto a ser copiado
 * @returns {Promise<boolean>} - True se copiado com sucesso
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erro ao copiar texto:', err);
    return false;
  }
};

/**
 * Salva dados no localStorage
 * @param {string} key - Chave do item
 * @param {any} value - Valor a ser salvo
 * @returns {boolean} - True se salvo com sucesso
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err);
    return false;
  }
};

/**
 * Carrega dados do localStorage
 * @param {string} key - Chave do item
 * @param {any} defaultValue - Valor padrão se não encontrado
 * @returns {any} - Valor carregado ou valor padrão
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (err) {
    console.error('Erro ao carregar do localStorage:', err);
    return defaultValue;
  }
};

/**
 * Remove item do localStorage
 * @param {string} key - Chave do item
 * @returns {boolean} - True se removido com sucesso
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.error('Erro ao remover do localStorage:', err);
    return false;
  }
};

/**
 * Detecta se está em dispositivo móvel
 * @returns {boolean} - True se mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detecta se está em modo touch
 * @returns {boolean} - True se suporta touch
 */
export const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

/**
 * Formata número com zeros à esquerda
 * @param {number} num - Número a ser formatado
 * @param {number} size - Tamanho total da string
 * @returns {string} - Número formatado
 */
export const padNumber = (num, size = 2) => {
  return String(num).padStart(size, '0');
};

/**
 * Remove acentos de uma string
 * @param {string} str - String com acentos
 * @returns {string} - String sem acentos
 */
export const removeAccents = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Capitaliza primeira letra de cada palavra
 * @param {string} str - String a ser capitalizada
 * @returns {string} - String capitalizada
 */
export const capitalize = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
