// Chatbot.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatbotUI, { Message } from './ChatbotUI';
import './Chatbot.css';
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  useMediaQuery,
} from '@mui/material';

const createCustomTheme = (prefersDarkMode: boolean) =>
  createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: '#005baa',
        light: '#4a90e2',
        dark: '#004a8f',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#625B71',
        light: '#8A7CA8',
        dark: '#463E52',
      },
      background: {
        default: prefersDarkMode ? '#121212' : '#ffffff',
        paper: prefersDarkMode ? '#1d1d1d' : '#ffffff',
      },
      text: {
        primary: prefersDarkMode ? '#ffffff' : '#212529',
        secondary: prefersDarkMode ? '#a0a0a0' : '#6c757d',
      },
      error: { main: '#d32f2f' },
      warning: { main: '#ffa726' },
      info: { main: '#29b6f6' },
      success: { main: '#66bb6a' },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h6: { fontWeight: 600, fontSize: '1.1rem' },
      body1: { fontSize: '0.95rem', lineHeight: 1.5 },
      body2: { fontSize: '0.85rem', lineHeight: 1.4 },
      caption: { fontSize: '0.75rem', lineHeight: 1.2 },
    },
    shape: { borderRadius: 12 },
    shadows: new Array(25).fill('none') as any,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 20,
            fontWeight: 500,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 16px rgba(0, 91, 170, 0.2)',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { transform: 'scale(1.1)' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': { transition: 'all 0.3s ease' },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 8px rgba(0, 91, 170, 0.15)',
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '0.75rem',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  });

export type ChatbotProps = {
  apiUrl: string;
  avatarUrl?: string;
  theme?: 'light' | 'dark' | 'auto';
  welcomeMessage?: string;
  title?: string;
  subtitle?: string;
  quickSuggestions?: string[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  maxMessages?: number;
  enableTypingIndicator?: boolean;
  enableTimestamps?: boolean;
  enableSoundNotifications?: boolean;
  placeholder?: string;
  locale?: string;
};

export default function Chatbot({
  apiUrl,
  avatarUrl,
  theme = 'auto',
  welcomeMessage = 'Ciao! Sono il tuo assistente virtuale della biblioteca. Come posso aiutarti oggi?',
  title = 'Assistente Biblioteca',
  subtitle = 'Online',
  quickSuggestions = ['Orari di apertura', 'Come prenotare un libro', 'Servizi disponibili', 'Contatti'],
  position = 'bottom-right',
  maxMessages = 100,
  enableTypingIndicator = true,
  enableTimestamps = true,
  enableSoundNotifications = false,
  placeholder = 'Scrivi il tuo messaggio...',
  locale = 'it-IT',
}: ChatbotProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const shouldUseDarkMode = theme === 'auto' ? prefersDarkMode : theme === 'dark';

  const customTheme = React.useMemo(() => createCustomTheme(shouldUseDarkMode), [shouldUseDarkMode]);

  React.useEffect(() => {
    (window as any).__CHATBOT_API_URL__ = apiUrl;
    (window as any).__CHATBOT_CONFIG__ = {
      welcomeMessage,
      title,
      subtitle,
      quickSuggestions,
      position,
      maxMessages,
      enableTypingIndicator,
      enableTimestamps,
      enableSoundNotifications,
      placeholder,
      locale,
    };
  }, [
    apiUrl,
    welcomeMessage,
    title,
    subtitle,
    quickSuggestions,
    position,
    maxMessages,
    enableTypingIndicator,
    enableTimestamps,
    enableSoundNotifications,
    placeholder,
    locale,
  ]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--chatbot-position', position);

    const positions = {
      'bottom-right': { bottom: '24px', right: '24px', top: 'auto', left: 'auto' },
      'bottom-left': { bottom: '24px', left: '24px', top: 'auto', right: 'auto' },
      'top-right': { top: '24px', right: '24px', bottom: 'auto', left: 'auto' },
      'top-left': { top: '24px', left: '24px', bottom: 'auto', right: 'auto' },
    };

    const pos = positions[position];
    Object.entries(pos).forEach(([key, value]: [string, string]) => {
      root.style.setProperty(`--chatbot-${key}`, value);
    });

    return () => {
      Object.keys(pos).forEach((key) => {
        root.style.removeProperty(`--chatbot-${key}`);
      });
    };
  }, [position]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <ChatbotUI
          avatarUrl={avatarUrl}
          config={{
            welcomeMessage,
            title,
            subtitle,
            quickSuggestions,
            position,
            maxMessages,
            enableTypingIndicator,
            enableTimestamps,
            enableSoundNotifications,
            placeholder,
            locale,
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}

export type { Message };
export const useChatbotConfig = () => {
  return React.useMemo(() => {
    return (window as any).__CHATBOT_CONFIG__ || {};
  }, []);
};
