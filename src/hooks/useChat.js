import { useState, useCallback, useRef, useEffect } from 'react';
import { callGroqWithRetry } from '../services/groqAPI';
import { executeAICommand, parseAIResponse } from '../utils/commandParser';
import { CHAT_CONFIG } from '../utils/constants';
import { generateId } from '../utils/helpers';

/**
 * Hook customizado para gerenciar chat com IA
 * @param {Object} loopControls - Controles do loop (startLoop, stopLoop, setPattern, etc)
 * @returns {Object} - Estado e funções do chat
 */
export const useChat = (loopControls) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  /**
   * Adiciona uma mensagem ao histórico
   * @param {string} sender - Remetente ('user' ou 'ai')
   * @param {string} content - Conteúdo da mensagem
   * @returns {string} - ID da mensagem
   */
  const addMessage = useCallback((sender, content) => {
    const message = {
      id: generateId(),
      sender,
      content,
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, message];
      // Limitar número de mensagens
      if (newMessages.length > CHAT_CONFIG.MAX_MESSAGES) {
        return newMessages.slice(-CHAT_CONFIG.MAX_MESSAGES);
      }
      return newMessages;
    });

    return message.id;
  }, []);

  /**
   * Envia uma mensagem para a IA
   * @param {string} userMessage - Mensagem do usuário
   * @returns {Promise<string>} - Resposta da IA
   */
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      throw new Error('Mensagem inválida');
    }

    // Adicionar mensagem do usuário
    addMessage('user', userMessage.trim());

    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      // Criar AbortController para possível cancelamento
      abortControllerRef.current = new AbortController();

      // Chamar API Groq
      const aiResponse = await callGroqWithRetry(userMessage.trim(), {
        maxRetries: 3,
        retryDelay: 1000,
        temperature: 0.8,
        maxTokens: 1024,
      });

      // 🥁 NOVO: Processar resposta da IA (texto + JSON)
      // Separar texto da IA do comando JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      let aiText = aiResponse;
      
      if (jsonMatch) {
        // Extrair o JSON (string)
        const jsonString = jsonMatch[0];
        
        // Remover o JSON do texto
        aiText = aiResponse.replace(jsonString, '').trim();
        
        // Executar comando (passa a string JSON, não o objeto)
        executeAICommand(jsonString, loopControls);
      }

      // Adicionar mensagem da IA ao chat (texto sem JSON)
      if (aiText) {
        addMessage('ai', aiText);
      }

      setIsLoading(false);
      setIsTyping(false);

      return aiText || 'Comando executado';
    } catch (err) {
      const errorMessage = err.message || 'Erro ao se comunicar com a IA';
      setError(errorMessage);
      setIsLoading(false);
      setIsTyping(false);
      
      // Adicionar mensagem de erro no chat
      addMessage('ai', `❌ Erro: ${errorMessage}`);
      
      throw err;
    }
  }, [addMessage, loopControls]);

  /**
   * Envia mensagem para a IA e executa o comando automaticamente
   * @param {string} userMessage - Mensagem do usuário
   * @returns {Promise<void>}
   */
  const sendMessageAndPlay = useCallback(async (userMessage) => {
    try {
      await sendMessage(userMessage);
      // O comando já foi executado dentro do sendMessage
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      throw err;
    }
  }, [sendMessage]);

  /**
   * Limpa o histórico de mensagens
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Remove uma mensagem específica
   * @param {string} messageId - ID da mensagem
   */
  const removeMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  /**
   * Cancela requisição em andamento
   */
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsTyping(false);
  }, []);

  /**
   * Obtém estatísticas do chat
   * @returns {Object}
   */
  const getChatStats = useCallback(() => {
    const userMessages = messages.filter(msg => msg.sender === 'user').length;
    const aiMessages = messages.filter(msg => msg.sender === 'ai').length;

    return {
      total: messages.length,
      userMessages,
      aiMessages,
      hasMessages: messages.length > 0,
    };
  }, [messages]);

  /**
   * Exporta histórico de mensagens
   * @returns {string} - JSON string do histórico
   */
  const exportHistory = useCallback(() => {
    return JSON.stringify(messages, null, 2);
  }, [messages]);

  /**
   * Importa histórico de mensagens
   * @param {string} jsonString - JSON string do histórico
   */
  const importHistory = useCallback((jsonString) => {
    try {
      const importedMessages = JSON.parse(jsonString);
      
      if (Array.isArray(importedMessages)) {
        setMessages(importedMessages);
      } else {
        throw new Error('Formato inválido');
      }
    } catch (err) {
      throw new Error('Erro ao importar histórico: ' + err.message);
    }
  }, []);

  /**
   * Obtém última mensagem da IA
   * @returns {Object|null}
   */
  const getLastAIMessage = useCallback(() => {
    const aiMessages = messages.filter(msg => msg.sender === 'ai');
    return aiMessages.length > 0 ? aiMessages[aiMessages.length - 1] : null;
  }, [messages]);

  /**
   * Obtém última mensagem do usuário
   * @returns {Object|null}
   */
  const getLastUserMessage = useCallback(() => {
    const userMessages = messages.filter(msg => msg.sender === 'user');
    return userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
  }, [messages]);

  /**
   * Rola para o final do chat
   */
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // Estado
    messages,
    isLoading,
    error,
    isTyping,
    messagesEndRef,
    
    // Funções principais
    sendMessage,
    sendMessageAndPlay,
    
    // Gerenciamento de mensagens
    addMessage,
    clearMessages,
    removeMessage,
    
    // Controle
    cancelRequest,
    
    // Utilitários
    getChatStats,
    exportHistory,
    importHistory,
    getLastAIMessage,
    getLastUserMessage,
    scrollToBottom,
  };
};

export default useChat;
