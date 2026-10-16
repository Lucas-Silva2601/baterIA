import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatInterface - Interface de chat completa com histórico
 * Mostra conversas com a IA e feedback do sistema
 */
const ChatInterface = ({ messages, isLoading, isTyping, error }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Conversa com IA
          </span>
        </div>
        <span className="text-[10px] text-slate-600">
          {messages.length} mensagens
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="text-4xl mb-3 opacity-50">💬</div>
            <p className="text-sm text-slate-500 mb-2">
              Nenhuma conversa ainda
            </p>
            <p className="text-xs text-slate-600">
              Digite um comando ou clique nos botões rápidos
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                      : msg.sender === 'system'
                      ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 text-violet-300'
                      : 'bg-slate-800/80 border border-slate-700/50 text-slate-200'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs opacity-70">
                      {msg.sender === 'user' ? '👤 Você' : msg.sender === 'system' ? '⚙️ Sistema' : '🤖 IA'}
                    </span>
                    <span className="text-[9px] opacity-50">
                      {new Date(msg.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {(isLoading || isTyping) && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">🤖 IA está pensando</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-red-400">⚠️ {error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['user', 'ai', 'system']).isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  isTyping: PropTypes.bool,
  error: PropTypes.string,
};

ChatInterface.defaultProps = {
  isLoading: false,
  isTyping: false,
  error: null,
};

export default ChatInterface;
