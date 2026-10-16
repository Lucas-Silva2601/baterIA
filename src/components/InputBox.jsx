import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente InputBox - Campo de entrada para mensagens
 * @param {Object} props
 * @param {Function} props.onSend - Callback ao enviar mensagem
 * @param {boolean} props.isDisabled - Se o input está desabilitado
 * @param {string} props.placeholder - Placeholder do input
 */
const InputBox = ({
  onSend,
  isDisabled = false,
  placeholder = 'Digite sua mensagem...',
}) => {
  const [inputValue, setInputValue] = useState('');

  /**
   * Handler para mudança no input
   */
  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  /**
   * Handler para enviar mensagem
   */
  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    
    if (trimmed && onSend && !isDisabled) {
      onSend(trimmed);
      setInputValue('');
    }
  }, [inputValue, onSend, isDisabled]);

  /**
   * Handler para tecla Enter
   */
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Estilos
  const containerStyle = {
    display: 'flex',
    gap: '12px',
    width: '100%',
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: '#323232',
    border: '2px solid #6464ff',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: isDisabled ? '#555' : '#6464ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    minWidth: '120px',
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isDisabled}
        style={inputStyle}
        aria-label="Campo de mensagem"
      />
      <button
        onClick={handleSend}
        disabled={isDisabled || !inputValue.trim()}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!isDisabled && inputValue.trim()) {
            e.target.style.backgroundColor = '#8484ff';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = isDisabled ? '#555' : '#6464ff';
        }}
        aria-label="Enviar mensagem"
      >
        {isDisabled ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  );
};

InputBox.propTypes = {
  onSend: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputBox;
