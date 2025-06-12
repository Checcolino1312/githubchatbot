import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Fade,
  Zoom,
  Tooltip,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { rasaApi } from './services/rasaApi';

export type Message = {
  from: 'user' | 'bot';
  text: string;
  buttons?: { title: string; payload: string }[];
  timestamp?: Date;
  id?: string;
};

// ✅ Aggiunto supporto alla prop `config`
type ChatbotUIProps = {
  avatarUrl?: string;
  config?: {
    welcomeMessage?: string;
    title?: string;
    subtitle?: string;
    quickSuggestions?: string[];
    position?: string;
    maxMessages?: number;
    enableTypingIndicator?: boolean;
    enableTimestamps?: boolean;
    enableSoundNotifications?: boolean;
    placeholder?: string;
    locale?: string;
  };
};

const useChatbot = (initialMessage: Message) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastUserInteraction, setLastUserInteraction] = useState<Date | null>(null);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    showPreview,
    setShowPreview,
    isTyping,
    setIsTyping,
    isMinimized,
    setIsMinimized,
    unreadCount,
    setUnreadCount,
    lastUserInteraction,
    setLastUserInteraction
  };
};

const TypingIndicator: React.FC = () => (
  <Box className="chatbot-message bot">
    <Paper className="chatbot-bubble bot">
      <Box className="typing-indicator">
        <Box className="typing-dot" />
        <Box className="typing-dot" />
        <Box className="typing-dot" />
      </Box>
    </Paper>
  </Box>
);

const MessageTimestamp: React.FC<{ timestamp?: Date }> = ({ timestamp }) => {
  if (!timestamp) return null;
  return (
    <Typography
      variant="caption"
      sx={{
        display: 'block',
        textAlign: 'center',
        color: 'text.secondary',
        mt: 1,
        fontSize: '0.7rem'
      }}
    >
      {timestamp.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
      })}
    </Typography>
  );
};

export default function ChatbotUI({ avatarUrl, config }: ChatbotUIProps) {
  // ✅ Messaggio iniziale personalizzabile
  const initialMessage: Message = {
    from: 'bot',
    text: config?.welcomeMessage || 'Ciao! Sono il tuo assistente virtuale della biblioteca. Come posso aiutarti oggi?',
    timestamp: new Date(),
    id: 'welcome-message'
  };

  const {
    messages,
    setMessages,
    input,
    setInput,
    isOpen,
    setIsOpen,
    showPreview,
    setShowPreview,
    isTyping,
    setIsTyping,
    isMinimized,
    setIsMinimized,
    unreadCount,
    setUnreadCount,
    lastUserInteraction,
    setLastUserInteraction
  } = useChatbot(initialMessage);

  const [sendMessage] = rasaApi.endpoints.sendMessage.useMutation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatboxRef = useRef<HTMLDivElement | null>(null);

  const defaultAvatar = avatarUrl || 'https://via.placeholder.com/40x40/005baa/ffffff?text=AI';

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  }, []);

  const handleSend = useCallback(
    async (userText: string, payload?: string) => {
      const trimmed = userText.trim();
      if (!trimmed || isTyping) return;

      const newUserMessage: Message = {
        from: 'user',
        text: trimmed,
        timestamp: new Date(),
        id: `user-${Date.now()}`
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInput('');
      setIsTyping(true);
      setLastUserInteraction(new Date());

      setTimeout(() => inputRef.current?.focus(), 100);

      try {
        const data = await sendMessage({
          sender: 'utente123',
          message: payload || trimmed
        }).unwrap();

        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

        const botMessages: Message[] = (data as any[]).map((res, index) => ({
          from: 'bot',
          text: res.text || 'Mi dispiace, non sono riuscito a elaborare la tua richiesta.',
          buttons: res.buttons || undefined,
          timestamp: new Date(),
          id: `bot-${Date.now()}-${index}`
        }));

        setMessages((prev) => [...prev, ...botMessages]);
        if (!isOpen) setUnreadCount((prev) => prev + botMessages.length);
      } catch (err) {
        console.error('Errore nella comunicazione:', err);
        setMessages((prev) => [
          ...prev,
          {
            from: 'bot',
            text: 'Mi dispiace, si è verificato un errore di connessione. Riprova tra poco.',
            timestamp: new Date(),
            id: `error-${Date.now()}`
          }
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [sendMessage, isTyping, isOpen, setMessages, setInput, setIsTyping, setLastUserInteraction, setUnreadCount]
  );

  const handleToggleChat = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
      setShowPreview(false);
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, setIsOpen, setShowPreview, setUnreadCount, setIsMinimized]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(input);
      }
    },
    [input, handleSend]
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => setShowPreview(true), 3000);
    const hideTimer = setTimeout(() => setShowPreview(false), 13000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen, setShowPreview]);

  const quickSuggestions = config?.quickSuggestions || [];

  const renderQuickSuggestions = () => {
    if (messages.length > 1 || quickSuggestions.length === 0) return null;

    return (
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {quickSuggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={suggestion}
            variant="outlined"
            size="small"
            onClick={() => handleSend(suggestion)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              },
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </Box>
    );
  };

  return (
    <>
      {/* Floating Button con Badge per messaggi non letti */}
      {!isOpen && (
        <Zoom in={!isOpen} timeout={300}>
          <Box position="relative">
            <Tooltip title="Apri chat assistente" arrow placement="left">
              <IconButton
                className="chatbot-float"
                onClick={handleToggleChat}
                size="large"
                aria-label="Apri chatbot"
              >
                {avatarUrl ? (
                  <Avatar src={defaultAvatar} alt="Assistente AI" />
                ) : (
                  <SmartToyIcon sx={{ fontSize: 28, color: 'white' }} />
                )}
              </IconButton>
            </Tooltip>
            
            {/* Badge per messaggi non letti */}
            {unreadCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  animation: 'pulse 2s infinite'
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Box>
            )}
          </Box>
        </Zoom>
      )}

      {/* Preview Bubble */}
      {showPreview && !isOpen && (
        <Fade in={showPreview} timeout={500}>
          <Paper 
            className="chatbot-preview-bubble" 
            elevation={8}
            onClick={handleToggleChat}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="body2">
              {messages[0]?.text || 'Ciao! Hai bisogno di aiuto?'}
            </Typography>
          </Paper>
        </Fade>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Zoom in={isOpen} timeout={400}>
          <Paper className="chatbot-wrapper" elevation={12}>
            {/* Header */}
            <Box className="chatbot-head">
              <Box className="chatbot-head-left">
                <Avatar src={defaultAvatar} className="chatbot-avatar" />
                <Box>
                  <Typography className="chatbot-title">
                    Assistente Biblioteca
                  </Typography>
                  <Typography className="chatbot-subtitle">
                    {isTyping ? 'Sta scrivendo...' : 'Online'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title={isMinimized ? "Espandi" : "Riduci"} arrow>
                  <IconButton
                    size="small"
                    onClick={() => setIsMinimized(!isMinimized)}
                    sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                  >
                    <ExpandMoreIcon 
                      sx={{ 
                        transform: isMinimized ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Chiudi chat" arrow>
                  <IconButton
                    size="small"
                    className="chatbot-toggle"
                    onClick={handleToggleChat}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Messages Area */}
            <Fade in={!isMinimized} timeout={300}>
              <Box 
                className="chatbot-box" 
                ref={chatboxRef}
                sx={{ 
                  display: isMinimized ? 'none' : 'block',
                  height: isMinimized ? 0 : 360 
                }}
              >
                {messages.map((msg, i) => (
                  <Fade in={true} timeout={400} key={msg.id || i}>
                    <Box className={`chatbot-message ${msg.from}`}>
                      <Paper 
                        className={`chatbot-bubble ${msg.from}`} 
                        elevation={msg.from === 'user' ? 0 : 1}
                      >
                        <Typography variant="body2" component="div">
                          {msg.text}
                        </Typography>
                      </Paper>
                      
                      {/* Buttons per le risposte rapide */}
                      {msg.buttons && (
                        <Fade in={true} timeout={600}>
                          <Box className="chatbot-buttons">
                            {msg.buttons.map((btn, idx) => (
                              <Button
                                key={idx}
                                onClick={() => handleSend(btn.title, btn.payload)}
                                variant="outlined"
                                size="small"
                                className="chatbot-button"
                                disabled={isTyping}
                                startIcon={<SendIcon sx={{ fontSize: '0.8rem' }} />}
                              >
                                {btn.title}
                              </Button>
                            ))}
                          </Box>
                        </Fade>
                      )}
                      
                      <MessageTimestamp timestamp={msg.timestamp} />
                    </Box>
                  </Fade>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && <TypingIndicator />}
                
                {/* Quick Suggestions */}
                {renderQuickSuggestions()}
                
                <div ref={messagesEndRef} />
              </Box>
            </Fade>

            {/* Input Area */}
            <Fade in={!isMinimized} timeout={300}>
              <Box 
                className="chatbot-input-container"
                sx={{ display: isMinimized ? 'none' : 'block' }}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <TextField
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Scrivi il tuo messaggio..."
                    className="chatbot-input"
                    fullWidth
                    multiline
                    maxRows={3}
                    variant="outlined"
                    disabled={isTyping}
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '24px',
                        backgroundColor: 'background.paper',
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(0, 91, 170, 0.1)',
                        }
                      }
                    }}
                  />
                  
                  <Tooltip title="Invia messaggio" arrow>
                    <Box>
                      <IconButton
                        onClick={() => handleSend(input)}
                        disabled={!input.trim() || isTyping}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          width: 40,
                          height: 40,
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'scale(1.05)',
                          },
                          '&:disabled': {
                            backgroundColor: 'grey.300',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <SendIcon sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </Box>
                
                {/* Character counter per messaggi lunghi */}
                {input.length > 200 && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      textAlign: 'right', 
                      mt: 0.5,
                      color: input.length > 500 ? 'error.main' : 'text.secondary'
                    }}
                  >
                    {input.length}/500
                  </Typography>
                )}
              </Box>
            </Fade>
          </Paper>
        </Zoom>
      )}
    </>
  );
}

