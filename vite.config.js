import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://43.203.208.57:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      '/api': {
        target: 'http://43.203.208.57:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
