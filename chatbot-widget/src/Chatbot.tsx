import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatbotUI from './ChatbotUI';
import './Chatbot.css';

type ChatbotProps = {
  apiUrl: string;
  avatarUrl?: string;
};

export default function Chatbot({ apiUrl, avatarUrl }: ChatbotProps) {
  // Imposta dinamicamente la base URL nel contesto globale (accessibile da rasaApi)
  (window as any).__CHATBOT_API_URL__ = apiUrl;

  return (
    <Provider store={store}>
      <ChatbotUI avatarUrl={avatarUrl} />
    </Provider>
  );
}
