import axios from 'axios';
import { SYSTEM_PROMPT } from '../utils/constants';

/**
 * Base da API do Ollama Cloud (compatível com OpenAI).
 * Docs: https://docs.ollama.com/api/openai-compatibility
 *
 * Por padrão usamos o proxy do Vite (/ollama-api), pois ollama.com não
 * envia cabeçalhos CORS e o navegador bloquearia a chamada direta.
 * Pode ser sobrescrito por VITE_OLLAMA_API_BASE (ex.: um backend próprio).
 */
const OLLAMA_API_BASE = (
  import.meta.env.VITE_OLLAMA_API_BASE || '/ollama-api'
).replace(/\/+$/, '');

/**
 * URL da API de chat
 */
const OLLAMA_API_URL = `${OLLAMA_API_BASE}/v1/chat/completions`;

/**
 * URL para listar modelos disponíveis no Ollama Cloud
 */
const OLLAMA_MODELS_URL = `${OLLAMA_API_BASE}/v1/models`;

/**
 * Obtém a API key do Ollama Cloud das variáveis de ambiente
 * @returns {string} - API key
 * @throws {Error} - Se a API key não estiver configurada
 */
const getApiKey = () => {
  const apiKey = import.meta.env.VITE_OLLAMA_API_KEY;
  
  if (!apiKey || apiKey === 'your_ollama_api_key_here') {
    throw new Error(
      'API key do Ollama Cloud não configurada. Configure VITE_OLLAMA_API_KEY no arquivo .env'
    );
  }
  
  return apiKey;
};

/**
 * Obtém o modelo padrão do Ollama Cloud
 * (sobreponível pela variável VITE_OLLAMA_MODEL)
 */
const getDefaultModel = () =>
  import.meta.env.VITE_OLLAMA_MODEL || 'gemma4:31b';

/**
 * Chama a API do Ollama Cloud para gerar resposta musical
 * @param {string} userPrompt - Prompt do usuário
 * @param {Object} options - Opções adicionais
 * @param {string} options.model - Modelo a ser usado (padrão: gemma4:31b ou VITE_OLLAMA_MODEL)
 * @param {number} options.temperature - Temperatura (0-2, padrão: 0.7)
 * @param {number} options.maxTokens - Máximo de tokens (padrão: 1024)
 * @param {number} options.timeout - Timeout em ms (padrão: 30000)
 * @param {AbortSignal} options.signal - Sinal para cancelar a requisição
 * @returns {Promise<string>} - Resposta da IA
 * @throws {Error} - Em caso de erro na requisição
 */
export const callOllama = async (
  userPrompt,
  options = {}
) => {
  const {
    model = getDefaultModel(),
    temperature = 0.7,
    maxTokens = 1024,
    timeout = 30000,
    signal,
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
      OLLAMA_API_URL,
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
        signal,
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
    // Requisição cancelada pelo usuário (AbortController)
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      const canceledError = new Error('Requisição cancelada.');
      canceledError.canceled = true;
      throw canceledError;
    }

    // Tratamento de erros específicos
    if (error.response) {
      // Erro da API
      const status = error.response.status;
      const apiError = error.response.data?.error;
      const message =
        apiError?.message ||
        (typeof apiError === 'string' ? apiError : null) ||
        'Erro desconhecido';

      switch (status) {
        case 401:
          throw new Error('API key inválida. Verifique suas credenciais.');
        case 404:
          throw new Error(
            `Modelo não encontrado no Ollama Cloud. Verifique VITE_OLLAMA_MODEL (modelos disponíveis: ${OLLAMA_MODELS_URL}).`
          );
        case 429:
          throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
        case 500:
        case 502:
        case 503:
          throw new Error('Erro no servidor Ollama Cloud. Tente novamente mais tarde.');
        default:
          throw new Error(`Erro na API Ollama (${status}): ${message}`);
      }
    } else if (error.request) {
      // Erro de rede/timeout
      if (
        error.code === 'ECONNABORTED' ||
        error.code === 'ETIMEDOUT'
      ) {
        throw new Error('Timeout: A requisição demorou muito. Tente novamente.');
      }
      throw new Error(
        'Erro de conexão com o Ollama Cloud. Verifique sua internet e se o servidor de desenvolvimento (proxy /ollama-api) está rodando.'
      );
    } else if (error.message) {
      // Erro de validação ou outro
      throw error;
    } else {
      // Erro desconhecido
      throw new Error('Erro desconhecido ao chamar a API Ollama Cloud');
    }
  }
};

/**
 * Chama a API do Ollama Cloud com retry automático
 * @param {string} userPrompt - Prompt do usuário
 * @param {Object} options - Opções adicionais
 * @param {number} options.maxRetries - Número máximo de tentativas (padrão: 3)
 * @param {number} options.retryDelay - Delay entre tentativas em ms (padrão: 1000)
 * @returns {Promise<string>} - Resposta da IA
 */
export const callOllamaWithRetry = async (
  userPrompt,
  options = {}
) => {
  const { maxRetries = 3, retryDelay = 1000, ...ollamaOptions } = options;

  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callOllama(userPrompt, ollamaOptions);
    } catch (error) {
      lastError = error;

      // Não fazer retry em cancelamentos, erros de validação ou autenticação
      if (
        error.canceled ||
        error.message.includes('inválido') ||
        error.message.includes('API key') ||
        error.message.includes('cancelada')
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
 * Testa a conexão com a API do Ollama Cloud
 * @returns {Promise<boolean>} - True se a conexão foi bem-sucedida
 */
export const testOllamaConnection = async () => {
  try {
    await callOllama('Teste', { maxTokens: 10, timeout: 5000 });
    return true;
  } catch (error) {
    console.error('Erro ao testar conexão com Ollama Cloud:', error.message);
    return false;
  }
};

/**
 * Lista modelos disponíveis no Ollama Cloud
 * @returns {Promise<Array>} - Lista de modelos
 */
export const listOllamaModels = async () => {
  try {
    const apiKey = getApiKey();
    
    const response = await axios.get(
      OLLAMA_MODELS_URL,
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
  callOllama,
  callOllamaWithRetry,
  testOllamaConnection,
  listOllamaModels,
};
