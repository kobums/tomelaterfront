import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    port: 9006,
    proxy: {
      '/api': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
