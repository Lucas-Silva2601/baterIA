import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../utils/helpers';

/**
 * Componente ChatBox - Área de chat com IA
 * @param {Object} props
 * @param {Array} props.messages - Array de mensagens {id, sender, content, timestamp}
 * @param {boolean} props.isTyping - Se a IA está "digitando"
 * @param {string} props.error - Mensagem de erro
 * @param {Object} props.messagesEndRef - Ref para scroll automático
 */
const ChatBox = ({
  messages = [],
  isTyping = false,
  error = null,
  messagesEndRef,
}) => {
  const chatContainerRef = useRef(null);

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Estilos
  const containerStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#323232',
    border: '2px solid #6464ff',
    borderRadius: '10px',
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const messageStyle = (sender) => ({
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: sender === 'user' ? '#404040' : '#2a2a2a',
    borderLeft: `4px solid ${sender === 'user' ? '#6464ff' : '#00ff00'}`,
    wordWrap: 'break-word',
    maxWidth: '100%',
  });

  const senderStyle = (sender) => ({
    fontWeight: 'bold',
    color: sender === 'user' ? '#6464ff' : '#00ff00',
    marginBottom: '4px',
    fontSize: '14px',
  });

  const contentStyle = {
    color: '#fff',
    fontSize: '16px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  };

  const timestampStyle = {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  };

  const typingIndicatorStyle = {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#2a2a2a',
    borderLeft: '4px solid #00ff00',
    color: '#00ff00',
    fontStyle: 'italic',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const errorStyle = {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#4a2020',
    borderLeft: '4px solid #ff0000',
    color: '#ff6666',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
    marginTop: '40px',
  };

  return (
    <div ref={chatContainerRef} style={containerStyle}>
      {messages.length === 0 && !isTyping && !error && (
        <div style={emptyStateStyle}>
          <p>💬 Nenhuma mensagem ainda</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Digite uma mensagem para começar a conversar com a IA!
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} style={messageStyle(message.sender)}>
          <div style={senderStyle(message.sender)}>
            {message.sender === 'user' ? '👤 Você' : '🤖 IA'}
          </div>
          <div style={contentStyle}>{message.content}</div>
          {message.timestamp && (
            <div style={timestampStyle}>
              {formatTime(new Date(message.timestamp))}
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div style={typingIndicatorStyle}>
          🤖 IA está digitando...
        </div>
      )}

      {error && (
        <div style={errorStyle}>
          ❌ {error}
        </div>
      )}

      <div ref={messagesEndRef} />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          /* Scrollbar customizada */
          div::-webkit-scrollbar {
            width: 8px;
          }
          
          div::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 4px;
          }
          
          div::-webkit-scrollbar-thumb {
            background: #6464ff;
            border-radius: 4px;
          }
          
          div::-webkit-scrollbar-thumb:hover {
            background: #8484ff;
          }
        `}
      </style>
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['user', 'ai']).isRequired,
      content: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date),
    })
  ),
  isTyping: PropTypes.bool,
  error: PropTypes.string,
  messagesEndRef: PropTypes.object,
};

export default ChatBox;
