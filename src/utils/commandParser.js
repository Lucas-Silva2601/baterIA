/**
 * Parser de Comandos JSON da IA
 * Processa respostas JSON da IA e executa comandos na bateria
 */

/**
 * Extrai e valida JSON da resposta da IA
 * @param {string} aiResponse - Resposta da IA (deve ser JSON puro)
 * @returns {Object|null} - Objeto JSON parseado ou null se inválido
 */
export const parseJSON = (aiResponse) => {
  try {
    // Remove espaços em branco desnecessários
    const cleanResponse = aiResponse.trim();
    
    // Tenta parsear diretamente
    const parsed = JSON.parse(cleanResponse);
    
    // Valida estrutura mínima
    if (typeof parsed === 'object' && parsed !== null && parsed.action) {
      return parsed;
    }
    
    console.warn('JSON inválido: falta campo "action"', parsed);
    return null;
  } catch (error) {
    console.error('Erro ao parsear JSON da IA:', error.message);
    console.log('Resposta recebida:', aiResponse);
    return null;
  }
};

/**
 * Executa comandos musicais baseados no JSON da IA
 * @param {string} aiResponse - Resposta JSON da IA
 * @param {Object} loopControls - Controles do hook useLoop
 * @returns {Object} - {success: boolean, message: string}
 */
export const executeAICommand = (aiResponse, loopControls) => {
  const command = parseJSON(aiResponse);
  
  if (!command) {
    return {
      success: false,
      message: 'Não foi possível processar o comando da IA.'
    };
  }

  console.log('🥁 Comando IA recebido:', command);

  try {
    switch (command.action) {
      case 'LOOP':
        if (!command.pattern || !command.bpm) {
          return {
            success: false,
            message: 'Comando LOOP incompleto (falta pattern ou bpm).'
          };
        }
        
        loopControls.stopLoop();
        loopControls.setBpm(command.bpm);
        loopControls.setPattern(command.pattern);
        setTimeout(() => loopControls.startLoop(), 100);
        
        return {
          success: true,
          message: `Loop iniciado: ${command.bpm} BPM`
        };

      case 'ONESHOT':
        if (!command.pattern || !command.bpm) {
          return {
            success: false,
            message: 'Comando ONESHOT incompleto (falta pattern ou bpm).'
          };
        }
        
        loopControls.playOneShot(command.pattern, command.bpm);
        
        return {
          success: true,
          message: `Frase tocada: ${command.bpm} BPM`
        };

      case 'STOP':
        loopControls.stopLoop();
        
        return {
          success: true,
          message: 'Loop parado'
        };
        
      default:
        console.warn('Ação desconhecida:', command.action);
        return {
          success: false,
          message: `Ação desconhecida: ${command.action}`
        };
    }
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    return {
      success: false,
      message: 'Erro ao executar comando'
    };
  }
};

/**
 * Alias para parseJSON (compatibilidade)
 */
export const parseAIResponse = parseJSON;

/**
 * Converte padrão de string para array (legacy support)
 * @param {string} patternString - Pattern no formato "S-A-W-A" ou "S+A-W"
 * @returns {Array<string>} - Array de steps
 */
export const patternToArray = (patternString) => {
  if (Array.isArray(patternString)) {
    return patternString;
  }
  return patternString.split('-');
};
