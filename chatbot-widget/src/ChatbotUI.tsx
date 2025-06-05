import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, IconButton, Avatar, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { rasaApi } from './services/rasaApi';

type Message = {
  from: 'user' | 'bot';
  text: string;
  buttons?: { title: string; payload: string }[];
};

type ChatbotUIProps = {
  avatarUrl?: string;
};

export default function ChatbotUI({ avatarUrl }: ChatbotUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Ciao! Come posso aiutarti oggi?' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sendMessage] = rasaApi.endpoints.sendMessage.useMutation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const defaultAvatar = avatarUrl || 'https://via.placeholder.com/40';

  const handleSend = async (userText: string, payload?: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }]);
    setInput('');

    try {
      const data = await sendMessage({
        sender: 'utente123',
        message: payload || trimmed,
      }).unwrap();

      const botMessages: Message[] = (data as any[]).map((res) => ({
        from: 'bot',
        text: res.text || '',
        buttons: res.buttons || undefined,
      }));

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (err) {
      console.error('Errore:', err);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Errore nel contattare il server.' },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPreview(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <>
          <IconButton
            className="chatbot-float"
            onClick={() => {
              setIsOpen(true);
              setShowPreview(false);
            }}
            color="primary"
            size="large"
          >
            <Avatar src={defaultAvatar} alt="Apri Chatbot" />
          </IconButton>

          {showPreview && (
            <Paper className="chatbot-preview-bubble" elevation={3}>
              {messages[0].text}
            </Paper>
          )}
        </>
      )}

      {isOpen && (
        <Paper className="chatbot-wrapper" elevation={4}>
          <Box className="chatbot-head">
            <Box className="chatbot-head-left">
              <Avatar src={defaultAvatar} className="chatbot-avatar" />
              <Typography variant="subtitle1">Chatbot Biblioteca</Typography>
            </Box>
            <IconButton
              size="small"
              className="chatbot-toggle"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className="chatbot-box">
            {messages.map((msg, i) => (
              <Box key={i} className={`chatbot-message ${msg.from}`}>
                <Paper className={`chatbot-bubble ${msg.from}`} sx={{ p: 1 }}>
                  {msg.text}
                </Paper>
                {msg.buttons && (
                  <Box className="chatbot-buttons">
                    {msg.buttons.map((btn, idx) => (
                      <Button
                        key={idx}
                        onClick={() => handleSend(btn.title, btn.payload)}
                        variant="outlined"
                        size="small"
                        className="chatbot-button"
                      >
                        {btn.title}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Scrivi il tuo messaggio..."
            className="chatbot-input"
            fullWidth
            variant="outlined"
          />
        </Paper>
      )}
    </>
  );
}
