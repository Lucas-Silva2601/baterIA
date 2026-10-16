import axios from 'axios';
import { SYSTEM_PROMPT } from '../utils/constants';

/**
 * URL base da API Groq
 */
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Obtém a API key do Groq das variáveis de ambiente
 * @returns {string} - API key
 * @throws {Error} - Se a API key não estiver configurada
 */
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error(
      'API key do Groq não configurada. Configure VITE_GROQ_API_KEY no arquivo .env'
    );
  }
  
  return apiKey;
};

/**
 * Chama a API do Groq para gerar resposta musical
 * @param {string} userPrompt - Prompt do usuário
 * @param {Object} options - Opções adicionais
 * @param {string} options.model - Modelo a ser usado (padrão: llama-3.3-70b-versatile)
 * @param {number} options.temperature - Temperatura (0-2, padrão: 0.7)
 * @param {number} options.maxTokens - Máximo de tokens (padrão: 1024)
 * @param {number} options.timeout - Timeout em ms (padrão: 30000)
 * @returns {Promise<string>} - Resposta da IA
 * @throws {Error} - Em caso de erro na requisição
 */
export const callGroq = async (
  userPrompt,
  options = {}
) => {
  const {
    model = 'llama-3.3-70b-versatile',
    temperature = 0.7,
    maxTokens = 1024,
    timeout = 30000,
  } = options;

  try {
    // Validar prompt
    if (!userPrompt || typeof userPrompt !== 'string') {
      throw new Error('Prompt inválido');
    }

    // Obter API key
    const apiKey = getApiKey();

    // Preparar mensagens
    const messages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    // Fazer requisição
    const response = await axios.post(
      GROQ_API_URL,
      {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: 1,
        stream: false,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout,
      }
    );

    // Extrair resposta
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0 &&
      response.data.choices[0].message
    ) {
      return response.data.choices[0].message.content;
    }

    throw new Error('Resposta da API em formato inesperado');
  } catch (error) {
    // Tratamento de erros específicos
    if (error.response) {
      // Erro da API
      const status = error.response.status;
      const message = error.response.data?.error?.message || 'Erro desconhecido';

      switch (status) {
        case 401:
          throw new Error('API key inválida. Verifique suas credenciais.');
        case 429:
          throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
        case 500:
        case 502:
        case 503:
          throw new Error('Erro no servidor Groq. Tente novamente mais tarde.');
        default:
          throw new Error(`Erro na API Groq (${status}): ${message}`);
      }
    } else if (error.request) {
      // Erro de rede/timeout
      if (error.code === 'ECONNABORTED') {
        throw new Error('Timeout: A requisição demorou muito. Tente novamente.');
      }
      throw new Error('Erro de conexão. Verifique sua internet.');
    } else if (error.message) {
      // Erro de validação ou outro
      throw error;
    } else {
      // Erro desconhecido
      throw new Error('Erro desconhecido ao chamar a API Groq');
    }
  }
};

/**
 * Chama a API do Groq com retry automático
 * @param {string} userPrompt - Prompt do usuário
 * @param {Object} options - Opções adicionais
 * @param {number} options.maxRetries - Número máximo de tentativas (padrão: 3)
 * @param {number} options.retryDelay - Delay entre tentativas em ms (padrão: 1000)
 * @returns {Promise<string>} - Resposta da IA
 */
export const callGroqWithRetry = async (
  userPrompt,
  options = {}
) => {
  const { maxRetries = 3, retryDelay = 1000, ...groqOptions } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callGroq(userPrompt, groqOptions);
    } catch (error) {
      lastError = error;

      // Não fazer retry em erros de validação ou autenticação
      if (
        error.message.includes('inválido') ||
        error.message.includes('API key')
      ) {
        throw error;
      }

      // Se não é a última tentativa, aguardar antes de tentar novamente
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
        console.log(`Tentativa ${attempt} falhou. Tentando novamente...`);
      }
    }
  }

  throw new Error(
    `Falha após ${maxRetries} tentativas: ${lastError.message}`
  );
};

/**
 * Testa a conexão com a API Groq
 * @returns {Promise<boolean>} - True se a conexão foi bem-sucedida
 */
export const testGroqConnection = async () => {
  try {
    await callGroq('Teste', { maxTokens: 10, timeout: 5000 });
    return true;
  } catch (error) {
    console.error('Erro ao testar conexão com Groq:', error.message);
    return false;
  }
};

/**
 * Obtém informações sobre o uso da API (se disponível)
 * @returns {Promise<Object|null>} - Informações de uso ou null
 */
export const getGroqUsage = async () => {
  try {
    const apiKey = getApiKey();
    
    // Nota: Groq pode não ter endpoint de usage, ajustar conforme documentação
    const response = await axios.get(
      'https://api.groq.com/openai/v1/usage',
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        timeout: 5000,
      }
    );

    return response.data;
  } catch (error) {
    console.warn('Não foi possível obter informações de uso:', error.message);
    return null;
  }
};

/**
 * Lista modelos disponíveis na API Groq
 * @returns {Promise<Array>} - Lista de modelos
 */
export const listGroqModels = async () => {
  try {
    const apiKey = getApiKey();
    
    const response = await axios.get(
      'https://api.groq.com/openai/v1/models',
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        timeout: 5000,
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error('Erro ao listar modelos:', error.message);
    return [];
  }
};

// Exportação padrão
export default {
  callGroq,
  callGroqWithRetry,
  testGroqConnection,
  getGroqUsage,
  listGroqModels,
};
