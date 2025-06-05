import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatbotUI from './ChatbotUI';
import './Chatbot.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  cssVarPrefix: 'md3',
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#6750A4' },
        secondary: { main: '#625B71' },
      },
    },
  },
  typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

type ChatbotProps = {
  apiUrl: string;
  avatarUrl?: string;
};

export default function Chatbot({ apiUrl, avatarUrl }: ChatbotProps) {
  (window as any).__CHATBOT_API_URL__ = apiUrl;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChatbotUI avatarUrl={avatarUrl} />
      </ThemeProvider>
    </Provider>
  );
}
