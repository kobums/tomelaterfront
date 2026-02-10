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
        target: 'https://tomelaterspring.gowoobro.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 9006,
    allowedHosts: ['tomelater.gowoobro.com'],
    proxy: {
      '/api': {
        target: 'https://tomelaterspring.gowoobro.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
