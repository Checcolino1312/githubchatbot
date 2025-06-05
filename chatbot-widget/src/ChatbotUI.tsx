import React, { useState, useEffect, useRef } from 'react';
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
          <button
            className="chatbot-float"
            onClick={() => {
              setIsOpen(true);
              setShowPreview(false);
            }}
          >
            <img src={defaultAvatar} alt="Apri Chatbot" />
          </button>

          {showPreview && (
            <div className="chatbot-preview-bubble">
              {messages[0].text}
            </div>
          )}
        </>
      )}

      {isOpen && (
        <div className="chatbot-wrapper">
          <div className="chatbot-head">
            <div className="chatbot-head-left">
              <img
                src={defaultAvatar}
                alt="Avatar"
                className="chatbot-avatar"
              />
              <span>Chatbot Biblioteca</span>
            </div>
            <span className="chatbot-toggle" onClick={() => setIsOpen(false)}>
              ×
            </span>
          </div>

          <div className="chatbot-box">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.from}`}>
                <div className={`chatbot-bubble ${msg.from}`}>
                  {msg.text}
                </div>
                {msg.buttons && (
                  <div className="chatbot-buttons">
                    {msg.buttons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(btn.title, btn.payload)}
                        className="chatbot-button"
                      >
                        {btn.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Scrivi il tuo messaggio..."
            className="chatbot-input"
          />
        </div>
      )}
    </>
  );
}
