import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/webhooks': {
        target: 'http://localhost:5005',
        changeOrigin: true,
      },
    },
  },
});
